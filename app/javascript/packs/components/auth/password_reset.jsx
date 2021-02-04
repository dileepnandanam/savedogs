import React from 'react'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import {setUserFrom, authHeaders, currentUser} from '../../src/user'

const PasswordReset = (props) => {

  const {register, handleSubmit, errors} = useForm()
  const query = useQuery()
  const onSubmit = (data) => {
    const headers = {
      'access-token': query.get('access-token'),
      'client': query.get('client'),
      'expiry': query.get('expiry'),
      'uid': query.get('uid')
    }
    const params = {...data,
      email: query.get('uid'),
      reset_password_token: query.get('token')
    }
    axios.put('/auth/password', params, {headers: {...headers, 'Content-type': 'application/json'}})
    .then((res) => {
        setUserFrom(res)
        props.setCurrentUser(currentUser())
        set_password_changed(true)
      }
    ).catch((res) => {
      console.log(res)
    })
  }
  const [password_changed, set_password_changed] = useState(false)
  const form = () => {
    return(
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Password</label>
        <div className="clearfix" />
        <input name="password" ref={register({required: true})} placeholder="Password"/>
        <div className="clearfix" />

        <label>Password Confirmation</label>
        <div className="clearfix" />
        <input name="password_confirmation" ref={register({required: true})} placeholder="Password"/>
        <div className="clearfix" />
        <button type="submit" className="register-button button">submit</button>
      </form>
    )
  }
  const success = () => {
    return(<h3>Password Changed</h3>)
  }
  return(
    <div className="signup page">
      <div className="dog-form form">
        <h1>Reset password</h1>
        {password_changed ? success() : form()}
      </div>
    </div>
  )
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export {PasswordReset}