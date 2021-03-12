import React from 'react'

export const Loading = (props) => {
  return(
    <div className="text-center">
      {props.message}
      <img src={require('images/loading.gif')} className="loading"/>
    </div>
  )
}