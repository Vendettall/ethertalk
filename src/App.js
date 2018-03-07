import React from 'react'
import { connect } from 'react-redux'
import { fetchApiRequest } from './actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route, withRouter } from 'react-router'
import Registration from './containers/Registration'
import MainPage from './components/MainPage'
import Notifications from './containers/Notifications'
import { Spinner } from 'react-redux-spinner'

import './assets/css/App.css'

class AppView extends React.Component {
  componentWillMount () {
    this.props.onLoad()
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/registration" component={Registration} />
          <Notifications />
          <Spinner />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(fetchApiRequest())
  }
}

const App = withRouter(connect(null, mapDispatchToProps)(AppView))

export default App