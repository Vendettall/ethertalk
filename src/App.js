import React from 'react'
import { connect } from 'react-redux'
import { setApi } from './actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route, withRouter } from 'react-router'
import Registration from './containers/Registration'
import MainPage from './components/MainPage'

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
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(setApi())
  }
}

const App = withRouter(connect(null, mapDispatchToProps)(AppView))

export default App