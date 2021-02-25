import React, {useState} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {authHeaders} from '../../src/user'
import {useEffect} from 'react'
const Report = (props) => {
  const {dog_id} = useParams()
  const {register, handleSubmit, errors, reset} = useForm()
  const [dogCreated, setDogCreated] = useState(false)
  const [id, setId] = useState(null)
  useEffect(() => {
    if(props.isEditing)
      axios.get(`/api/stray_dogs/${dog_id}`)
        .then((res) => {
          reset({description: res.data.description})
        })
  }, [])
  const onSubmit = (data) => {
    let fData = new FormData()
    fData.append('stray_dog[description]', data.description)
    if(data.image[0])  
      fData.append('stray_dog[image]', data.image[0])
    if(props.isEditing)
      axios.put(`/api/stray_dogs/${dog_id}`, fData, {headers: authHeaders()})
        .then((res) => {
          setId(res.data.id)
          setDogCreated(true)
        })
    else  
      navigator.geolocation.getCurrentPosition((position) => {
        fData.append('stray_dog[lat]', position.coords.latitude)
        fData.append('stray_dog[lngt]', position.coords.longitude)
        axios.post(`/api/stray_dogs`, fData, {headers: authHeaders()})
        .then((res) => {
          setId(res.data.id)
          setDogCreated(true)
        })

      });    
  }
  const form = () => {
    return(
      <div className="report-dog">
        <form onSubmit={handleSubmit(onSubmit)} className="dog-form">
          <label>Upload Photo/Video</label>
          <div className="clearfix" />
          <input type="file" name="image" ref={register({required: !props.isEditing})} />
          <div className="clearfix" />
          <div className="error">
            {errors.image && "Upload photo/video"}
          </div>
          <div className="clearfix" />

          <label>Describe the situation</label>
          <div className="clearfix" />
          <textarea name="description" ref={register({required: true})}/>
          <div className="clearfix" />
          <div className="error">
            {errors.description && "can't be blank"}
          </div>
          <div className="clearfix" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
  const success = () => {
    const result_path = `/home/dogs-need-shelter/${id}`
    return(
      <Redirect to={result_path} />
    )
  }
  return(
    <div className="page">
      <h1 className="text-center">Report stray dog or puppies</h1>
      <div className="text-center gps-alert">Please turn GPS on to report dog location</div>
      {dogCreated ? success() : form()}
    </div>
  )
}

export {Report}