import axios from 'axios'

export const setUserFrom = function(res) {
  if(!res)
    return
  localStorage.setItem('current_user', JSON.stringify(
    {
      'access-token': res.headers['access-token'],
      'client': res.headers['client'],
      'uid': res.headers['uid'],
      'id': res.data.data.id
    }
  ))
  return true
}

export const revoke = function(res) {
  
}

export const removeUser = function() {
  localStorage.removeItem('current_user')
}

export const authHeaders = function() {
  const headers = JSON.parse(localStorage.getItem('current_user')) || {}
  return {
    'access-token': headers['access-token'],
    'client': headers['client'],
    'uid': headers['uid']
  }
}

export const currentUser = function() {
  return JSON.parse(localStorage.getItem('current_user'))
}