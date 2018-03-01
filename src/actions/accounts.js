import { GET_ACCOUNTS, CHANGE_ACCOUNT, TOGGLE_ACCOUNT_FORM, PICK_ACCOUNT } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'

const getStateUser = (api, apiAccount) => {
  return convertToStateUser(api, apiAccount.user)
    .then(stateUser => { 
        return {
          ...stateUser,
          apiUser: apiAccount.user,
          walletId: apiAccount.id
        }
    })
}

export const getAccounts = async api => {
  let startedAccount = null
  let user = null
  
  let apiAccounts = await api.Accounts.instance().getAccounts()
    .then(result => {return result})
  
  let userNamesPromises = apiAccounts.map(account => { // we will show userNames in accounts list
    if (account.user)
      return account.user.getProfile()
        .then(profile => {return profile[0]})
    return null
  })

  let accounts = await Promise.all(userNamesPromises) // get stateAccounts
    .then(names => {
      return names.map((name, index) => {
        let stateAccount = {
          apiAccount: apiAccounts[index],
          userName: name
        }

        if (!startedAccount && name) // if we will find user, we will choose him automatically
          startedAccount = stateAccount

        return stateAccount
      })
    })
  
  if (startedAccount)
    user = await getStateUser(api, startedAccount.apiAccount)

  return {
    type: GET_ACCOUNTS,
    api,
    accounts,
    startedAccount,
    user
  }
}

export const pickAccount = account => { // it's just to control selected radiobutton
  return {
    type: PICK_ACCOUNT,
    account
  }
}

export const changeAccount = async (account, api) => {
  let user = null

  if (account.apiAccount.user)
    user = await getStateUser(api, account.apiAccount.user)

  return {
    type: CHANGE_ACCOUNT,
    api,
    account,
    user
  }
}

export const toggleAccountForm = isOpened => {
  return {
    type: TOGGLE_ACCOUNT_FORM,
    isOpened
  }
}