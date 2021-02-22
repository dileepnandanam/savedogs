import React from 'react'
import {Link} from 'react-router-dom'
import {currentUser} from '../src/user'
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

const Nav = (props) => {
  return(
    <div className="nav-bar">
      <Link to="/" className="nav-item">Home</Link>
      {props.user ? <AccountMenuSignedIn /> : <AccountMenuSignedOut />}
      <div className="clearfix" />
    </div>
  )
}

const AccountMenuSignedIn = () => {
  return(
    <div className="dropdown">
      <button className="nav-item dropdown-toggle float-right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Account
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <Link to="/user/signout" className="dropdown-item">Signout</Link>
      </div>
    </div>
  )
}

const AccountMenuSignedOut = () => {
  return(
    <div className="dropdown">
      <button className="nav-item dropdown-toggle float-right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Account
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <Link to="/user/signin" className="dropdown-item">Signin</Link>
        <Link to="/user/signup" className="dropdown-item">Signup</Link>
      </div>
    </div>
  )
}
export {Nav}
