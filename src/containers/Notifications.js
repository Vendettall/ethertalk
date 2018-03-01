import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import NotificationsList from '../components/NotificationsList'
import { red100 } from 'material-ui/styles/colors'
import objectToArray from '../utils/objectToArray'

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    opacity: '.85',
    zIndex: 9999
  },
  paper: {
    backgroundColor: red100
  }
}

function NotificationsView({notifications}) {
  let view = null

  if (notifications.length) // if active notifications exist - let show them
    view = (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={1}>
          <NotificationsList notifications={notifications} />
        </Paper>
      </div>
    )

  return view
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