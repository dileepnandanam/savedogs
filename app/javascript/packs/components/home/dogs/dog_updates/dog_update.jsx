import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {currentUser, authHeaders} from '../../../../src/user'

export const DogUpdate = (props) => {
  const attachment = (dog_update) => {
    if(dog_update.attachment_type == "video") {
      return(
        <video src={dog_update.image} controls />
      )
    }
    else if(dog_update.attachment_type == "image") {
      return(
        <img src={dog_update.image} />
      )
    }
  }
  const [deleted, setDeleted] = useState(false)
  const deleteHandle = () => {
    axios.delete(`/api/dog_updates/${props.dog_update.id}`, {headers: authHeaders()})
      .then(() => {
        setDeleted(true)
      })
  }
  const deleteLink = () => {
    if(currentUser() && (currentUser().id == props.dog_update.user_id)) {
      return(
        <button className="dog-delete" onClick={deleteHandle}>delete</button>
      )
    }
  }
  return(
    <div className="dog-update dog" style={{transition: 'transform 0.2s linear 0s, max-height 0.2s linear 0s', maxHeight: deleted ? '0px' : '9999px', transform: deleted ? 'scale(0,0)' : 'scale(1,1)'}}>
      {attachment(props.dog_update)}
      <div className="reported-date">
        {props.dog_update.created_at}
      </div>
      <div className="description text-center">
        {props.dog_update.description.map((segment, i) => (
          <span key={i}>
            {segment}
            <br />
          </span>
        ))}
      </div>
      {deleteLink()}
    </div>
  )
}