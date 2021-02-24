import React, {useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {getConfig} from '../../src/config'
import {Link, Redirect} from 'react-router-dom'
export const ResendConfirmation = () => {
  const {handleSubmit, register, errors} = useForm()

  const [success, setSuccess] = useState(false)
  const onSubmit = (data) => {
    axios.post("/auth/confirmation", {
      redirect_url: `${getConfig("BASE_URL")}/email_confirm`,
      email: data.email
    }).then((res) => {
      setSuccess(true)
    })
  }
  const message = () => (
    <Redirect to="/user/confirmation_sent" />
  )
  const form = () => (
    <div className="dog-form form">
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Email</label>
        <div className="clearfix" />
        <input name="email" ref={register({required: true})} placeholder="Email"/>
        {errors.email && errors.email.message}
        <div className="clearfix" />

        <button type="submit" className="register-button button">Resend Confirmation</button>
      </form>
    </div>
  )

  return(
    <div className="page">
      {success ? message() : form()}
    </div>
  )
}
export const ConfirmationSent = () => {
  return(
    <div className="page">
      <h2>Confirmation Instructions sent to your email</h2>
      <Link className="forgot-password" to="/user/resend_confirmation">Resend confirmation instruction</Link>
    </div>
  )
}