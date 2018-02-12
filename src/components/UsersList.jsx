import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import ContactsList from './ContactsList'
import InvitationsList from './InvitationsList'

export default function UsersList({filter, contacts, invitations, changeFilter, chatWithUser, proceedInvitation}) {
	return (
		<Tabs value={filter} onChange={changeFilter}>
			<Tab label="Contacts" value="SHOW_CONTACTS">
				<ContactsList contactsList={contacts} onListItemClick={chatWithUser} />
			</Tab>
			<Tab label="Ivitations" value="SHOW_INVITED">
				<InvitationsList invitationsList={invitations} onListItemClick={proceedInvitation} />
			</Tab>
		</Tabs>
	)
}
