import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface table {
    name: String
    columns: column[]
}

interface column {
    name: String,
    type: String
}

export async function getTables(): Promise<table[]> {
    var tables: table[] = [];
    var tableRes: any[] = await (await fetch("http://localhost:3002/api/tables")).json();
    tables = await Promise.all(tableRes.map(
        async tb => {
            const tname: String = tb.Tables_in_mini_university.toString();
            const col_data: any[] = await (await fetch(`http://localhost:3002/api/columns?table=${tname}`)).json();
            const cols: column[] = col_data.map(
                c => ({
                  name: c.Field,
                  type: c.Type  
                })
            )
            return {
                name: tname,
                columns: cols
            }
        }
    ))
    return tables;
}


export function SearchPage() {
    
    async function tableLookup(table: String, column: column, value: String) {
        console.info({table: table, column: column.name, keytype: column.type, value: value, like: column.type.includes("char").toString()});
        var resp: any[] = await (await fetch(`http://localhost:3002/api/search?table=${table}&key=${column.name}&value=${value}&like=${column.type.includes("char")}`)).json();
        // console.log(resp);
        setLookup(resp);
    }

    const [tables, setTables] = useState<table[]>([]);

    const [table, setTable] = useState<table>();
    const [column, setColumn] = useState<column>();

    const [lookup, setLookup] = useState<any[]>([]);

    const [val, setVal] = useState<String>();

    useEffect(() => {
        getTables().then(data => { setTables(data) });
    }, [])

    return (
        <div className="App">
            <Link to="/">go Home</Link>
            this is the search page
            <div>
                <select name="table" onChange={(e) => {setTable(tables.find(tb => tb.name === e.target.value))}}>
                    {tables.map(
                        tb => <option value={tb.name.toString()}>{tb.name}</option>
                    )}
                </select>
                <select name="column" onChange={(e) => {setColumn(table?.columns.find(c => c.name === e.target.value))}}>
                    {tables.find( (tb) => tb.name === table?.name)?.columns.map(
                        c => <option value={c.name.toString()}>{c.name} ({c.type})</option>
                    )}
                </select>
                <input onChange={(e) => setVal(e.target.value.toString())} placeholder={`search phrase (${column?.type})`}></input>
                <button onClick={() => {tableLookup(table ? table.name : tables[0].name, column ? column : tables[0].columns[0], val ?  val : "")}}>Search</button>
                <button onClick={() => {tableLookup(table ? table.name : tables[0].name, table ? table.columns[0] : tables[0].columns[0], "'' OR 1")}}>Show all</button>
            </div>
            {lookup.length > 0 ? 
            <div>
                Search results
                <table>
                    <thead>
                        <tr>
                        {Object.keys(lookup[0]).map(
                            key => <th>{key.toString()}</th>
                        )}
                        </tr>
                    </thead>
                    <tbody>
                            {lookup.map(
                                data => 
                                <tr>
                                    {Object.values(data).map(val => <th>{val}</th>)}
                                </tr>
                            )}
                    </tbody>
                </table>
            </div> : null}
        </div>
    );
}