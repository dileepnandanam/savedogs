import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const Dog = (props) => {
  const openMap = () => {
    const coord = `${props.lat},${props.lngt}`
    if( (navigator.platform.indexOf("iPhone") != -1) 
      || (navigator.platform.indexOf("iPod") != -1)
      || (navigator.platform.indexOf("iPad") != -1))
        window.open("maps://maps.google.com/maps?daddr="+ coord +"&amp;ll=");
    else
      window.open("http://maps.google.com/maps?daddr="+ coord +"&amp;ll=");
  }
  return(
    <div className="dog">
      <img src={props.image} />
      <div className="marker" onClick={openMap}>
        <img src={require('../../../../images/marker.png')} />
      </div>
      <div className="description">
        {props.description}
      </div>
    </div>
  )
}

export {Dog}