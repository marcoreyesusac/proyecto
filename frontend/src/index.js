import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './screens/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <Router>
  <Dashboard/>
</Router>,
  document.getElementById('root')
);

reportWebVitals();
