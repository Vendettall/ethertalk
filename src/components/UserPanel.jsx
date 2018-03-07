import React from 'react'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import SearchUser from '../containers/SearchUser'
import Accounts from '../containers/Accounts'
import PropTypes from 'prop-types'


const styles = {
  userPanel: {
    boxShadow: 'none'
  }
}

function UserPanel({name, avatar}) {
  return (
    <AppBar
      title={<Accounts isOpenByClick />}
      iconElementRight={<SearchUser />}
      iconElementLeft={<Avatar src={avatar} />}
      style={styles.userPanel}
    />
  )
}

UserPanel.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string
}


export default UserPanel