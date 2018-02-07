import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {CardActions, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'

export default function Messages({messages, text, avatar, onSend, updateText}) {
  let messageList = messages.length ? (
    <List>
      {messages.map((message) =>
        <ListItem 
          leftAvatar={<Avatar src={message.avatar} />}
          primaryText={message.text}
          secondaryText={message.date}
          key={message.id}
        />
      )}
    </List> 
  ) : 'Type something ...'
  return (
    <div>
      <CardText style={{height: 'calc(100vh - 248px)', overflowY: 'scroll'}}>
        {messageList}
      </CardText>
      <CardActions style={{padding: '0 30px', position: 'relative'}}>
        <TextField 
          hintText="Write a message ..."
          onChange={(e, text) => updateText(text)}
          value={text}
          style={{width: '100%', paddingRight: '24px'}}
        />
        <IconButton
          tooltip="Send"
          onClick={() => onSend(text, avatar)}
          disabled={!text}
          style={{position: 'absolute', right: '10px', top: '0'}}
        >
          <ContentSend color={grey400} hoverColor={red800} />
        </IconButton>
      </CardActions>
    </div>
  )
}