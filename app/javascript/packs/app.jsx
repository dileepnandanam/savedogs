// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {useState} from 'react'
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import {Nav} from './components/nav'
import {currentUser} from './src/user'
import {Signin} from './components/auth/signin'
import {Home} from './components/home'
const App = () => {
  const [user, setUser] = useState(currentUser)
  return(
    <BrowserRouter>
      <div className="main-page">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/signin">
            <Signin setUser={setUser} />
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
