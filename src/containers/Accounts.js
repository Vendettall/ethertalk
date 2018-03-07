import React from 'react'
import { connect } from 'react-redux'
import { changeAccount, pickAccount, toggleAccountForm } from '../actions'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'


const styles = {
  radioButton: {
    marginTop: 16
  },
  userName: {
    color: '#fff'
  }
}

function AccountsView({isOpenByClick, accounts, choosenAccount, activeAccount, isOpened,
                       onChoose, onPick, onToggle}) {
  let conjureUpButton = null

  if (isOpenByClick) { // if we only need dialog window this parameter should be false
    conjureUpButton = (
      <FlatButton 
        label={activeAccount? activeAccount.userName: '   '}
        labelStyle={styles.userName}
        onClick={() => onToggle(isOpened)}
      />
    )
  }
  
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={() => onToggle(isOpened)}
      disabled={!activeAccount}
    />,
    <FlatButton
      label="Choose"
      primary={true}
      onClick={() => onChoose(choosenAccount)}
      disabled={!choosenAccount || choosenAccount === activeAccount}
    />
  ]
  
  return (
    <div>
      { conjureUpButton }
      <Dialog
        title="Choose account/user"
        actions={actions}
        modal={true}
        open={isOpened}
        onRequestClose={() => onToggle(isOpened)}
        autoScrollBodyContent={true}
      >
        <RadioButtonGroup 
          name="AccountsList"
          defaultSelected={activeAccount}
          onChange={(e, account) => onPick(account)}>
          {accounts.map((account) =>
            <RadioButton
              value={account} 
              label={(account.apiAccount.user && (account.userName || 'Anonymus')) || account.apiAccount.id}
              // if account has user then show his name or Anonymus, else show account id
              style={styles.radioButton}
              key={account.apiAccount.id}
            />
          )}
        </RadioButtonGroup>
      </Dialog>
    </div>
  )
}

AccountsView.propTypes = {
  isOpenByClick: PropTypes.bool,
  accounts: PropTypes.array,
  choosenAccount: PropTypes.object,
  activeAccount: PropTypes.object,
  isOpened: PropTypes.bool,
  onChoose: PropTypes.func,
  onPick: PropTypes.func,
  onToggle: PropTypes.func
}

const mapStateToProps = (state, ownProrps) => {
  return {
    isOpenByClick: ownProrps.isOpenByClick,
    accounts: state.accounts.accounts,
    choosenAccount: state.accounts.choosen,
    activeAccount: state.accounts.active,
    isOpened: state.accounts.isOpened
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChoose: (choosenAccount) => dispatch(changeAccount(choosenAccount)),
    onPick: account => dispatch(pickAccount(account)),
    onToggle: isOpened => dispatch(toggleAccountForm(isOpened))
  }
}

const Accounts = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsView)


export default Accounts