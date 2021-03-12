import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {setUserFrom, authHeaders, currentUser} from '../../src/user'
import {getConfig} from '../../src/config'
import {Facebook} from './facebook'
import {SetAuthContext} from 'src/contexts/auth'

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
  const {register, handleSubmit, errors, getValues} = useForm()
  const authenticate = React.useContext(SetAuthContext)

  const [success, setSuccess] = useState(false)
  const onSubmit = function(data) {
    axios.post('/auth', {...data, confirm_success_url: `${getConfig('BASE_URL')}/email_confirm`}, {
      'Content-type': 'application/json'
    }).then(function(res) {
        setSuccess(true)
    })
  }
  const form = () => (
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
        <input name="password_confirmation" ref={register({required: true,
          validate: () => {
            return getValues('password_confirmation') == getValues('password')
          }
        })} placeholder="Password Confirmation"/>
        <div className="clearfix" />
        {errors.password_confirmation && errors.password_confirmation.type == 'validate' && 'Passwords does not match'}
        <div className="clearfix" />

        <button type="submit" className="register-button button">Signup</button>
      </form>
      <Facebook setCurrentUser={props.setCurrentUser}/>

    </div>
  )
  return(
    <div>
      {success ? <Redirect to="/user/confirmation_sent" /> : form()}
    </div>
  )
}
export {Signup}