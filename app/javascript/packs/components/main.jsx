// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'components/nav'
import {currentUser} from 'src/user'
import {fetchConfig} from 'src/config'
import Home from 'components/home'
import {Auth} from 'components/auth'
import {Banner} from 'components/home/banner'
import axios from 'axios'
import {authHeaders} from 'src/user'
import {AuthContext, SetAuthContext} from 'src/contexts/auth'
``
const Main = () => {
  const user = React.useContext(AuthContext)
  const authenticate = React.useContext(SetAuthContext)
  useEffect(() => {
    fetchConfig()
    axios.interceptors.request.use((request) => {
      if(currentUser())
        request.headers = authHeaders()
      return(request)
    })
    axios.interceptors.response.use((response) => {
      console.log(response)
      return(response)
    }, (error) => {
      if(error.response.status == 401)
        authenticate(null)
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
          <Auth user={user} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Main