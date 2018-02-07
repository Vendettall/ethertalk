import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import UserList from './UserList'

export default function UsersList({filter, users, changeFilter, chatWithUser, proceedInvitation}) {
	return (
		<Tabs value={filter} onChange={changeFilter}>
			<Tab label="Contacts" value="SHOW_CONTACTS">
				<UserList userList={users} onListItemClick={chatWithUser} />
			</Tab>
			<Tab label="Ivitations" value="SHOW_INVITED">
				<UserList userList={users} onListItemClick={proceedInvitation} isInvitations={true} />
			</Tab>
		</Tabs>
	)
}
