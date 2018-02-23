import { GET_ACCOUNTS, CHOOSE_ACCOUNT } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'
// import imageFromHash from '../utils/imageFromHash'

export const getAccounts = async api => {
  let apiAccounts = await api.Accounts.instance().getAccounts().then(result => {return result})
  let userNamesPromises  = apiAccounts.map(account => {
    if (account.user)
      return account.user.getProfile().then(profile => {return profile[0]})
    return null
  })
  let accounts = await Promise.all(userNamesPromises).then(names => {
    return names.map((name, index) => {
      return {
        apiAccount: apiAccounts[index],
        userName: name
      }
    })
  })
  return {
    type: GET_ACCOUNTS,
    accounts
  }
}

export const chooseAccount = async (account, api) => {
  let user = null
  if (account.user)
    user = await convertToStateUser(account.user).then(stateUser => {
      // return imageFromHash(api, stateUser.avatar).then(base64Avatar => {
      //   stateUser.avatar = base64Avatar
        return {
          ...stateUser,
          apiUser: account.user,
          walletId: account.id
        }
      // })
    })
  return {
    type: CHOOSE_ACCOUNT,
    api,
    account,
    user
  }
}