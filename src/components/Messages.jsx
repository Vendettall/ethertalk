import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {CardActions, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

const messageBoxStyle = {
  height: 'calc(100vh - 248px)',
  overflowY: 'scroll'
}

const messageInputStyle = {
  width: '100%',
  paddingRight: '24px'
}

const messageInputWrapperStyle = {
  padding: '0 30px',
  position: 'relative'
}

const sendButtonStyle = {
  position: 'absolute',
  right: '10px',
  top: '0'
}

export default function Messages({socket, userAvatar, interlocutor, text, messages, onUpdateText, onSend}) {
  let messageList = 'Type something ...'
  if(messages.length) {
    messageList = (
      <List>
        {messages.map((message, index) =>
          <ListItem 
            leftAvatar={<Avatar src={message.isMy? userAvatar: interlocutor.avatar} />}
            primaryText={message.text}
            secondaryText={message.date}
            key={index}
          />
        )}
      </List> 
    )
  }
  return (
    <div>
      <CardText style={messageBoxStyle}>
        {messageList}
      </CardText>
      <CardActions style={messageInputWrapperStyle}>
        <TextField
          hintText="Write a message ..." 
          onChange={(e, text) => onUpdateText(text)}
          value={text}
          style={messageInputStyle}
        />
        <IconButton
          tooltip="Send"
          onClick={() => onSend(socket, interlocutor.apiUser, text)}
          disabled={!text}
          style={sendButtonStyle}
        >
          <ContentSend color={grey400} hoverColor={red800} />
        </IconButton>
      </CardActions>
    </div>
  )
}

Messages.propTypes = {
  socket: PropTypes.object,
  userAvatar: PropTypes.string,
  interlocutor: PropTypes.object,
  text: PropTypes.string,
  messages: PropTypes.array,
  onUpdateText: PropTypes.func,
  onSend: PropTypes.func
}