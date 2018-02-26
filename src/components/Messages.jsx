import React from 'react'
import ReactDOM from 'react-dom'
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

export default class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.messageList = 'Type something ...'
    this.messageBoxRef = null
  }
  componentDidMount() {
    if (this.props.messages)
      this.scrollToBottom()
  }
  componentWillUpdate(nextProps) {
    if (nextProps.messages && nextProps.messages !== this.props.messages)
      this.scrollToBottom()
  }
  scrollToBottom = () => {
    let currentScroll = false
    this.messageBoxRef.onscroll = () => currentScroll = true
    if (currentScroll) return
    
    const scrollHeight = this.messageBoxRef.scrollHeight
    const height = this.messageBoxRef.clientHeight
    const maxScrollTop = scrollHeight - height
    this.messageBoxRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }
  render() {
    if (this.props.messages.length)
      this.messageList = (
        <List>
          {this.props.messages.map((message, index) =>
            <ListItem 
              leftAvatar={<Avatar src={message.isMy? this.props.userAvatar: this.props.interlocutor.avatar} />}
              primaryText={message.text}
              secondaryText={message.date}
              key={index}
            />
          )}
        </List> 
      )

    return (
      <div>
        <CardText style={messageBoxStyle} ref={ref => this.messageBoxRef = ReactDOM.findDOMNode(ref)}>
          {this.messageList}
        </CardText>
        <CardActions style={messageInputWrapperStyle}>
          <TextField
            hintText="Write a message ..." 
            onChange={(e, text) => this.props.onUpdateText(text)}
            value={this.props.text}
            style={messageInputStyle}
          />
          <IconButton
            tooltip="Send"
            onClick={() => this.props.onSend(this.props.socket, this.props.interlocutor.apiUser, this.props.text)}
            disabled={!this.props.text}
            style={sendButtonStyle}
          >
            <ContentSend color={grey400} hoverColor={red800} />
          </IconButton>
        </CardActions>
      </div>
    )
  }
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