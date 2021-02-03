import {Redirect} from 'react-router-dom'
import {useEffect} from 'react'
import {setUserFrom, authHeaders, currentUser, removeUser} from '../../src/user'
import React from 'react'

export const Signout = function(props) {
  useEffect(() => {
    removeUser()
    props.setCurrentUser(null)
  },[])
  return(
    <div className="page">
      <h1>You have been signed out</h1>
    </div>
  )
}
