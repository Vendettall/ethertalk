import { connect } from 'react-redux'
import { initCurrentUser } from '../actions'
import API from '../api'
import getWeb3 from '../utils/getWeb3'
import App from '../App'

const currentUser = () => {
  // Get network provider and web3 instance.
  // See utils/getWeb3 for more info.
  getWeb3.then((web3) => {
    let api = API(web3)
    api.Accounts.instance().getAccounts()
      .then((accounts) => { // Search for account with registered user. If not found - register with 0 account
        let found = accounts.find((value) => value.user != null)
        if (found) {
          api.Accounts.instance().currentAccount = found.id
          return found
        } else {
          let account = accounts[0]
          return api.Registry.instance().register().then((user) => {
            account.user = user
            return account
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
    initUser: () => {
      console.log("HELLO", currentUser())
      let stub = {
        id: 0,
        name: 'JOE',
        avatar: 'avatar'
      }
      dispatch(initCurrentUser(stub))
    }
  }
}

const StartApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default StartApp