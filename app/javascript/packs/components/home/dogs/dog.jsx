import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {currentUser, authHeaders} from '../../../src/user'

const Dog = (props) => {
  const [deleteDog, setDeleteDog] = useState(false)
  const openMap = () => {
    const coord = `${props.lat},${props.lngt}`
    if( (navigator.platform.indexOf("iPhone") != -1) 
      || (navigator.platform.indexOf("iPod") != -1)
      || (navigator.platform.indexOf("iPad") != -1))
        window.open("maps://maps.google.com/maps?daddr="+ coord +"&amp;ll=");
    else
      window.open("http://maps.google.com/maps?daddr="+ coord +"&amp;ll=");
  }
  const edit_link = () => {
    if(currentUser() && props.user_id == currentUser().id) {
      const url = `/home/dogs-need-shelter/${props.id}/edit`
      return(
        <Link className="edit-dog-link" to={url}>Edit</Link>
      )
    }
  }

  const deleteDogHandle = () => {
    axios.delete(`/api/stray_dogs/${props.id}`, {headers: authHeaders()})
      .then(() => {
        setDeleteDog(true)
      })
  }
  
  const delete_link = () => {
    if(currentUser() && props.user_id == currentUser().id)
      return(<button className="dog-delete" onClick={deleteDogHandle}>Delete</button>)
    else
      return null
  }
  return(
    <div className="dog" style={{transform: deleteDog ? 'scale(0,0)' : 'scale(1,1)', maxHeight: deleteDog ? '0px' : '9999px'}}>
      <Link to={`/home/dogs-need-shelter/${props.id}`}>
        <img src={props.image} />
      </Link>
      <div className="marker" onClick={openMap}>
        <img src={require('../../../../images/marker.png')} />
      </div>
      <div className="dog-place">
        {props.place}
      </div>
      <div className="description">
        {props.description}
      </div>
      {edit_link()}
      {delete_link()}

    </div>
  )
}
export {Dog}