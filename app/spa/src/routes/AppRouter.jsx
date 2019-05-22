import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from '@/pages'
import ShopPage from '@/pages/shop'
import MyPage from '@/pages/my'
import AdminPage from '@/pages/admin/Admin'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'

import Private from './Private'

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop/" component={ShopPage} />

        <Private path="/my/" component={MyPage} />
        <Private path="/admin/" component={AdminPage} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/signup/" component={SignUp} />
      </Switch>
    </Router>
  )
}

export default AppRouter
