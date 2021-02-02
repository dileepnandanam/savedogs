import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {DogContainer} from './dogs/dog_container'
import {Dogs} from './dogs/dogs'

const NeedShelter = () => {
  return(
    <div className="page">
      <h1 className="text-center">Dogs Need Shelter</h1>
      <Switch>
        <Route path="/" exact>
          <Dogs />
        </Route>
        <Route path="/home/dogs-need-shelter" exact>
          <Dogs />
        </Route>
        <Route path="/home/dogs-need-shelter/:id">
          <DogContainer />
        </Route>
      </Switch>
    </div>
  )
}

export {NeedShelter}