import React, {useState} from 'react'
import axios from 'axios'
import {authHeaders, removeUser} from '../../src/user'

export const ManageAccount = (props) => {
  const [deleted, setDeleted] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const deleteAccount = () => {
    axios.delete('/auth', {headers: authHeaders()})
      .then(() => {
        removeUser()
        props.setCurrentUser(null)
        setConfirmation(false)
        setDeleted(true)
      })
  }
  const confirmationDialogue = () => (
    <div className="confirmation-dialogue">
      Are you sure?
      <div className="confirmation-buttons">
        <button onClick={() => (setConfirmation(false))} className="delete-cancel">Cancel</button>
        <button onClick={deleteAccount} className="delete-confirm">Delete</button>
      </div>
    </div>
  )

  return(
    <div className="page">
      <h2>Delete Account</h2>
      <p>Deleting account will leave the posts about dogs but erase your email.</p>
      {deleted ? null : <button onClick={() => (setConfirmation(true))} className="delete-account-start">Delete Account</button>}
      <div className="clearfix" />
      {confirmation ? confirmationDialogue() : null}
      {deleted ? <h2>Account Deleted!</h2> : null}
    </div>
  )
}