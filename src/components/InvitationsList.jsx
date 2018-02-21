import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import {green100, green500, orange100, orange500} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

export default function InvitationsList({invitationsList, onListItemClick}) {
  return (
    <List style={{height: 'calc(100vh - 152px)', overflowY: 'scroll'}}>
      {invitationsList.map((invitation) =>
        <ListItem
          primaryText={invitation.user.name}
          leftAvatar={<Avatar src={invitation.user.avatar} />}
          hoverColor={invitation.isMy? green500: orange500}
          style={invitation.isMy? {backgroundColor: orange100}: {backgroundColor: green100}}
          onClick={() => onListItemClick(invitation)}
          key={invitation.id}
        />
      )}
    </List>
  )
}

InvitationsList.propTypes = {
  invitationsList: PropTypes.array,
  onListItemClick: PropTypes.func
}