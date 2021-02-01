import React from 'react'
import {Link} from 'react-router-dom'
import {currentUser} from '../src/user'

const Nav = () => {
  const signin_button = <Link to="/signin" className="float-right nav-item">Sign In</Link>
  const signout_button = <Link to="/signout" className="float-right nav-item">Sign Out</Link>
  return(
    <div className="nav-bar">
      <Link to="/" className="float-left nav-item">Home</Link>
      {currentUser ? signout_button : signin_button}
      <div className="clearfix" />
    </div>
  )
}

export {Nav}