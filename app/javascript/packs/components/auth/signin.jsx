import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {setUserFrom, authHeaders, currentUser} from '../../src/user'
import {Link} from 'react-router-dom'
import {Facebook} from './facebook'

class Signin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="signup page">
        <h1>Signin</h1>
        <SigninForm {...this.props}/>
      </div>
    )
  }
}

function SigninForm(props) {
  const {register, handleSubmit} = useForm()
  const [login_error, setLoginError] = useState(null)
  const onSubmit = function(data) {
    axios.post('/auth/sign_in', data, {
      'Content-type': 'application/json'
    }).then(function(res) {
        setUserFrom(res)
        props.setCurrentUser(currentUser)
    }).catch(function(error) {
      setLoginError('email or password is wrong')
    })
  }

  const loginAsGuest = () => {
    axios.post('/api/users/log_as_guest',{},{})
      .then((res) => {
        setUserFrom(res)
        props.setCurrentUser(currentUser())
      })
  }
  return(
    <div className="dog-form">
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Email</label>
        <div className="clearfix" />
        <input name="email" ref={register({required: true})} placeholder="Email"/>
        <div className="clearfix" />

        <label>Password</label>
        <div className="clearfix" />
        <input name="password" ref={register({required: true})} placeholder="Password"/>
        <div className="clearfix" />
        {login_error}
        <div className="clearfix" />

        <button type="submit" className="register-button button">Login</button>
        <Link className="forgot-password" to='/user/forgot_password'>Forgot Password</Link>
        <Link className="forgot-password" to='/user/signup'>Sign Up</Link>
        <Link className="forgot-password" to='/user/resend_confirmation'>Resend confirmation email</Link>
      </form>
      <button className="login-as-guest" onClick={loginAsGuest}>Continue as Guest</button>
      <Facebook setCurrentUser={props.setCurrentUser}/>
    </div>
  )
}
export {Signin}