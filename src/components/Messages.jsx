import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default function Messages({messages}) {
  return (
    <List>
      {messages.map((message) =>
        <ListItem 
          leftAvatar={<Avatar src="images/ok-128.jpg" />}
          primaryText={message.text}
          secondaryText={message.date}
          key={message.id}
        />
      )}
    </List>
  );
}