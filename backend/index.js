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

app.get("/api/columns", async (req, res) => {
    if(!req.query.table){
        res.status(400).send({error: "table query param needs to be present"});
    }
    try {
        const db_data = await (await db).query(
            `DESCRIBE ${req.query.table}`
        );
        res.send(db_data);
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

app.post("/api/grades", async (req,res) => {
    if(!req.query.student_id || !req.query.course_id || !req.query.grade){
        res.status(401).send({error: "query parameters student_id, course_id and grade are required"})
    }
    else {
        try{
            var querystring = `INSERT INTO course_grading(id_courses, id_participants, grade) VALUES (${req.query.course_id}, ${req.query.student_id}, ${req.query.grade})`
            if(req.query.update==="true"){
                querystring = `UPDATE course_grading SET grade = ${req.query.grade} WHERE id_courses = ${req.query.course_id} AND id_participants = ${req.query.student_id}`
            }
            console.info({query: querystring});
            const db_res = await (await db).query(querystring);
            res.send({status: "success", info: db_res});
        } catch (error) {
            console.error(error);
            res.status(500).send({error: error});
        }
    }
});

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

app.post("/api/course", async (req, res) => {
    const q = req.query;
    if(!q.id || !q.code || !q.name || !q.place || !q.date || !q.lecturer){
        res.status(401).send({error: "not all required parameters valid/present"});
    } else {
        try {
            var querystring = `INSERT INTO courses(id_courses, course_code, course_name, place, course_date, id_lecturers) VALUES (${q.id}, '${q.code}', '${q.name}', '${q.place}', ${q.date}, ${q.lecturer})`
            const db_res = await (await db).query(querystring);
            res.send({status: "ok"});
            console.info(db_res)
        } catch (error) {
            console.error(error);
            res.status(500).send({error: error});
        }
    }
});

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

app.get("/api/search", async (req, res) => {
    if(!req.query.table || !req.query.key || !req.query.value) {
        res.status(400).send({error: `"table" "key" and "value" query parameters are required`});
    }else{
        try {
            var querystring = `SELECT * FROM ${req.query.table} WHERE ${req.query.key} = ${req.query.value}`
            if(req.query.like == "true"){
                querystring = `SELECT * FROM ${req.query.table} WHERE ${req.query.key} LIKE '%${req.query.value}%'`
            }
            console.info({query: querystring});
            const db_data = await (await db).query(querystring);
            res.send(db_data);
        } catch (error) {
            res.status(401).send({error: error});
        }
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})