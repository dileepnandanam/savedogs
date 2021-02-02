import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {Banner} from './home/banner'
import {Report} from './home/report'
import {NeedShelter} from './home/need_shelter'
import {Updates} from './home/updates'

const Home = () => {
  return(
    <div className="Home">
      <Banner />
      <Switch>
        <Route path="/" exact>
          <NeedShelter />
        </Route>
        <Route path="/home/report-a-dog">
          <Report />
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