import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

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
					<List style={{height: 'calc(100vh - 152px)', overflowY: 'scroll'}}>
						{this.props.allUsers.map((user) =>
							<ListItem primaryText={user.name} leftAvatar={<Avatar src={user.avatar} />} key={user.id}/>
						)}
					</List>
				</Tab>
				<Tab label="Ivites" value="invites">
					<List style={{height: 'calc(100vh - 152px)', overflowY: 'scroll'}}>
						{this.props.invites.map((user) =>
							<ListItem primaryText={user.name} leftAvatar={<Avatar src={user.avatar} />} key={user.id}/>
						)}
					</List>
				</Tab>
			</Tabs>
		);
	}
}
