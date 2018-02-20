export const getAccounts = async api => {
  let accounts = await api.Accounts.instance().getAccounts().then(accounts => {
    return accounts
  })
  return {
    type: 'GET_ACCOUNTS',
    accounts
  }
}

export const chooseAccount = (account, api) => {
  let hasUser = account.user? true: false
  return {
    type: 'CHOOSE_ACCOUNT',
    api,
    account, 
    hasUser
  }
}