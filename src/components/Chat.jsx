import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Messages from './Messages';
import SendMessage from './SendMessage';

const stub = [...Array(20)].map((u, i) => u = { id: i, text: `Text${i}`, author: 'Dr Who', date: Date.now() })

export default function Sidebar({name = 'JOE', avatar = './images/joe.png'}) {
  return (
    <Card style={{width: 'calc(66% - 10px)'}}>
      <CardHeader title={name} avatar={avatar} />
      <Divider />
      <CardTitle title="Last messages" style={{textAlign: 'center'}}/>
      <CardText style={{height: 'calc(100vh - 248px)', overflowY: 'scroll'}}>
        <Messages messages={stub} />
      </CardText>
      <CardActions>
        <SendMessage />
      </CardActions>
    </Card>
  );
}