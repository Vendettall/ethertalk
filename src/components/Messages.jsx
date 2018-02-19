import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {CardActions, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'

export default function Messages({socket, currentUserAvatar, interlocutor, text, messages, onUpdateText, onSend}) {
  let messageList = 'Type something ...'
  
  if(messages.length) {
    messageList = (
      <List>
        {messages.map((message, index) =>
          <ListItem leftAvatar={<Avatar src={message.isMy? currentUserAvatar: interlocutor.avatar} />}
                    primaryText={message.text} secondaryText={message.date} key={index} />
        )}
      </List> 
    )
  }
  return (
    <div>
      <CardText style={{height: 'calc(100vh - 248px)', overflowY: 'scroll'}}>
        {messageList}
      </CardText>
      <CardActions style={{padding: '0 30px', position: 'relative'}}>
        <TextField hintText="Write a message ..." onChange={(e, text) => onUpdateText(text)}
                  value={text} style={{width: '100%', paddingRight: '24px'}} />
        <IconButton tooltip="Send" onClick={() => onSend(socket, interlocutor.apiUser, text)}
                    disabled={!text} style={{position: 'absolute', right: '10px', top: '0'}}>
          <ContentSend color={grey400} hoverColor={red800} />
        </IconButton>
      </CardActions>
    </div>
  )
}