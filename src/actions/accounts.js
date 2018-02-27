import { GET_ACCOUNTS, CHANGE_ACCOUNT, TOGGLE_ACCOUNT_FORM, PICK_ACCOUNT } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'
// import imageFromHash from '../utils/imageFromHash'

export const getAccounts = async api => {
  let startedAccount = null
  let user = null
  let apiAccounts = await api.Accounts.instance().getAccounts().then(result => {return result})
  let userNamesPromises  = apiAccounts.map(account => {
    if (account.user)
      return account.user.getProfile().then(profile => {return profile[0]})
    return null
  })
  let accounts = await Promise.all(userNamesPromises).then(names => {
    return names.map((name, index) => {
      let stateAccount = {
        apiAccount: apiAccounts[index],
        userName: name
      }

      if (!startedAccount && name)
        startedAccount = stateAccount

      return stateAccount
    })
  })
  if (startedAccount) {
    let apiAccount = startedAccount.apiAccount
    user = await convertToStateUser(apiAccount.user).then(stateUser => {
      // return imageFromHash(api, stateUser.avatar).then(base64Avatar => {
      //   stateUser.avatar = base64Avatar
        return {
          ...stateUser,
          apiUser: apiAccount.user,
          walletId: apiAccount.id
        }
      // })
    })
  }
  return {
    type: GET_ACCOUNTS,
    accounts,
    startedAccount,
    api,
    user
  }
}

export const changeAccount = async (account, api) => {
  let user = null
  let apiUser = account.apiAccount.user
  if (apiUser)
    user = await convertToStateUser(apiUser).then(stateUser => {
      // return imageFromHash(api, stateUser.avatar).then(base64Avatar => {
      //   stateUser.avatar = base64Avatar
        return {
          ...stateUser,
          apiUser: apiUser,
          walletId: account.apiAccount.id
        }
      // })
    })
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

export const pickAccount = account => {
  return {
    type: PICK_ACCOUNT,
    account
  }
}