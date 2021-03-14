import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Dog} from 'components/home/dogs/dog'
import {authHeaders} from 'src/user'

const Dogs = (props) => {
  const [data, setData] = useState({dogs: [], next_page: 1})

  useEffect(() => {
    loadDogs(1)
  }, [props.location, props.mine])

  const endpoint = (page_no) => {
    let url = `/api/straydogs/?page=${page_no}`

    if(props.location.lat)
      url = `${url}&lat=${props.location.lat}&lngt=${props.location.lngt}`
    if(props.mine)
      url = `${url}&mine=true`
    return url
  }
  const loadNextDogs = (page_no) => {
    axios.get(endpoint(page_no), {headers: authHeaders()})
      .then((res) => {
        setData({dogs: [...data.dogs,...res.data.dogs], next_page: parseInt(res.data.next_page)})
      })
  }
  const loadDogs = (page_no) => {
    axios.get(endpoint(page_no), {headers: authHeaders()})
      .then((res) => {
        setData({dogs: res.data.dogs, next_page: parseInt(res.data.next_page)})
      })
  }

  const loadNext = () => {
    loadNextDogs(data.next_page)
  }
  return(
    <div className="page">
      {data.dogs.length > 0 ? data.dogs.map((e) => {
        return(<Dog {...e} key={e.id}/>)
      }) : <h3 className="text-center">No dogs found</h3>}
      {data.next_page ? <button className="view-more" onClick={loadNext}>View More</button> : false}
    </div>
  )
}

export {Dogs}