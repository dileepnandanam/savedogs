import React, {useState, useEffect} from 'react'
import {Dogs} from './dogs'
import {Loading} from '../../loading'
import {Link} from 'react-router-dom'

export const DogsContainer = () => {
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(false)
  const getLocation = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(false)
      setLocation({lat: position.coords.latitude, lngt: position.coords.longitude})
    })
  }
  return(
    <div>
      <button className="find-nearby" onClick={getLocation}>Find dogs nearby</button>
      <Link className="find-nearby" to="/home/report-a-dog" >Report a Dog</Link>
      {loading ? <Loading /> : <Dogs location={location} />}
    </div>
  )
}