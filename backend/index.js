#!/usr/bin/env node

const express = require('express');
const db = require('./dbconfig');
const cors = require('cors');

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())


app.get("/api/overview", async (req, res) => {
    try {
        const db_data = await (await db).query(
            `SELECT 
            courses.course_code, courses.course_name, 
            lecturers.title, lecturers.initial_name AS lecturerName, lecturers.family_name AS lecturerSurname, 
            institutions.institution_name, courses.place, courses.course_date, 
            participants.initial_name AS participantName, participants.family_name AS participantSurname, positions.position, 
            course_grading.grade 
            FROM 
            positions INNER JOIN 
                (participants INNER JOIN ((institutions INNER JOIN lecturers ON institutions.id_institutions = lecturers.id_institutions) 
            INNER JOIN (courses INNER JOIN course_grading ON courses.id_courses = course_grading.id_courses) ON lecturers.id_lecturers = courses.id_lecturers) ON participants.id_participants = course_grading.id_participants) ON positions.id_positions = participants.id_positions;`
        )
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error"); 
    }
})

app.get("/api/tables", async (req, res) => {
    try {
        const tables = await (await db).query(
        "SHOW TABLES"
        );;
        res.send(tables);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})

app.get("/api/lecturers", async (req, res) => {
    try {
        const db_data = await (await db).query(
        "SELECT * FROM lecturers"
        );
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})

app.get("/api/participants", async (req, res) => {
    try {
        const db_data = await (await db).query(
        "SELECT * FROM participants"
        );
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})

app.get("/api/grades", async (req, res) => {
    console.log(req.query);
    try {
        var querystring = "SELECT * FROM course_grading";
        if(req.query.course_id){
            querystring = `SELECT * FROM course_grading WHERE id_courses = ${req.query.course_id}`;
        }
        else if(req.query.participant_id){
            querystring = `SELECT * FROM course_grading WHERE id_participants = ${req.query.participant_id}`;
        }
        console.info(`running on query: \"${querystring}\"`)
        const db_data = await (await db).query(querystring);
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})

app.get("/api/courses", async (req, res) => {
    try {
        const db_data = await (await db).query(
        "SELECT * FROM courses"
        );
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})

app.get("/api/institutions", async (req, res) => {
    try {
        const db_data = await (await db).query(
        "SELECT * FROM institutions"
        );
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})

app.get("/api/positions", async (req, res) => {
    try {
        const db_data = await (await db).query(
        "SELECT * FROM positions"
        );
        res.send(db_data);
    } catch (error) {
        console.warn("error", error);
        res.status(500).send("internal server error");
    }
})



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})