import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {setUserFrom, authHeaders, currentUser} from '../../src/user'

class Signup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="signup page">
        <h1>Signup</h1>
        <SignupForm {...this.props}/>
      </div>
    )
  }
}

function SignupForm(props) {
  const {register, handleSubmit, errors} = useForm()
  const onSubmit = function(data) {
    axios.post('/auth', {...data, confirm_success_url: 'http://localhost:3000/email_confirm'}, {
      'Content-type': 'application/json'
    }).then(function(res) {
        setUserFrom(res)
        props.setCurrentUser(currentUser())
    }).catch((res) => {
      console.log(res)
    })
  }


  return(
    <div className="dog-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Name</label>
        <div className="clearfix" />
        <input name="name" ref={register({required: true})} placeholder="Name"/>
        <div className="clearfix" />
        
        <label>Email</label>
        <div className="clearfix" />
        <input name="email" ref={register({required: true, validate: 
          async (value) => {
            let valid = true
            await axios.get(`/api/users/email_taken/?email=${value}`)
              .then((res) => {
                if(res.data.email_taken == true)
                  valid = 'Email already taken'
              })
            return valid
          }
        })} placeholder="Email"/>
        <div className="clearfix" />
        {errors.email && errors.email.message}
        <div className="clearfix" />

        <label>Password</label>
        <div className="clearfix" />
        <input name="password" ref={register({required: true})} placeholder="Password"/>
        <div className="clearfix" />

        <label>Password Confirmation</label>
        <div className="clearfix" />
        <input name="password_confirmation" ref={register({required: true})} placeholder="Password Confirmation"/>
        <div className="clearfix" />

        <button type="submit" className="register-button button">Register</button>
      </form>
    </div>
  )
}
export {Signup}