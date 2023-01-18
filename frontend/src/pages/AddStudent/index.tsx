import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface student {
    id_participants: number,
    family_name: String,
    initial_name: String,
    id_positions: number
}

interface position {
    id_positions: number,
    position: String,
}

async function getStudents(): Promise<student[]> {
    const res: student[] = await (await fetch("http://localhost:3002/api/participants")).json();
    return res
}

async function getPositions(): Promise<position[]> {
    const res: position[] = await (await fetch("http://localhost:3002/api/positions")).json();
    return res
}

export function AddStudent() {

    const[student, setStudent] = useState<student>({
        id_participants: -1,
        family_name: "",
        initial_name: "",
        id_positions: 0
    });
    const[students, setStudents] = useState<student[]>([]);
    const[positions, setPositions] = useState<position[]>([]);

    useEffect(() => {
        getStudents().then(a => setStudents(a));
        getPositions().then(a => setPositions(a));
    }, [])

    async function postStudent(){
        const res: student[] = await (await fetch(`http://localhost:3002/api/participants?id=${students[students.length -1].id_participants + 1}&name=${student.initial_name}&lname=${student.family_name}&position=${student.id_positions}`, {method: "post"})).json();
        return res
    }

    return(
        <div className="App">
            <Link className="link" to="/">go Home</Link>
            <div>
                <input className="text" placeholder="first name" onChange={(e) => {
                    var val = student;
                    val.initial_name = e.target.value
                    setStudent(val);
                }}/>
                <input className="text" placeholder="last name" onChange={(e) => {
                    var val = student;
                    val.family_name = e.target.value
                    setStudent(val);
                }}/>
                <select className="text" name="positions" onChange={(e) => {
                    var val = student;
                    val.id_positions = Number.parseInt(e.target.value);
                    setStudent(val);
                }}>
                    {positions.map(
                        p => <option value={p.id_positions}>{p.position}</option>
                    )}
                </select>
                <button className="text" onClick={() => postStudent()}> add </button>
            </div>
        </div>
    );
}