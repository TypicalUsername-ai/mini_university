DROP DATABASE IF EXISTS mini_university;

CREATE DATABASE IF NOT EXISTS mini_university;

USE mini_university;

CREATE TABLE courses(
    id_courses INT NOT NULL PRIMARY KEY,
    course_code VARCHAR(30) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    course_date DATE NOT NULL,
    id_lecturers INT NOT NULL
);

INSERT INTO courses (id_courses, course_code, course_name, place, course_date, id_lecturers) VALUES
    (2, "2018_01", "psychology for teachers", "Krakow, Mickiewicz Av. 30, B-4, classroom 5", '2018-02-17', 1),
    (3, "2018_02", "handling of computer games", "Krakow, Reymonta St. 11, room 10", '2018-3-27', 2)
;

CREATE TABLE institutions(
    id_institutions INT NOT NULL PRIMARY KEY,
    institution_name VARCHAR(255) NOT NULL,
    address1 VARCHAR(255),
    address2 VARCHAR(255)
);

INSERT INTO institutions (id_institutions, institution_name, address1, address2) VALUES
    (1, "AGH Krakow", NULL, NULL),
    (2, "Nano Ltd.", "Krakow", "Mazowiecka St. 6")
    ;


CREATE TABLE lecturers(
    id_lecturers INT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    initial_name VARCHAR(255),
    id_institutions INT NOT NULL
);

INSERT INTO lecturers(id_lecturers, title, family_name, initial_name, id_institutions) VALUES
    (1, "Dr", "Kolarski", "Jacek", 1),
    (2, "Professor", "Zarzeczny", "Jan", 2)
    ;

CREATE TABLE participants(
    id_participants INT NOT NULL PRIMARY KEY,
    family_name VARCHAR(255) NOT NULL,
    initial_name VARCHAR(255) NOT NULL,
    id_positions INT NOT NULL
);

INSERT INTO participants(id_participants, family_name, initial_name, id_positions) VALUES
    (1, "Sowa", "Andrzej", 1),
    (2, "Wrobel", "Andrzej", 1),
    (3, "Kepa", "Andrzej", 2),
    (4, "Wojcicki", "Janusz", 1),
    (5, "Niecko", "Anna", 3)
    ;

CREATE TABLE positions(
    id_positions INT NOT NULL PRIMARY KEY,
    position VARCHAR(255) NOT NULL
);

INSERT INTO positions (id_positions, position) VALUES
    (1, "Adjunct"),
    (2, "Assistant"),
    (3, "Specialist")
    ;

CREATE TABLE course_grading(
    id_courses INT NOT NULL,
    id_participants INT NOT NULL,
    grade VARCHAR(25),
    PRIMARY KEY(id_courses, id_participants)
);

INSERT INTO course_grading(id_courses, id_participants, grade) VALUES
    (2, 1, "3.0"),
    (2, 2, "5.0"),
    (2, 3, "4.5"),
    (3, 2, "passed"),
    (3, 4, "passed"),
    (3, 5, "passed")
    ;

ALTER TABLE courses
    ADD CONSTRAINT fk_lecturers
        FOREIGN KEY (id_lecturers) REFERENCES lecturers(id_lecturers);

ALTER TABLE lecturers
    ADD CONSTRAINT fk_institutions
        FOREIGN KEY (id_institutions) REFERENCES institutions(id_institutions);

ALTER TABLE course_grading
    ADD CONSTRAINT fk_courses
        FOREIGN KEY (id_courses) REFERENCES courses(id_courses),
    ADD CONSTRAINT fk_participants
        FOREIGN KEY (id_participants) REFERENCES participants(id_participants);

ALTER TABLE participants
    ADD CONSTRAINT fk_positions
        FOREIGN KEY (id_positions) REFERENCES positions(id_positions);

SELECT courses.course_code, courses.course_name, lecturers.title, lecturers.initial_name, lecturers.family_name, institutions.institution_name, courses.place, courses.course_date, participants.initial_name, participants.family_name, positions.position, course_grading.grade
FROM positions INNER JOIN (participants INNER JOIN ((institutions INNER JOIN lecturers ON institutions.id_institutions = lecturers.id_institutions) INNER JOIN (courses INNER JOIN course_grading ON courses.id_courses = course_grading.id_courses) ON lecturers.id_lecturers = courses.id_lecturers) ON participants.id_participants = course_grading.id_participants) ON positions.id_positions = participants.id_positions;