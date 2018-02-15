import { connect } from 'react-redux'
import { initCurrentUser } from '../actions/currentUser'
import { setApi, setSocket } from '../actions/general'
// import { addPubKey, updatePubKey } from '../actions/pubKeys'
// import { initContacts } from '../actions/contacts'
// import { initInvitations } from '../actions/invitations'
import API from '../api'
import getWeb3 from '../utils/getWeb3'
import App from '../App'
import { push } from 'react-router-redux'
import convertToStateUser from '../utils/convertToStateUser'

// function initPubKey(apiUser, stateUser, dispatch) {
//   apiUser.getPubKey().then(pubKey => {
//     dispatch(addPubKey(pubKey, stateUser))
//     return
//   })
// }

// function proceedContacts(apiUser, dispatch) {
//   return apiUser.getContacts().then(contacts => {
//     if (!contacts.length) return {}
//     contacts.reduce((obj, apiUser) => {
//       obj[apiUser.id.toString()] = convertToStateUser(apiUser)
//       initPubKey(apiUser, obj[apiUser.id.toString()], dispatch)
//       return obj
//     }, {})
//   })
// }

// function getInvitations(apiUser) {
//   let sentInvitations = apiUser.getSentInvitations().then(invitations => {
//     if (!invitations.length) return {}
//     invitations.reduce((obj, inv) => {
//       return inv.getUser().then(user => {
//         obj[inv.id] = {
//           id: inv.id,
//           isMy: true,
//           user: convertToStateUser(user)
//         }
//         return obj
//       })
//     }, {})
//   })
//   let inboxInvitations = apiUser.getInboxInvitations().then(invitations => {
//     if (!invitations.length) return {}
//     invitations.reduce((obj, inv) => {
//       obj[inv.id] = {
//         id: inv.id,
//         isMy: false,
//         user: convertToStateUser(inv.user)
//       }
//       return obj
//     }, {})
//   })
//   return Promise.all([sentInvitations, inboxInvitations]).then((sentInv, inboxInv) => {
//     return Object.assign({}, sentInv, inboxInv)
//   }) 
// }

function setSocet(api, currentUser, dispatch) {
  let socket = new api.Whisper(currentUser)
  socket.start()
  dispatch(setSocket(socket))

  // socket.on('message', (message) => {
  //   getMessage()
  // })
}

// function getMessage(apiMessage, pubKeys) {
//   let interlocutorId = pubKeys[apiMessage.from]
//   Storage.set(interlocutorId, {
//     text: apiMessage.message,
//     isMy: false,
//     date: formatDate(apiMessage.sent)
//   })
//   return
// }

function initGeneralState(dispatch){
  getWeb3.then((web3) => {
    let api = API(web3)
    dispatch(setApi(api)) // init api in general state
    api.Accounts.instance().getAccounts()
      .then((accounts) => { // Search for account with registered user. If not found - register with 0 account
        let accountWithUser = accounts.find((value) => value.user != null)
        if (accountWithUser) {
          dispatch(initCurrentUser({
            ...convertToStateUser(accountWithUser.user),
            apiUser: accountWithUser.user,
            walletId: accountWithUser.id
          })) // init currentUser state
          setSocet(api, accountWithUser.user, dispatch) // init socket in general state
          // proceedContacts(accountWithUser.user, dispatch).then(c => dispatch(initContacts(c))) // init contacts state and pubKeys state
          // getInvitations(accountWithUser.user).then(i => dispatch(initInvitations(i))) // init invitations state
          return
        } else {
          let account = accounts[0]
          return api.UserRegistry.instance().register().then((user) => {
            account.user = user
            dispatch(initCurrentUser({
              id: user.id,
              apiUser: user,
              walletId: account.id
            })) // init user in general state
            setSocet(api, user, dispatch) // init socket in general state
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
    initGeneralState: () => initGeneralState(dispatch)
  }
}

const StartApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default StartApp