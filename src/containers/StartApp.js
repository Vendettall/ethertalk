import { connect } from 'react-redux'
import { setApi } from '../actions/general'
import App from '../App'

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(setApi())
  }
}

const StartApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default StartApp