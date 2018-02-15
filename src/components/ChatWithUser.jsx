import React from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ShowMessages from '../containers/ShowMessages'

export default function ChatWithUser({ interlocutor }) {
  return  (     
    <Card style={{width: 'calc(66% - 10px)'}}>
      <CardHeader title={interlocutor.name} avatar={interlocutor.avatar} />
      <Divider />
      <CardTitle title="Last messages" style={{textAlign: 'center'}}/>
      <ShowMessages interlocutor={interlocutor} />
    </Card>
  )
}