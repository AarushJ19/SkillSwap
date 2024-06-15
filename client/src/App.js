import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './register'; // Adjust the path based on your directory structure
import Login from './login'; // Adjust the path based on your directory structure

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* You can add more routes here as needed */}
      </div>
    </Router>
  );
};

export default App;
