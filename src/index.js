import React from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import chatApp from './reducers'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import StartApp from './containers/StartApp'
import RegisterNewUser from './containers/RegisterNewUser'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import promiseMiddleware from 'redux-promise'
// init
import getWeb3 from './utils/getWeb3'
import API from './api'
import { setApi, setSocket } from './actions/general'
import { replaceCurrentUser } from './actions/currentUser'
import { replaceContacts } from './actions/contacts'
import { replaceInvitations } from './actions/invitations'
import { push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
let store = createStore(
  chatApp,
  applyMiddleware(middleware),
  applyMiddleware(promiseMiddleware)
)

function initSocket(api, currentUser) {
  let socket = new api.Whisper(currentUser)
  socket.start()

  socket.on('error', error => console.log('started socket'))

  return socket
}

getWeb3.then((web3) => {
  let api = API(web3)
  store.dispatch(setApi(api))
  api.Accounts.instance().getAccounts().then((accounts) => {
    // Search for account with registered user. If not found - register with 0 account
    let accountWithUser = accounts.find((value) => value.user != null)
    if (accountWithUser) {
      store.dispatch(replaceCurrentUser(accountWithUser))
      store.dispatch(setSocket(initSocket(api, accountWithUser.user)))
      store.dispatch(replaceContacts(accountWithUser.user))
      store.dispatch(replaceInvitations(accountWithUser.user))
      // store.dispatch(push('/registration'))
      return
    } else {
      let account = accounts[0]
      return api.UserRegistry.instance().register().then((user) => {
        account.user = user
        store.dispatch(replaceCurrentUser(account))
        store.dispatch(setSocket(api, user))
        store.dispatch(push('/registration'))
        return
      })
    }
  })
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <div> 
          <Route exact path="/" component={StartApp} />
          <Route path="/registration" component={RegisterNewUser} />
        </div>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
