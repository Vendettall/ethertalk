import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import API from './api'
import getWeb3 from './utils/getWeb3'

//components
import Sidebar from './components/Sidebar'
import ChatView from './containers/ChatView'

import './assets/css/oswald.css'
import './assets/css/open-sans.css'
import './assets/css/pure-min.css'
import './App.css'

const stub = {
  currentUser: {
    id: 0,
    name: 'Joe',
    avatar: '/assets/images/joe.png'
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      userRegistry: null,
      user: null,
      chatSocket: null,
      userId: ""
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3.then((web3) => {

      let api = API(web3)
      this.setState(() => {
        return {
          web3: web3,
          userRegistry: api.Registry.instance()
        }
      })

      api.Accounts.instance().getAccounts()
        .then((accounts) => { // Search for account with registered user. If not found - register with 0 account
          let found = accounts.find((value) => value.user != null)
          if (found) {
            api.Accounts.instance().currentAccount = found.id
            return found
          } else {
            let account = accounts[0]
            return api.Registry.instance().register().then((user) => {
              account.user = user
              return account
            })
          }
        })
        .then((account) => {
          console.log("Account", account)
          let socket = new api.Whisper(account.user)
          this.setState(() => {
            return {
              user: account.user,
              chatSocket: socket,
              userId: account.user.id
            }
          })

          socket.on('error', (err) => {
            console.error('Socket error', err)
          })

          socket.on('message', (message) => {
            console.log('New message', message)
          })

          socket.on('started', () => {
            console.log('Socket started')
            socket.sendMessage(account.user, "TEST MESSAGE")
          })

          socket.start()
        })
        .catch((err) => {
          console.error("Error", err)
        })
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px', height: '100vh', boxSizing: 'border-box'}}>
          <Sidebar userInfo={stub.currentUser} />
          <ChatView />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
