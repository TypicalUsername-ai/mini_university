import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface overviewData {
  code: String,
  name: String,
  lecturer: String,
  institution: String,
  place: String,
  date: Date,
  participant: String,
  grade: String,

}

export function HomePage() {
  const [data, setData] = useState<overviewData[]>([]);
  useEffect( () => {
    fetch("http://localhost:3002/api/overview").then( async data => {
      var data_raw = await data.json();
      var transformed: overviewData[] = [];
      data_raw.map(
        (        elem: { course_code: any; course_name: any; title: string; lecturerName: string; lecturerSurname: string; institution_name: any; place: any; course_date: string | number | Date; position: any; participantName: any; participantSurname: any; grade: any; }) => {
          let data: overviewData = {
            code: elem.course_code,
            name: elem.course_name,
            lecturer: elem.title+" "+elem.lecturerName+" "+elem.lecturerSurname,
            institution: elem.institution_name,
            place: elem.place,
            date: new Date(elem.course_date),
            participant: `(${elem.position}) ${elem.participantName} ${elem.participantSurname}`,
            grade: elem.grade
          };
          transformed.push(data);
        }
        );
      setData(transformed);
    })
  })
  return (
    <div className="App">
      <header className='App-header'> <p>Mateusz's Databases 1 final project</p> </header>
      <Link className="link" to="Search" >Search</Link>
      <Link className="link" to="add/lecturer">add lecturer</Link>
      <Link className="link" to="add/student">add student</Link>
      <Link className="link" to="add/course">add course</Link>
      <Link className="link" to="grade">grade student</Link>
      <div>
        <table>
          <thead>
            <tr className='trow'>
              <th>Course code</th>
              <th>Course name</th>
              <th>lecturer</th>
              <th>institution</th>
              <th>place</th>
              <th>date</th>
              <th>participant</th>
              <th>grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              element => (
                <tr className='trow'>
                  <th className='text' >{element.code}</th>
                  <th className='text' >{element.name}</th>
                  <th className='text' >{element.lecturer}</th>
                  <th className='text' >{element.institution}</th>
                  <th className='text' >{element.place}</th>
                  <th className='text' >{element.date.toUTCString()}</th>
                  <th className='text' >{element.participant}</th>
                  <th className='text' >{element.grade}</th>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
