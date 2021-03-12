import {Redirect} from 'react-router-dom'
import {useEffect} from 'react'
import {setUserFrom, authHeaders, currentUser, removeUser} from '../../src/user'
import React from 'react'
import {SetAuthContext} from 'src/contexts/auth'

export const Signout = function(props) {
  const setCurrentUser = React.useContext(SetAuthContext)
  useEffect(() => {
    removeUser()
    setCurrentUser(null)
  },[])
  return(
    <div className="page">
      <h1>You have been signed out</h1>
    </div>
  )
}
