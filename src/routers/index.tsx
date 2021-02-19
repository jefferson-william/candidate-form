import React from 'react'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Main from '~/pages/main'
import Props from '~/types/routers'

const Routers: React.FC<Props> = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route exact path="/linkedin" component={LinkedInPopUp} />
    </Switch>
  </ConnectedRouter>
)

export default Routers
