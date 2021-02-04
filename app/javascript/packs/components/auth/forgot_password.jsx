import React from 'react'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import axios from 'axios'

const ForgotPassword = function(props) {

  const [emailEntered, setEmailEntered] = useState(false)
  return(
    <div className="signup page">
      <h1>Forgot password</h1>
      {emailEntered ? <Success email={emailEntered}/> : <Form setEmailEntered={setEmailEntered} /> }
    </div>
  )
}

const Form = function(props) {
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState()
  const onSubmit = (data) => {
    axios.post('/auth/password', data, {
      'Content-type': 'appplication/json'
    }).then((res) => {
      props.setEmailEntered(data.email)
    }).catch((res) => {
      setError('Email not found')
    })
  }
  return(
    <div className="dog-form form">
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Email</label>
        <div className="clearfix" />
        <input name="email" ref={register({required: true})} placeholder="Email"/>
        {error}
        <div className="clearfix" />

        <button type="submit" className="register-button button">submit</button>
      </form>
    </div>
  )
}
const Success = (props) => {
  return(
    <h1>Reset link sent to {props.email}</h1>
  )
}

export {ForgotPassword}