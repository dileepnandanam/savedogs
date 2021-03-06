import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {Signin} from 'components/auth/signin'
import {Signup} from 'components/auth/signup'
import {Signout} from 'components/auth/signout'
import {ForgotPassword} from 'components/auth/forgot_password'
import {PasswordReset} from 'components/auth/password_reset'
import {PasswordUpdate} from 'components/auth/password_update'
import {ResendConfirmation, ConfirmationSent} from 'components/auth/resend_confirmation'
import {EmailConfirm} from 'components/auth/email_confirm'
import {UpdateAccount, UpdateAccountSuccess} from './auth/update_account'
import {setCurrentUser} from '../src/user'
import {PrivacyPolicy} from 'components/auth/privacy_policy'
import {ManageAccount} from 'components/auth/manage_account'
export const Auth = (props) => {
  return(
    <div className="user">
      <Route path="/user/signin">
        {props.user ? <Redirect to="/" /> : <Signin setCurrentUser={props.setCurrentUser} />}
      </Route>
      <Route path="/user/signup">
        {props.user ? <Redirect to="/" /> : <Signup setCurrentUser={props.setCurrentUser} />}
      </Route>
      <Route path="/user/signout">
        <Signout setCurrentUser={props.setCurrentUser} />
      </Route>
      <Route path="/user/forgot_password">
        <ForgotPassword />
      </Route>
      <Route path="/user/password_reset">
        <PasswordReset setCurrentUser={props.setCurrentUser} />
      </Route>
      <Route path="/user/resend_confirmation">
        <ResendConfirmation />
      </Route>
      <Route path="/user/confirmation_sent">
        <ConfirmationSent />
      </Route>
      <Route path="/email_confirm">
        <EmailConfirm />
      </Route>
      <Route path="/user/password_update">
        <PasswordUpdate setCurrentUser={props.setCurrentUser} />
      </Route>
      <Route path="/user/update_account" exact>
        {props.user ? <UpdateAccount /> : <Redirect to="/user/signin"/>}
      </Route>
      <Route path="/user/update_account/success">
        <UpdateAccountSuccess />
      </Route>
      <Route path="/user/privacy_policy">
        <PrivacyPolicy />
      </Route>
      <Route path="/user/manage_account">
        <ManageAccount setCurrentUser={props.setCurrentUser} />
      </Route>
    </div>
  )
}