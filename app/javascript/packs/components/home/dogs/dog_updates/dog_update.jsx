import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
  return(
    <div className="dog-update dog">
      {attachment(props.dog_update)}
      <div className="reported-date">
        {props.dog_update.created_at}
      </div>
      <div className="description text-center">
        {props.dog_update.description}
      </div>
    </div>
  )
}