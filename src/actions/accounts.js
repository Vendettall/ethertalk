import { FETCH_ACCOUNTS_REQUEST, FETCH_ACCOUNTS_SUCCESS, FETCH_ACCOUNTS_ERROR,
  CHANGE_ACCOUNT, SET_ACCOUNT, TOGGLE_ACCOUNT_FORM, PICK_ACCOUNT } from '../constants'


export const fetchAccountsRequest = api => {
  return {
    type: FETCH_ACCOUNTS_REQUEST,
    payload: ({ api })
  }
}

export const fetchAccountsSuccess = (accounts, startedAccount) => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: ({ accounts, startedAccount })
  }
}

export const fetchAccountsError = error => {
  return { 
    type: FETCH_ACCOUNTS_ERROR,
    payload: new Error(error),
    error: true 
  }
}

export const changeAccount = account => {
  return {
    type: CHANGE_ACCOUNT,
    payload: ({ account })
  }
}

export const setAccount = account => {
  return {
    type: SET_ACCOUNT,
    payload: { account: account }
  }
}

export const pickAccount = account => { // it's just to control selected radiobutton
  return {
    type: PICK_ACCOUNT,
    payload: ({ account })
  }
}

export const toggleAccountForm = isOpened => {
  return {
    type: TOGGLE_ACCOUNT_FORM,
    payload: ({ isOpened })
  }
}