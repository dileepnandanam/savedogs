import React from 'react'
import {Link, Switch, Route, useRoutMatch, Redirect} from 'react-router-dom'
import {Report} from './home/report'
import {NeedShelter} from './home/need_shelter'
import {Updates} from './home/updates'
import {currentUser} from '../src/user'

const Home = () => {
  return(
    <div className="Home">
      <Switch>
        <Route path="/" exact>
          <NeedShelter />
        </Route>
        <Route path="/home/report-a-dog">
          {currentUser() ? <Report /> : <Redirect to="/user/signin" />}
        </Route>
        <Route path="/home/dogs-need-shelter">
          <NeedShelter />
        </Route>
        <Route path="/home/dogs-updates">
          <Updates />
        </Route>
      </Switch>
    </div>
  )
}

export {Home}