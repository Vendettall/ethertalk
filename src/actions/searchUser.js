export const toggleForm = isOpened => {
  return {
    type: 'TOGGLE_FORM',
    isOpened
  }
}

export const updateSearchText = text => {
  return {
    type: 'UPDATE_SEARCH_TEXT',
    text
  }
}

export const responseStateUser = stateUser => {
  return {
    type: 'RESPONSE_STATE_USER',
    stateUser
  }
}

export const responseApiUser = apiUser => {
  return {
    type: 'RESPONSE_API_USER',
    apiUser
  }
}

export const responseAnswer = answer => {
  return {
    type: 'RESPONSE_ANSWER',
    answer
  }
}

export const wipePreviousResponse = () => {
  return {
    type: 'WIPE_PREVIOUS_RESPONSE'
  }
}