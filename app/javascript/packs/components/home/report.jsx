import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const Report = () => {

  const {register, handleSubmit, errors} = useForm()
  const [dogCreated, setDogCreated] = useState(false)
  const [id, setId] = useState(null)
  const onSubmit = (data) => {
    let fData = new FormData()
    fData.append('stray_dog[description]', data.description)
    fData.append('stray_dog[image]', data.image[0])
    navigator.geolocation.getCurrentPosition((position) => {
      fData.append('stray_dog[lat]', position.coords.latitude)
      fData.append('stray_dog[lngt]', position.coords.longitude)
      axios.post('/api/stray_dogs', fData, {})
      .then((res) => {
        setId(res.data.id)
        setDogCreated(true)
      })
    });    
  }
  const form = () => {
    return(
      <div className="p-4 report-dog">
        <form onSubmit={handleSubmit(onSubmit)} className="dog-form">
          <label>Upload Photo</label>
          <div className="clearfix" />
          <input type="file" name="image" ref={register({required: true})} />
          <div className="clearfix" />

          <label>Describe the situation</label>
          <div className="clearfix" />
          <textarea name="description" ref={register({required: true})} />
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
      <h3 className="text-center">Please turn GPS on to report dog location</h3>
      {dogCreated ? success() : form()}
    </div>
  )
}

export {Report}