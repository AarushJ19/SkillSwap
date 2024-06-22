// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './register.js';
import Login from './login.js';
import Homepage from './Homepage.js';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/homepage" component={Homepage} />
      </div>
    </Router>
  );
};

export default App;
