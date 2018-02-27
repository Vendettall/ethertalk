import React from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import chatApp from './reducers'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import App from './App'
import promiseMiddleware from 'redux-promise'
import { asyncDispatchMiddleware } from './middlewares/asyncDispatchMiddleware'
import { socketMiddleware } from './middlewares/socketEventsMiddleware'
import { userMiddleware } from './middlewares/userEventsMiddleware'
import { contactsMiddleware } from './middlewares/contactsEventsMiddleware'
import { invitationsMiddleware } from './middlewares/invitationsEventsMiddleware'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
let store = createStore(
  chatApp,
  applyMiddleware(
    middleware,
    promiseMiddleware,
    asyncDispatchMiddleware,
    socketMiddleware,
    userMiddleware,
    contactsMiddleware,
    invitationsMiddleware
  )
)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
