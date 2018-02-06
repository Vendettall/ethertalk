import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class SearchUser extends React.Component {
    state = {
      dataSource: [],
    };
  
    handleUpdateInput = (value) => {
      this.setState({
        dataSource: [
          value,
          value + value,
          value + value + value,
        ],
      });
    };
  
    render() {
      return (
        <AutoComplete
          hintText="Enter user name"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          fullWidth={true}
        />
      );
    }
  }
  