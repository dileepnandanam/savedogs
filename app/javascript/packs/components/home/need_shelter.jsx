import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {DogContainer} from './dogs/dog_container'
import {Dogs} from './dogs/dogs'
import {Report} from './report'
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
        <Route path="/home/dogs-need-shelter/:id" exact>
          <DogContainer />
        </Route>
        <Route path="/home/dogs-need-shelter/:dog_id/edit">
          <Report isEditing={true}/>
        </Route>
      </Switch>
    </div>
  )
}

export {NeedShelter}