import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'

const accountsListStyle = {
  width: '90%'
}

export default function AccountsList({accounts, activeAccount, api, onChoose}) {
  return (
    <DropDownMenu 
      value={activeAccount}
      openImmediately={true}
      labelStyle={{color: '#fff'}}
      autoWidth={false}
      style={accountsListStyle}>
      {accounts.map((account) => 
        <MenuItem 
          value={account.apiAccount} 
          primaryText={(account.apiAccount.user && (account.userName || 'Anonymus')) || account.apiAccount.id} 
          onClick={() => onChoose(account.apiAccount, activeAccount, api)}
          key={account.apiAccount.id}
        />
      )}
    </DropDownMenu>
  )
}

AccountsList.propTypes = {
  accounts: PropTypes.array,
  activeAccount: PropTypes.object,
  api: PropTypes.object,
  onChoose: PropTypes.func
}