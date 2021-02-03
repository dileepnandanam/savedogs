import React from 'react'
import {Link} from 'react-router-dom'
import {currentUser} from '../src/user'

const Nav = (props) => {
  const signin_button = <Link to="/user/signin" className="float-right nav-item">Sign In</Link>
  const signout_button = <Link to="/user/signout" className="float-right nav-item">Sign Out</Link>
  const signup_button = <Link to="/user/signup" className="float-right nav-item">Sign Up</Link>
  
  return(
    <div className="nav-bar">
      <Link to="/" className="float-left nav-item">Home</Link>
      {props.user ? signout_button : signin_button}
      {props.user ? null : signup_button}
      <div className="clearfix" />
    </div>
  )
}

export {Nav}