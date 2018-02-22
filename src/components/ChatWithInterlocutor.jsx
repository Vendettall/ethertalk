import React from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ShowMessages from '../containers/ShowMessages'
import PropTypes from 'prop-types'

const chatContainerStyle = {
  width: 'calc(66% - 10px)'
}

const messagesTitleStyle = {
  textAlign: 'center'
}

export default function ChatWithInterlocutor({ interlocutor }) {
  return  (     
    <Card style={chatContainerStyle}>
      <CardHeader title={interlocutor.name} avatar={interlocutor.avatar} />
      <Divider />
      <CardTitle title="Last messages" style={messagesTitleStyle}/>
      <ShowMessages interlocutor={interlocutor} />
    </Card>
  )
}

ChatWithInterlocutor.propTypes = {
  interlocutor: PropTypes.object
}