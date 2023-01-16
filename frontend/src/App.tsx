import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { AddPage } from './pages/Add';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/add" exact component={AddPage} />
    </Switch>
  </BrowserRouter>
);

export default App;