// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from './components/nav'
import {currentUser} from './src/user'
import {Home} from './components/home'
import {Signin} from './components/auth/signin'
import {Signup} from './components/auth/signup'
import {ForgotPassword} from './components/auth/forgot_password'
import {PasswordReset} from './components/auth/password_reset'
import {PasswordUpdate} from './components/auth/password_update'

const App = () => {
  const [user, setCurrentUser] = useState(currentUser())
  
  return(
    <BrowserRouter>
      <div className="main-page">
        <Nav user={user}/>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/user/signin">
            {user ? <Redirect to="/" /> : <Signin setCurrentUser={setCurrentUser} />}
          </Route>
          <Route path="/user/signup">
            {user ? <Redirect to="/" /> : <Signup setCurrentUser={setCurrentUser} />}
          </Route>
          <Route path="/user/forgot_password">
            <ForgotPassword />
          </Route>
          <Route path="/user/forgot_password">
            <PasswordReset setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/user/update_password">
            <PasswordUpdate setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
