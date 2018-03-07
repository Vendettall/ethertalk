import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import TextField from 'material-ui/TextField'
import {red800, grey400} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

const styles = {
  searchWrapper: {
    position: 'relative'
  },
  searchField: {
    width: '100%',
    paddingRight: '24px'
  },
  searchButton: {
    position: 'absolute',
    right: '-12px',
    top: '0'
  },
  searchIcon: {
    color: grey400,
    hoverColor: red800
  }
}

function SearchForm({text, onUpdateText, onSearch}) {
  return (
    <div style={styles.searchWrapper}>
      <TextField 
        hintText="Search user ..."
        onChange={(e, text) => onUpdateText(text)}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.preventDefault()
            onSearch(text)

          }
        }}
        value={text}
        style={styles.searchField}
      />
      <IconButton
        onClick={() => onSearch(text)}
        disabled={text.length !== 42}
        style={styles.searchButton}
      >
        <ActionSearch color={styles.searchIcon.color} hoverColor={styles.searchIcon.hoverColor} />
      </IconButton>
    </div>
  )
}

SearchForm.propTypes = {
  text: PropTypes.string,
  walletId: PropTypes.string,
  onUpdateText: PropTypes.func,
  onSearch: PropTypes.func
}

export default SearchForm