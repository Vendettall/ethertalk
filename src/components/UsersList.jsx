import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserList from './UserList'

export default class TabsExampleControlled extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 'allUsers',
		};
	}

	handleChange = (value) => {
		this.setState({
			value: value,
		});
	};

	render() {
		return (
			<Tabs value={this.state.value} onChange={this.handleChange}>
				<Tab label="All users" value="allUsers">
					<UserList userList={this.props.allUsers} />
				</Tab>
				<Tab label="Ivites" value="invites">
					<UserList userList={this.props.invites} />
				</Tab>
			</Tabs>
		);
	}
}
