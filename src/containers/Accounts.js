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

function AccountsView({isOpenByClick, accounts, choosenAccount, activeAccount, api, isOpened, onChoose, onPick, onToggle}) {
  let conjureUpButton = null
  if (isOpenByClick) {
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
      onClick={() => onChoose(choosenAccount, api)}
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
  api: PropTypes.object,
  isOpened: PropTypes.bool,
  onChoose: PropTypes.func,
  onPick: PropTypes.func,
  onToggle: PropTypes.func
}

const mapStateToProps = (state, ownProrps) => {
  return {
    isOpenByClick: ownProrps.isOpenByClick,
    api: state.general.api,
    accounts: state.accounts.accounts,
    choosenAccount: state.accounts.choosen,
    activeAccount: state.accounts.active,
    isOpened: state.accounts.isOpened
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChoose: (choosenAccount, api) => dispatch(changeAccount(choosenAccount, api)),
    onPick: account => dispatch(pickAccount(account)),
    onToggle: isOpened => dispatch(toggleAccountForm(isOpened))
  }
}

const Accounts = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsView)

export default Accounts