import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Dog} from './dog'
import {DogUpdates} from './dog_updates/dog_updates'

const DogContainer = () => {
  const [data, setData] = useState({description: []})
  const {id} = useParams()
  useEffect(() => {
    axios.get(`/api/stray_dogs/${id}`)
      .then((res) => {
        setData(res.data)
      })
  }, [])

  return(
    <div>
      <h2 className="text-center section-header">Dog Story</h2>
      <Dog {...data}/>
      <DogUpdates dog_id={id} />
    </div>
  )
}

export {DogContainer}