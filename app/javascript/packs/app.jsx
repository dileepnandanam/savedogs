// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'components/nav'
import {currentUser} from './src/user'
import {fetchConfig} from './src/config'
import Home from 'components/home'
import {Auth} from 'components/auth'
import {Banner} from 'components/home/banner'
import axios from 'axios'
import {authHeaders} from 'src/user'

const App = () => {
  const [user, setCurrentUser] = useState(currentUser())
  useEffect(() => {
    fetchConfig()
    axios.interceptors.request.use((request) => {
      request.headers = authHeaders()
      return(request)
    })
    axios.interceptors.response.use((response) => {
      console.log(response)
      return(response)
    }, (error) => {
      if(error.response.status == 401)
        setCurrentUser(null)
    })
  }, [])
  return(
    <BrowserRouter>
      <div className="main-page">
        <Nav user={user}/>
        <Switch>
          <Route path="/" exact component={Banner} />
        </Switch>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Auth user={user} setCurrentUser={setCurrentUser}/>
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
