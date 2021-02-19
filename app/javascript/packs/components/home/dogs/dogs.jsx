import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Dog} from './dog'

const Dogs = (props) => {
  const [data, setData] = useState({dogs: [], next_page: 1})

  useEffect(() => {
    loadDogs(1)
  }, [props.location])

  const endpoint = (page_no) => {
    if(props.location.lat)
      return `/api/stray_dogs/?page=${page_no}&lat=${props.location.lat}&lngt=${props.location.lngt}`
    else
      return `/api/stray_dogs/?page=${page_no}`
  }
  const loadNextDogs = (page_no) => {
    axios.get(endpoint(page_no))
      .then((res) => {
        setData({dogs: [...data.dogs,...res.data.dogs], next_page: parseInt(res.data.next_page)})
      })
  }
  const loadDogs = (page_no) => {
    axios.get(endpoint(page_no))
      .then((res) => {
        setData({dogs: res.data.dogs, next_page: parseInt(res.data.next_page)})
      })
  }

  const loadNext = () => {
    loadNextDogs(data.next_page)
  }
  return(
    <div className="page">
      {data.dogs.map((e) => {
        return(<Dog {...e} key={e.id}/>)
      })}
      {data.next_page ? <button className="view-more" onClick={loadNext}>View More</button> : false}
    </div>
  )
}

export {Dogs}