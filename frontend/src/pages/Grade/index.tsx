import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface student {
    id_participants: number,
    family_name: String,
    initial_name: String,
    id_positions: number
}

interface course {
    id_courses: number,
    course_code: String,
    course_name: String,
    place: String,
    course_date: Date,
    id_lecturers: number
}

interface grade {
    id_courses: number,
    id_participants: number,
    grade: String
}

async function getStudents(): Promise<student[]> {
    const res: student[] = await (await fetch("http://localhost:3002/api/participants")).json();
    return res
}
async function getCourses(): Promise<course[]> {
    const res: course[] = await (await fetch("http://localhost:3002/api/courses")).json();
    return res
}
async function getGrades(): Promise<grade[]> {
    const res: grade[] = await (await fetch("http://localhost:3002/api/grades")).json();
    return res
}


export function AddGrade() {
    
    async function postGrade(){
        var update = false;
        grades.find(a => a.id_courses === cId && a.id_participants === sId) ? update=true : update=false;
        console.warn({update: update, course: cId, student: sId})
        const data: any = await (await fetch(`http://localhost:3002/api/grades?student_id=${sId}&course_id=${cId}&grade=${grade}&update=${update}`, {method: "post"})).json()
        console.log(data);
        setCtr(ctr+1);
    }

    const [students, setStudents] = useState<student[]>([]);
    const [courses, setCourses] = useState<course[]>([]);
    const [grades, setGrades] = useState<grade[]>([]);

    const [ctr, setCtr] = useState<number>(0);

    const [sId, setSID] = useState<number>();
    const [cId, setCID] = useState<number>();
    const [grade, setGrade] = useState<String>("n/a");

    

    useEffect( () => {
        getStudents().then(a => {setStudents(a); setSID(a[0].id_participants)});
        getCourses().then(a => {setCourses(a); setCID(a[0].id_courses)});
        getGrades().then(a => setGrades(a));
    }, [ctr])

    return(
        <div className="App">
            <Link to="/">go Home</Link>
            <p>Select a student and a couse to add or update a grade</p>
            <select name="students" onChange={(e) => {setSID(Number.parseInt(e.target.value))}}>
                {students.map(
                    st => <option value={st.id_participants}>{st.initial_name} {st.family_name}</option>
                )}
            </select>
            <select onChange={(e) => {setCID(Number.parseInt(e.target.value))}}>
                {courses.map(
                    c => <option value={c.id_courses}>{c.course_name} ({c.course_code})</option>
                )}
            </select>
            <input placeholder="grade (e.g. 5.0 or pass" onChange={(e) => {setGrade(e.target.value.toString())}}/>
            <button onClick={() => postGrade()}>Confirm</button>
        </div>
    );
}