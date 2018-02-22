import React from 'react'
import Sidebar from './components/Sidebar'
import ChatView from './containers/ChatView'

import './assets/css/App.css'

const appContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  height: '100vh'
}

export default class App extends React.Component {
  componentWillMount () {
    this.props.onLoad()
  }
  render() {
    return (
      <div style={appContainerStyle}>
        <Sidebar user={this.props.user} />
        <ChatView />
      </div>
    )
  }
}