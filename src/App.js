import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

//components
import Sidebar from './components/Sidebar'
import ChatView from './containers/ChatView'

import './assets/css/oswald.css'
import './assets/css/open-sans.css'
import './assets/css/pure-min.css'
import './App.css'

export default class App extends React.Component {
  componentWillMount() {
    this.props.initUser()
  }
  render() {
    return (
      <MuiThemeProvider>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px', height: '100vh', boxSizing: 'border-box'}}>
          <Sidebar user={this.props.user} />
          <ChatView />
        </div>
      </MuiThemeProvider>
    )
  }
}