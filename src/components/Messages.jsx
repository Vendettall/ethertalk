import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {CardActions, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'

export default class Messages extends React.Component {
  componentWillMount() {
    this.props.onNewInterlocutor(this.props.interlocutor.id, this.props.socket, this.props.pubKeys)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.interlocutor.id !== nextProps.interlocutor.id) {
      this.props.onNewInterlocutor(nextProps.interlocutor.id, this.props.socket, this.props.pubKeys)
    }
  }
  render() {
    this.messageList = 'Type something ...'
    
    if(this.props.messages.length) {
      this.messageList = (
        <List>
          {this.props.messages.map((message, index) =>
            <ListItem leftAvatar={<Avatar src={message.isMy? this.props.currentUserAvatar: this.props.interlocutor.avatar} />}
                      primaryText={message.text} secondaryText={message.date} key={index} />
          )}
        </List> 
      )
    }
    return (
      <div>
        <CardText style={{height: 'calc(100vh - 248px)', overflowY: 'scroll'}}>
          {this.messageList}
        </CardText>
        <CardActions style={{padding: '0 30px', position: 'relative'}}>
          <TextField hintText="Write a message ..." onChange={(e, text) => this.props.updateText(text)}
                    value={this.props.text} style={{width: '100%', paddingRight: '24px'}} />
          <IconButton tooltip="Send" onClick={() => this.props.onSend(this.props.socket,
                      this.props.apiInterlocutor, this.props.text)} disabled={!this.props.text}
                      style={{position: 'absolute', right: '10px', top: '0'}}>
            <ContentSend color={grey400} hoverColor={red800} />
          </IconButton>
        </CardActions>
      </div>
    )
  }
}