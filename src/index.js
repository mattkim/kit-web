import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App/App';
import Event from './components/Event/Event';
import { createStore } from 'redux'
import reducer from './reducers/index'
import './index.css';
import { Provider } from 'react-redux';

const store = createStore(reducer)

// Dynamically wraps store and component into Provider.
function Provide(store, component) {
  return React.createClass({
    render() {
      return (
        <Provider store={store}>
          {component}
        </Provider>
      )
    }
  })
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Provide(store, <App/>)}>
      <Route path="event" component={Provide(store, <Event/>)}/>
    </Route>
  </Router>
), document.getElementById('root'))
