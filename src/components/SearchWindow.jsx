import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

const searchWrapperStyle = {
  position: 'relative'
}

const searchFieldStyle = {
  width: '100%',
  paddingRight: '24px'
}

const searchButtonStyle = {
  position: 'absolute',
  right: '-12px',
  top: '0'
}

export default function SerachUser({text, api, walletId, invitations, contacts, onUpdateText, onSearch}) {
  return (
    <div style={searchWrapperStyle}>
      <TextField 
        hintText="Search user ..."
        onChange={(e, text) => onUpdateText(text)}
        value={text}
        style={searchFieldStyle}
      />
      <IconButton
        onClick={() => onSearch(text, api, walletId, invitations, contacts)}
        disabled={text.length !== 42}
        style={searchButtonStyle}
      >
        <ActionSearch color={grey400} hoverColor={red800} />
      </IconButton>
    </div>
  )
}

SerachUser.propTypes = {
  text: PropTypes.string,
  api: PropTypes.object,
  walletId: PropTypes.string,
  invitations: PropTypes.object,
  contacts: PropTypes.object,
  onUpdateText: PropTypes.func,
  onSearch: PropTypes.func
}