import React, {useState} from 'react'
import Main from 'components/main'
import ReactDOM from 'react-dom'
import {AuthProvider} from 'src/contexts/auth'

const App = () => {
  return(
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})

