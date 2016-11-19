import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App/App';
import Home from './components/Home/Home';
import Event from './components/Event/Event';
import './index.css';
import { createStore } from 'redux'
import { IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import reducer from './reducers/index'

// Configures redux provider with our app.
const store = createStore(reducer)
const Provide = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <App>
          {this.props.children}
        </App>
      </Provider>
    )
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Provide}>
      <IndexRoute component={Home} />
      <Route path="event" component={Event} />
      <Route path="event/:uuid" component={Event} />
    </Route>
  </Router>
), document.getElementById('root'))
