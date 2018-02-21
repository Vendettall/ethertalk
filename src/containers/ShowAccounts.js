import { connect } from 'react-redux'
import { chooseAccount } from '../actions'
import AccountsList from '../components/AccountsList'

const mapStateToProps = state => {
  return {
    api: state.general.api,
    accounts: state.accounts.accounts,
    activeAccount: state.accounts.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChoose: (account, activeAccount, api) => {
      if (!activeAccount || account.id !== activeAccount.id)
        dispatch(chooseAccount(account, api))
    }
  }
}

const ShowAccounts = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsList)

export default ShowAccounts