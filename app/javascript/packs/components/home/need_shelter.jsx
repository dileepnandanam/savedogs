import React from 'react'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import {DogContainer} from './dogs/dog_container'
import {DogsContainer} from './dogs/dogs_container'
import {Report} from './report'
import {currentUser} from '../../src/user'
const NeedShelter = () => {
  return(
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <h1 className="text-center">Dogs Need Shelter</h1>
          <DogsContainer />
        </Route>
        <Route path="/home/dogs-need-shelter" exact>
          <DogsContainer />
        </Route>
        <Route path="/home/dogs-need-shelter/:id" exact>
          <DogContainer />
        </Route>
        <Route path="/home/dogs-need-shelter/:dog_id/edit">
          {currentUser() ? <Report isEditing={true}/> : <Redirect to="/user/signin" />}
        </Route>
      </Switch>
    </div>
  )
}

export {NeedShelter}