import React from 'react'
import {Link} from 'react-router-dom'

export const EmailConfirm = () => {
  return(
    <div className="page">
      <h1>Email confirmed</h1>
      <Link to="/user/signin">Signin</Link>
    </div>
  )
}
