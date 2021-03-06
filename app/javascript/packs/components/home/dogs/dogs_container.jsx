import React, {useState, useEffect} from 'react'
import {Dogs} from './dogs'
import {Loading} from '../../loading'
import {Link} from 'react-router-dom'
import {currentUser} from '../../../src/user'

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
      <div className="filter-buttons" style={{width: currentUser() ? '855px' : '570px'}}>
        <div className="dog-button">
          <button className="inner" onClick={getLocation}>
            {location.lat ? "Show dogs from all places" : "Find dogs nearby"}
          </button>
        </div>
        <ShowForUser>
          <div className="dog-button">
            <button className="inner" onClick={getMine}>
              {mine ? "Show every reports" : "Show my reports"}
            </button>
          </div>
        </ShowForUser>
        <div className="dog-button">
          <Link className="inner" to="/home/report-a-dog" >Report a Dog</Link>
        </div>
      </div>
      <ShowForUser>
        <h2 className="report-heading">
          {mine ? "Showing dogs reported by you " : "All reported dogs "}
          {location.lat ? "in your location." : "in all places."}
        </h2>
      </ShowForUser>
      {loading ? <Loading message={"Fetching location, allow browser to access location service."}/> : <Dogs location={location} mine={mine}/>}
    </div>
  )
}
const ShowForUser = (props) => {
  return(
    currentUser() ? props.children : null
  )
}