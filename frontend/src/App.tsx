import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { AddLecturer } from './pages/AddLecturer';
import { AddCourse } from './pages/AddCourse';
import { AddStudent } from './pages/AddStudent';
import { AddGrade } from './pages/Grade';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/add/lecturer" exact component={AddLecturer} />
      <Route path="/add/course" exact component={AddCourse} />
      <Route path="/add/student" exact component={AddStudent} />
      <Route path="/grade" exact component={AddGrade} />
    </Switch>
  </BrowserRouter>
);

export default App;