import React, {useState, useEffect} from 'react'
import {Dogs} from './dogs'
import {Loading} from '../../loading'
import {Link} from 'react-router-dom'

export const DogsContainer = () => {
  const [location, setLocation] = useState({})
  const [mine, setMine] = useState(false)
  const [loading, setLoading] = useState(false)
  const getLocation = () => {
    setLoading(true)
    if(!location.lat)
      navigator.geolocation.getCurrentPosition((position) => {
        setLoading(false)
        setLocation({lat: position.coords.latitude, lngt: position.coords.longitude})
      })
    else {
      setLoading(false)
      setLocation({})
    }
  }

  const getMine = () => {
    setMine(!mine)
  }
  return(
    <div>
      <button className="find-nearby" onClick={getLocation}>
        {location.lat ? "Show dogs from all places" : "Find dogs nearby"}
      </button>
      <button className="find-nearby" onClick={getMine}>
        {mine ? "Show every reports" : "Show my reports"}
      </button>
      <Link className="find-nearby" to="/home/report-a-dog" >Report a Dog</Link>
      {loading ? <Loading /> : <Dogs location={location} mine={mine}/>}
    </div>
  )
}