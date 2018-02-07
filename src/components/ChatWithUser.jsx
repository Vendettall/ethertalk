import React from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ShowMessages from '../containers/ShowMessages'

export default function ChatWithUser({name, avatar}) {
  return  (     
    <Card style={{width: 'calc(66% - 10px)'}}>
      <CardHeader title={name} avatar={avatar} />
      <Divider />
      <CardTitle title="Last messages" style={{textAlign: 'center'}}/>
      <ShowMessages />
    </Card>
  )
}