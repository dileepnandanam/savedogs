import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Dog} from './dog'
const DogContainer = () => {
  const [data, setData] = useState({})
  const {id} = useParams()
  useEffect(() => {
    axios.get(`/api/stray_dogs/${id}`)
      .then((res) => {
        setData(res.data)
      })
  }, [])
  return(
    <Dog {...data}/>
  )
}

export {DogContainer}