import React from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import chatApp from './reducers'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import App from './App'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
let store = createStore(
  chatApp,
  applyMiddleware(
    middleware,
    sagaMiddleware
  )
)

sagaMiddleware.run(saga)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
