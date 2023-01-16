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
      <div>
        <table>
          <tr>
            <th>Course code</th>
            <th>Course name</th>
            <th>lecturer</th>
            <th>institution</th>
            <th>place</th>
            <th>date</th>
            <th>participant</th>
            <th>grade</th>
          </tr>
          {data.map(
            element => (
              <tr>
                <th>{element.code}</th>
                <th>{element.name}</th>
                <th>{element.lecturer}</th>
                <th>{element.institution}</th>
                <th>{element.place}</th>
                <th>{element.date.toUTCString()}</th>
                <th>{element.participant}</th>
                <th>{element.grade}</th>
              </tr>
            )
          )}
        </table>
      </div>
    </div>
  );
}
