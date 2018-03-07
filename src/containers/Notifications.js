import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import NotificationsList from '../components/NotificationsList'
import { red100 } from 'material-ui/styles/colors'
import objectToArray from '../utils/objectToArray'
import scrollToBottom from '../utils/scrollToBottom'


const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    maxHeight: 65,
    overflow: 'scroll',
    opacity: '.85',
    zIndex: 9999
  },
  paper: {
    backgroundColor: red100
  }
}

class NotificationsView extends React.Component {
  componentWillUpdate(nextProps) {
    if (nextProps.notifications.length > 1)
      scrollToBottom(this.notificationBoxRef)
  }
  render() {
    if (this.props.notifications.length) // if active notifications exist - let show them
      return (
        <div style={styles.container} ref={ref => this.notificationBoxRef = ReactDOM.findDOMNode(ref)}>
          <Paper style={styles.paper} zDepth={1}>
            <NotificationsList notifications={this.props.notifications} />
          </Paper>
        </div>
      )
    else
      return null
  }
}

NotificationsView.propTypes = {
  notifications: PropTypes.array
}

const mapStateToProps = state => {
  return {
    notifications: objectToArray(state.notifications)
  }
}

const Notifications = connect(mapStateToProps)(NotificationsView)


export default Notifications