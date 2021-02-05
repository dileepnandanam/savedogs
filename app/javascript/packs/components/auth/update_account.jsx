import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {authHeaders} from '../../src/user'

export const UpdateAccount = () => {
  const [updated, setUpdated] = useState(false)
  const {handleSubmit, errors, register, reset} = useForm()
  const onSubmit = (data) => {
    axios.put('/api/users/update_current_user', {user: data}, {headers: authHeaders()})
      .then((res) => {
        setUpdated(true)
      })
  }

  useEffect(() => {
    axios.get('/api/users/get_current_user', {headers: authHeaders()})
      .then((res) => (res.data))
      .then((res) => {
        reset({name: res.name, address: res.address})
      })
  }, [])
  const form = () => {
    return(
      <div className="dog-form">
        <h1>Update account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <div className="clearfix" />
          <input name="name" ref={register({required: true})} placeholder="name"/>
          <div className="clearfix" />

          <label>Petfoods receiving address</label>
          <div className="clearfix" />
          <textarea name="address" ref={register({required: true})} placeholder="name"/>
          <div className="clearfix" />

          <button type="submit">Update</button>
          <Link className="forgot-password" to='/user/password_update'>Update Password</Link>
        </form>
      </div>
    )
  }
  return(
    updated ? <Redirect to="/user/update_account/success" /> : form()
  )
}

export const UpdateAccountSuccess = () => {
  return(
    <div className="page">
      <h1>Account Updated</h1>
    </div>
  )
}
