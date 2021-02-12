import React from 'react'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import {DogContainer} from './dogs/dog_container'
import {Dogs} from './dogs/dogs'
import {Report} from './report'
import {currentUser} from '../../src/user'
const NeedShelter = () => {
  return(
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <h1 className="text-center">Dogs Need Shelter</h1>
          <Dogs />
        </Route>
        <Route path="/home/dogs-need-shelter" exact>
          <Dogs />
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