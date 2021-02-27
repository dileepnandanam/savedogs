import React, {useState} from 'react'
import axios from 'axios'
import {authHeaders} from '../../src/user'

export const ManageAccount = () => {
  
  const [confirmation, setConfirmation] = useState(false)
  const deleteAccount = () => {
    axios.delete('/auth', {headers: authHeaders()})
      .then(() => {
        props.setCurrentUser(null)
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
      <button onClick={() => (setConfirmation(true))} className="delete-account-start">Delete Account</button>
      <div className="clearfix" />
      {confirmation ? confirmationDialogue() : null}
    </div>
  )
}