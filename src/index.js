import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App/App';
import Event from './components/Event/Event';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="event" component={Event}/>
    </Route>
  </Router>
), document.getElementById('root'))
