import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'

export default function AccountsList({accounts, activeAccount, api, onChoose}) {
  return (
    <DropDownMenu 
      value={activeAccount}
      openImmediately={true}
      labelStyle={{color: '#fff'}}
      iconStyle={{top: '-2px'}}
      autoWidth={false}
      style={{width: '90%'}}>
      {accounts.map((account) => 
        <MenuItem 
          value={account} 
          primaryText={(account.user && (account.user.getProfile().name || 'Anonymus')) || account.id} 
          onClick={() => onChoose(account, activeAccount, api)} key={account.id}
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