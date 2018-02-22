import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import ContactsList from './ContactsList'
import InvitationsList from './InvitationsList'
import PropTypes from 'prop-types'
import { VISIBILITY_FILTERS } from '../constants'

export default function UsersList({filter, pubKeys, contacts, invitations, onChangeFilter, onChatWithInterlocutor, onProceedInvitation}) {
	return (
		<Tabs value={filter} onChange={onChangeFilter}>
			<Tab label="Contacts" value={VISIBILITY_FILTERS.SHOW_CONTACTS}>
				<ContactsList 
					contactsList={contacts}
					onListItemClick={onChatWithInterlocutor}
					pubKeys={pubKeys}
				/>
			</Tab>
			<Tab label="Ivitations" value={VISIBILITY_FILTERS.SHOW_INVITED}>
				<InvitationsList invitationsList={invitations} onListItemClick={onProceedInvitation} />
			</Tab>
		</Tabs>
	)
}

UsersList.propTypes = {
  filter: PropTypes.string,
	pubKeys: PropTypes.object,
	contacts: PropTypes.array,
	invitations: PropTypes.array,
	onChangeFilter: PropTypes.func,
	onChatWithInterlocutor: PropTypes.func,
	onProceedInvitation: PropTypes.func
}