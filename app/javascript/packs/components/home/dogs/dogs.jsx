import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Dog} from './dog'

const Dogs = () => {
  const [data, setData] = useState({dogs: [], next_page: 1})
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadDogs(1)
  }, [])

  const loadDogs = (page_no) => {
    axios.get(`/api/stray_dogs/?page=${page_no}`)
      .then((res) => {
        setData({dogs: [...data.dogs,...res.data.dogs], next_page: parseInt(res.data.next_page)})
      })
  }

  const loadNext = () => {
    loadDogs(data.next_page)
  }
  return(
    <div className="page">
      {data.dogs.map((e) => {
        return(<Dog {...e} key={e.id}/>)
      })}
      {data.next_page ? <button onClick={loadNext}>Next</button> : false}
    </div>
  )
}

export {Dogs}