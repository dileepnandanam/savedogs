import React from 'react'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'
import {setUserFrom, currentUser} from '../../src/user'
import {getConfig} from '../../src/config'
import {SetAuthContext} from 'src/contexts/auth'

export const Facebook = (props) => {
  const authenticate = React.useContext(SetAuthContext)
  const responseFacebook = (response) => {
    axios.post('/api/users/login_from_facebook',
      {fb_access_token: response.accessToken},
      {headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      authenticate(res)
    })
  }

  return(
    <FacebookLogin
      appId={getConfig('FB_APP_ID')}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      disableMobileRedirect={true}
      cssClass="fb-login"
    />
  )
}