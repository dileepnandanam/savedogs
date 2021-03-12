import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {currentUser, authHeaders} from 'src/user'

export const DogUpdateForm = (props) => {
  const {handleSubmit, register, errors} = useForm()

  const onSubmit = (data) => {
    let fData = new FormData()
    fData.append('dog_update[description]', data.description)
    fData.append('dog_update[dog_id]', props.dog_id)
    if(data.image[0])  
      fData.append('dog_update[image]', data.image[0])
    axios.post('/api/dog_updates', fData, {headers: authHeaders()})
      .then((res) => {
        props.appendUpdate(res.data)
      })
  }

  return(
    <div className="report-dog">
      <form className="dog-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Post update</h3>
        
        <label>Upload photo/video</label>
        <div className="clearfix" />
        <input ref={register({require: true})} name="image" type="file" />
        <div className="clearfix" />
        
        <label>Description</label>
        <div className="clearfix" />
        <textarea ref={register({require: true})} name="description" />
        <div className="clearfix" />
        {errors.description && errors.description.message}
        <div className="clearfix" />

        <button type="submit">Post</button>
      </form>
    </div>
  )
}