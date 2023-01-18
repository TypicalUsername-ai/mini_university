import { Link } from "react-router-dom";

interface student {
    id_participants: number,
    family_name: String,
    initial_name: String,
    id_positions: number
}

async function getStudents(): Promise<student[]> {
    const res: student[] = await (await fetch("http://localhost:3002/api/participants")).json();
    return res
}

export function AddStudent() {

    async function postStudent(){
        
    }

    return(
        <div className="App">
            <Link to="/">go Home</Link>
            "this is the add page :)"
        </div>
    );
}