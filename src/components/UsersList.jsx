import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import ContactsList from './ContactsList'
import InvitationsList from './InvitationsList'

export default function UsersList({filter, users, changeFilter, chatWithUser, proceedInvitation}) {
	return (
		<Tabs value={filter} onChange={changeFilter}>
			<Tab label="Contacts" value="SHOW_CONTACTS">
				<ContactsList userList={users} onListItemClick={chatWithUser} />
			</Tab>
			<Tab label="Ivitations" value="SHOW_INVITED">
				<InvitationsList userList={users} onListItemClick={proceedInvitation} />
			</Tab>
		</Tabs>
	)
}
