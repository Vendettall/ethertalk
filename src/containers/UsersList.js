import React from 'react'
import { connect } from 'react-redux'
import { chooseVisibilityFilter, chooseChatView } from '../actions'
import {Tabs, Tab} from 'material-ui/Tabs'
import ContactsList from '../components/ContactsList'
import InvitationsList from '../components/InvitationsList'
import PropTypes from 'prop-types'
import { VISIBILITY_FILTERS } from '../constants'
import { CHAT_VIEWS } from '../constants'
import objectToArray from '../utils/objectToArray'


function UsersListView({filter, contacts, invitations, onChangeFilter, onChatWithInterlocutor, onProceedInvitation}) {
	return (
		<Tabs value={filter} onChange={onChangeFilter}>
			<Tab label="Contacts" value={VISIBILITY_FILTERS.SHOW_CONTACTS}>
				<ContactsList 
					contactsList={contacts}
					onContactClick={onChatWithInterlocutor}
				/>
			</Tab>
			<Tab label="Ivitations" value={VISIBILITY_FILTERS.SHOW_INVITED}>
        <InvitationsList 
          invitationsList={invitations}
          onInvitationClick={onProceedInvitation}
        />
			</Tab>
		</Tabs>
	)
}

UsersListView.propTypes = {
  filter: PropTypes.string,
	contacts: PropTypes.array,
	invitations: PropTypes.array,
	onChangeFilter: PropTypes.func,
	onChatWithInterlocutor: PropTypes.func,
	onProceedInvitation: PropTypes.func
}

const mapStateToProps = state => {
  return {
    contacts: objectToArray(state.contacts),
    invitations: objectToArray(state.invitations),
    filter: state.chatView.visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => dispatch(chooseVisibilityFilter(filter)),
    onChatWithInterlocutor: contact =>
      dispatch(chooseChatView(CHAT_VIEWS.CHAT_WITH_USER, contact)),
    onProceedInvitation: invitation => {
      if (invitation.isMy)
        dispatch(chooseChatView(CHAT_VIEWS.SHOW_PENDING_STATE, invitation))
      else
        dispatch(chooseChatView(CHAT_VIEWS.SHOW_INVITATION, invitation))
    }
  }
}

const UsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListView)


export default UsersList