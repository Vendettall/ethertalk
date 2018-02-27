import React from 'react'
import Sidebar from '../containers/Sidebar'
import Chat from '../containers/Chat'

const styles = {
  container : {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    height: '100vh'
  }
}

function MainPage () {
  return (
    <div style={styles.container}>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default MainPage