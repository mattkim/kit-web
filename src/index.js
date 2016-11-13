import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App/App';
import Event from './components/Event/Event';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers/index'

const store = createStore(reducer)

// Dynamically wraps store and component into Provider.
function Provide(store, component) {
  return React.createClass({
    render() {
      return (
        <Provider store={store}>
          {
            React.cloneElement(
              component,
              {
                params: this.props.params,
                location: this.props.location,
                // TODO: history doesn't work even though it should?
                history: this.props.history,
              }
            )
          }
        </Provider>
      )
    }
  })
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Provide(store, <App/>)}/>
    <Route path="/event" component={Provide(store, <Event/>)}/>
    <Route path="/event/:uuid" component={Provide(store, <Event/>)}/>
  </Router>
), document.getElementById('root'))
