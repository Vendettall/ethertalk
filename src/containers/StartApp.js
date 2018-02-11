import { connect } from 'react-redux'
import { initCurrentUser, updateUserId } from '../actions/currentUser'
import { initContacts } from '../actions/contacts'
import { initInvitations } from '../actions/invitations'
import API from '../api'
import getWeb3 from '../utils/getWeb3'
import App from '../App'
import { push } from 'react-router-redux'

function convertToStateUser(user) {
  let profile = user.getProfile()
  return {
    id: user.id,
    name: profile.name? profile.name: '',
    avatar: profile.avatar? profile.avatar: ''
  }
}

function getContacts(user) {
  return user.getContacts().then(contacts => {
    if (!contacts.length) return {}
    contacts.reduce((obj, user) => {
      obj[user.id.toString()] = convertToStateUser(user)
      return obj
    }, {})
  })
}

function getInvitations(user) {
  let sentInvitations = user.getSentInvitations().then(invitations => {
    if (!invitations.length) return {}
    invitations.reduce((obj, inv) => {
      obj[inv.id] = {
        id: inv.id,
        isMy: true,
        user: convertToStateUser(inv.user)
      }
      return obj
    }, {})
  })
  let inboxInvitations = user.getInboxInvitations().then(invitations => {
    if (!invitations.length) return {}
    invitations.reduce((obj, inv) => {
      obj[inv.id] = {
        id: inv.id,
        isMy: false,
        user: convertToStateUser(inv.user)
      }
      return obj
    }, {})
  })
  return Promise.all([sentInvitations, inboxInvitations]).then((sentInv, inboxInv) => {
    return Object.assign({}, sentInv, inboxInv)
  }) 
}

function initUser(dispatch){
  // Get network provider and web3 instance.
  // See utils/getWeb3 for more info.
  getWeb3.then((web3) => {
    let api = API(web3)
    api.Accounts.instance().getAccounts()
      .then((accounts) => { // Search for account with registered user. If not found - register with 0 account
        let accountWithUser = accounts.find((value) => value.user != null)
        if (accountWithUser) {
          api.Accounts.instance().currentAccount = accountWithUser.id
          dispatch(initCurrentUser(convertToStateUser(accountWithUser.user))) // init currentUser state
          getContacts(accountWithUser.user).then(c => dispatch(initContacts(c))) // init contacts state
          getInvitations(accountWithUser.user).then(i => dispatch(initInvitations(i))) // init invitations state
          return
        } else {
          let account = accounts[0]
          return api.UserRegistry.instance().register().then((user) => {
            account.user = user
            dispatch(updateUserId(user.id))
            dispatch(push('/registration'))
            return
          })
        }
      })
  })
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initUser: () => initUser(dispatch)
  }
}

const StartApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default StartApp