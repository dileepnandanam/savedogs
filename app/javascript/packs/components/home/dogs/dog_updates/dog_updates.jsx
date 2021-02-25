import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {DogUpdate} from './dog_update'
import {DogUpdateForm} from './dog_update_form'

export const DogUpdates = (props) => {
  const [dog_updates, setDogUpdates] = useState([])
  useEffect(() => {
    axios.get(`/api/dog_updates?dog_id=${props.dog_id}`, {
      headers: {"Content-type": "application/json"}
    }).then((res) => {
      setDogUpdates(res.data)
    })
  }, [])

  const [formVisible, setFormVisible] = useState(false)

  const showForm = () => {
    setFormVisible(true)
  }

  const appendUpdate = (data) => {
    setDogUpdates([...dog_updates, data])
    setFormVisible(false)
  }

  return(
    <div>
      {dog_updates.map((dog_update) => (<DogUpdate dog_update={dog_update} key={dog_update.id} />))}
      <button className="update-form-toggle" onClick={showForm}>Post Update</button>
      {formVisible ? <DogUpdateForm dog_id={props.dog_id} appendUpdate={appendUpdate}/> : null}
    </div>
  )
}