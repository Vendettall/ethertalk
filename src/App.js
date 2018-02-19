import React from 'react'
import Sidebar from './components/Sidebar'
import ChatView from './containers/ChatView'

import './assets/css/oswald.css'
import './assets/css/open-sans.css'
import './assets/css/pure-min.css'
import './App.css'

export default function App({user}) {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px', height: '100vh', boxSizing: 'border-box'}}>
      <Sidebar user={user} />
      <ChatView />
    </div>
  )
}