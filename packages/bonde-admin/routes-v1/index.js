import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevTools from '~client/components/dev-tools'
import '~client/styles/main.scss'
import { TechnicalIssues } from '~client/components/error/index'
import { ZendeskWidget } from '~client/components/external-services'
import { GoogleFontsLoader } from '~client/components/fonts'
import NotificationSystem from '~client/components/notification-system'

// Page
import LoginPage from '~routes/admin/not-authenticated/account-login/page.connected'
import RegisterPage from '~routes/admin/not-authenticated/account-register/page.connected'
import AccountRetrievePage from '~routes/admin/not-authenticated/account-retrieve/page.connected'
import SubscriptionEditPage from '~routes/public/subscription-edit/page.connected'
import RedirectPage from '~routes/admin/not-authenticated/redirect/page'
// Route
import LoggedRoute from './subroutes/logged'

const AuthExample = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/account/retrieve' component={AccountRetrievePage} />
        <Route exact path='/subscriptions/:id/edit' component={SubscriptionEditPage} />
        <Route exact path='/redirect' component={RedirectPage} />
        <Route path='/' component={LoggedRoute} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    <DevTools />
    <ZendeskWidget />
    <NotificationSystem />
    <GoogleFontsLoader fonts='Source Sans Pro' />
  </div>
)

export default AuthExample
