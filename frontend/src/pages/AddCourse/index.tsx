import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface course {
    id_courses: number,
    course_code: String,
    course_name: String,
    place: String,
    course_date: Date,
    id_lecturers: number
}

interface lecturer {
    id_lecturers: number,
    title: String,
    family_name: String,
    initial_name: String,
    id_institutions: number
}

async function getCourses(): Promise<course[]> {
    const res: course[] = await (await fetch("http://localhost:3002/api/courses")).json();
    return res
}

async function getLecturers(): Promise<lecturer[]> {
    const res: lecturer[] = await (await fetch("http://localhost:3002/api/lecturers")).json();
    return res
}

export function AddCourse() {

    const[course, setCourse] = useState<course>({
        id_courses: -1,
        course_code: "",
        course_name: "",
        place: "",
        course_date: new Date(),
        id_lecturers: 0
    });

    const [courses, setCourses] = useState<course[]>([])
    const [lecturers, setLecturers] = useState<lecturer[]>([]);

    useEffect(() => {
        getLecturers().then( a => setLecturers(a));
        getCourses().then(a => setCourses(a));
    }, [])

    async function postCourse() {
        const res = await (await fetch(`http://localhost:3002/api/course?id=${courses[courses.length-1].id_courses + 1}&code=${course.course_code}&name=${course.course_name}&place=${course.place}&date=${course.course_date.toISOString().split("T")[0]}&lecturer=${course.id_lecturers}`, {method: "post"})).json()
        console.info(res);
    }

    return(
        <div className="App">
            <Link to="/">go Home</Link>
            <div>
                <input placeholder="course code" onChange={(a) => {
                    var prev: course = course;
                    course.course_code = a.target.value;
                    setCourse(prev)
                }}/>
                <input placeholder="name" onChange={(a) => {
                    var prev: course = course;
                    course.course_name = a.target.value;
                    setCourse(prev)
                }}/>
                <input placeholder="place" onChange={(a) => {
                    var prev: course = course;
                    course.place = a.target.value;
                    setCourse(prev)
                }}/>
                <input type="date" onChange={(a) => {
                    var prev: course = course;
                    course.course_date = new Date(a.target.value);
                    setCourse(prev)
                }}/>
                <select name="lecturer" onChange={(a) => {
                    var prev: course = course;
                    course.id_lecturers = Number.parseInt(a.target.value);
                    setCourse(prev)
                }} >
                    {lecturers.map(
                        l => <option value={l.id_lecturers}>{l.title} {l.initial_name.charAt(0)}. {l.family_name}</option>
                    )}
                </select>
                <button onClick={ () => {postCourse()}}> add course </button>
            </div>
        </div>
    );
}