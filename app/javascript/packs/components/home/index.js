import React from 'react'
import {Link, Switch, Route, useRoutMatch, Redirect} from 'react-router-dom'
import {Report} from 'components/home/report'
import DogsContainer from 'components/home/dogs'
import {currentUser} from 'src/user'
import DogUpdates from 'components/home/dogs/dog_updates'
import {DogContainer} from 'components/home/dogs/dog_container'
const Home = () => {
  return(
    <div className="Home">
      <Switch>
        <Route path="/" exact>
          <DogsContainer />
        </Route>
        <Route path="/home/report">
          {currentUser() ? <Report /> : <Redirect to="/user/signin" />}
        </Route>
        <Route path="/home/dogs/dogs-updates">
          <DogUpdates />
        </Route>
        <Route path="/home/dogs/:id" exact>
          <DogContainer />
        </Route>
        <Route path="/home/dogs/:dog_id/edit">
          {currentUser() ? <Report isEditing={true}/> : <Redirect to="/user/signin" />}
        </Route>
      </Switch>
    </div>
  )
}

export default Home