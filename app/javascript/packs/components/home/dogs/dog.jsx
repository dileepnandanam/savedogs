import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const Dog = (props) => {
  return(
    <div className="dog">
      <img src={props.image} />
      <div className="description">
        {props.description}
      </div>
    </div>
  )
}

export {Dog}