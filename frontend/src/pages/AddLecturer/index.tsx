import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface lecturer {
    id_lecturers: number,
    title: String,
    family_name: String,
    initial_name: String,
    id_institutions: number
}

interface institution {
    id_institutions: number,
    institution_name: String,
    address1: String,
    address2: String
}

async function getLecturers(): Promise<lecturer[]> {
    const res: lecturer[] = await (await fetch("http://localhost:3002/api/lecturers")).json();
    return res
}

async function getInstitutions(): Promise<institution[]> {
    const res: institution[] = await (await fetch("http://localhost:3002/api/institutions")).json();
    return res
}

export function AddLecturer() {

    async function postLecturer() {
        const res: institution[] = await (await fetch(`http://localhost:3002/api/lecturers?id=${lecturers[lecturers.length -1].id_lecturers + 1}&title=${lecturer.title}&name=${lecturer.initial_name}&lname=${lecturer.family_name}&institution=${lecturer.id_institutions}`, {method: "post"})).json();
        console.info(res);
    }

    const [lecturer, setLecturer] = useState<lecturer>({
        id_lecturers: -1,
        title: "",
        family_name: "",
        initial_name: "",
        id_institutions: -1
    })
    const [lecturers, setLecturers] = useState<lecturer[]>([]);
    const [institutions, setInstitutions] = useState<institution[]>([]);

    useEffect(() => {
        getLecturers().then(e => setLecturers(e));
        getInstitutions().then(e => setInstitutions(e));
    }, []);
    
    return(
        <div className="App">
            <Link className="link" to="/">go Home</Link>
            <div>
                <input className='text' placeholder="title" onChange={(e) => {
                    var val = lecturer;
                    val.title = e.target.value
                    setLecturer(val);
                }}/>
                <input className='text' placeholder="first name" onChange={(e) => {
                    var val = lecturer;
                    val.initial_name = e.target.value
                    setLecturer(val);
                }}/>
                <input className='text' placeholder="last name" onChange={(e) => {
                    var val = lecturer;
                    val.family_name = e.target.value
                    setLecturer(val);
                }}/>
                <select className='text' name="positions" onChange={(e) => {
                    var val = lecturer;
                    val.id_institutions = Number.parseInt(e.target.value);
                    setLecturer(val);
                }}>
                    {institutions.map(
                        i => <option value={i.id_institutions}>{i.institution_name}</option>
                    )}
                </select>
                <button className='text' onClick={() => postLecturer()}> add </button>
            </div>
        </div>
    );
}