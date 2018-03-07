import React from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Messages from '../containers/Messages'
import PropTypes from 'prop-types'


const styles = {
  chatContainer: {
    width: 'calc(66% - 10px)'
  },
  messagesTitle: {
    textAlign: 'center'
  }
}

function ChatWithInterlocutor({ interlocutor }) {
  return  (     
    <Card style={styles.chatContainer}>
      <CardHeader title={interlocutor.name} avatar={interlocutor.avatar} />
      <Divider />
      <CardTitle title="Last messages" style={styles.messagesTitle}/>
      <Messages interlocutor={interlocutor} />
    </Card>
  )
}

ChatWithInterlocutor.propTypes = {
  interlocutor: PropTypes.object
}


export default ChatWithInterlocutor