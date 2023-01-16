import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import mysql from "mysql2";
import { useEffect } from 'react';


export function HomePage() {
  useEffect( () => {
    console.log("trying to establish sql connection");
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'worker',
      password: 'worker_password',
      database: 'mini_university'
    });
  })
  return (
    <div className="App">
      <header className='App-header'> <p>Mateusz's Databases 1 final project</p> </header>
      <div className='App-main'>

      </div>
    </div>
  );
}
