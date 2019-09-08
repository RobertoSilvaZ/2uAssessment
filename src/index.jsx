import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

//Views
import ListView from './components/views/ListView';

ReactDOM.render(
  <Router  basename={'/tech-start'}>
        <Route exact path='/' render={() => <ListView status="pending" />} />
        <Route exact path='/pending'  render={() => <ListView status="pending" />} />
        <Route exact path='/approved'  render={() => <ListView status="approved" />}  /> 
  </Router>,
  document.getElementById('root')
);
