import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { sendMessageRequest, updateMessageText } from '../actions'
import {List, ListItem} from 'material-ui/List'
import {CardActions, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'
import scrollToBottom from '../utils/scrollToBottom'


const styles = {
  messageBox: {
    height: 'calc(100vh - 248px)',
    overflowY: 'scroll'
  },
  messageInput: {
    width: '100%',
    paddingRight: '24px'
  },
  messageInputWrapper: {
    padding: '0 30px',
    position: 'relative'
  },
  sendButton: {
    position: 'absolute',
    right: '10px',
    top: '0'
  },
  sendIcon: {
    color: grey400,
    hoverColor: red800
  }
}

class MessagesView extends React.Component {
  constructor(props) {
    super(props)
    this.messageList = 'Type something ...'
    this.messageBoxRef = null
  }
  componentDidMount() {
    // if user opened chat and there exists few messages, we will scroll history to last one
    if (this.props.messages)
      scrollToBottom(this.messageBoxRef)
  }
  componentWillUpdate(nextProps) {
    // if interlocutor sent message, we will scroll history to it
    if (nextProps.messages && nextProps.messages !== this.props.messages)
      scrollToBottom(this.messageBoxRef)
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
        <CardText style={styles.messageBox} ref={ref => this.messageBoxRef = ReactDOM.findDOMNode(ref)}>
          {this.messageList}
        </CardText>
        <CardActions style={styles.messageInputWrapper}>
          <TextField
            hintText="Write a message ..." 
            onChange={(e, text) => this.props.onUpdateText(text)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                event.preventDefault()
                this.props.onSend(this.props.socket, this.props.interlocutor.apiUser, this.props.text)
              }
            }}
            value={this.props.text}
            style={styles.messageInput}
          />
          <IconButton
            tooltip="Send"
            onClick={() => this.props.onSend(this.props.socket, this.props.interlocutor.apiUser, this.props.text)}
            disabled={!this.props.text}
            style={styles.sendButton}
          >
            <ContentSend color={styles.sendIcon.color} hoverColor={styles.sendIcon.hoverColor} />
          </IconButton>
        </CardActions>
      </div>
    )
  }
}

MessagesView.propTypes = {
  socket: PropTypes.object,
  userAvatar: PropTypes.string,
  interlocutor: PropTypes.object,
  text: PropTypes.string,
  messages: PropTypes.array,
  onUpdateText: PropTypes.func,
  onSend: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    socket: state.general.socket,
    userAvatar: state.user.avatar,
    interlocutor: ownProps.interlocutor,
    text: state.messages.text,
    messages: state.messages.messages,
    messageWrapperRef: state.messages.messageWrapperRef
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateText: text => dispatch(updateMessageText(text)),
    onSend: (socket, apiInterlocutor, text) => 
      dispatch(sendMessageRequest(socket, apiInterlocutor, text))
  }
}

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesView)


export default Messages