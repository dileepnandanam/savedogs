import React from 'react'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import axios from 'axios'
import {setUserFrom, authHeaders, currentUser} from '../../src/user'

const PasswordUpdate = () => {
  const {register, handleSubmit, errors} = useForm()
  const onSubmit = (data) => {
    axios.patch('/auth/password', data, {headers: authHeaders()})
      .then((res) => {
        console.log(res)
        set_password_changed(true)
      })
      .catch((res) => {
        console.log(res)
      })
  }

  const [password_changed, set_password_changed] = useState(false)
  const form = () => {
    return(
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>New Password</label>
        <div className="clearfix" />
        <input name="password" ref={register({required: true})} placeholder="Password"/>
        <div className="clearfix" />

        <label>Password Confirmation</label>
        <div className="clearfix" />
        <input name="password_confirmation" ref={register({required: true})} placeholder="Password"/>
        <div className="clearfix" />

        <button type="submit" className="register-button button">Login</button>
      </form>
    )
  }
  const success = () => {
    return(
      <h3>Password Changed</h3>
    )
  }
  return(
    <div className="signup page">
      <div className="dog-form form">
        {password_changed ? success() : form()}
      </div>
    </div>
  )
}

export {PasswordUpdate}