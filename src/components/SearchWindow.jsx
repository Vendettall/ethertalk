import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'

export default function SerachUser({general, text, answer, onUpdateText, onSearch}) {
  return (
    <div style={{position: 'relative'}}>
      <TextField 
        hintText="Search user ..."
        onChange={(e, text) => onUpdateText(text)}
        value={text}
        style={{width: '100%', paddingRight: '24px'}}
      />
      <IconButton
        onClick={() => onSearch(general, text, answer)}
        disabled={text.length !== 42}
        style={{position: 'absolute', right: '-12px', top: '0'}}
      >
        <ActionSearch color={grey400} hoverColor={red800} />
      </IconButton>
    </div>
  )
}
  