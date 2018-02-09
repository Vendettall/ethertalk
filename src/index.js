import React from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import chatApp from './reducers'
import StartApp from './containers/StartApp'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
let store = createStore(
  chatApp,
  applyMiddleware(middleware)
)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route exact path="/:filter?" component={StartApp}/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
