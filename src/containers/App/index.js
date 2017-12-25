import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin   from 'react-tap-event-plugin'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import muiTheme               from './styles/theme/mui-theme'
import { HashRouter,
         Route,
         Redirect,
         Switch }             from 'react-router-dom'
import Web3                   from 'web3'

/* 
 * Import global styles into entire app 
 */
import './styles/app.scss'

/* actions */
import * as uiActionCreators       from 'core/actions/actions-ui'
import * as providerActionCreators from 'core/actions/actions-provider'

/* application containers & components */
import Header         from 'containers/Header'
import LeftNavBar     from 'containers/LeftNavBar'
import HomeView       from 'containers/HomeView'
import ListView       from 'containers/ListView'
import DetailsView    from 'containers/DetailsView'
import RegisterView   from 'containers/RegisterView'
import Modal          from 'components/Modal'

injectTapEventPlugin()

export class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props

    /****** Set the Provider *******/
    if (typeof window.web3 !== 'undefined') {
      const currentProvider = window.web3.currentProvider
      const web3Provider = new Web3(currentProvider)
      actions.provider.setProvider(web3Provider)
    }
  }

  render() {
    const { ui, actions } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <HashRouter>
            <div>
              <Header />
              <div className="container">
                <Switch>
                  <Route path="/home" component={HomeView} />
                  <Route path="/list" component={ListView} />
                  <Route path="/register" component={RegisterView} />
                  <Redirect from="/" to="/home" />
                </Switch>
              </div>
              <LeftNavBar />
              <DetailsView />
              <Modal />
            </div>
          </HashRouter>
          <Modal
            open={ui.showModal}
            actions={ui.modalActions}
            content={ui.modalContent}
            className={ui.modalClassName}
            title={ui.modalTitle}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui      : bindActionCreators(uiActionCreators, dispatch),
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
