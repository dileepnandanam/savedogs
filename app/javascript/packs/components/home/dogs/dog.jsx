import React, {useState, useEffect} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {currentUser, authHeaders} from '../../../src/user'
import {getConfig} from '../../../src/config'

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
      const url = `/home/dogs/${props.id}/edit`
      return(
        <Link className="edit-dog-link" to={url}>Edit</Link>
      )
    }
  }

  const deleteDogHandle = () => {
    axios.delete(`/api/straydogs/${props.id}`, {headers: authHeaders()})
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

  const sharer_link = () => (
    <a className="fb-share-button" href={`https://www.facebook.com/sharer.php?p[url]=${getConfig('BASE_URL')}/home/dogs/${props.id}`}>
      <div className="f-button">f</div>
      Share
    </a>
  )

  const attachment = () => {
    if(props.attachment_type == "video")
      return(
        <video src={props.image} controls></video>
      )
    else
      return(
        <img src={props.image} />
      )
  }
  return(
    <div className="dog" style={{transition: 'transform 0.1s linear 0s, max-height 0.1s linear 0s', transform: deleteDog ? 'scale(0,0)' : 'scale(1,1)', maxHeight: deleteDog ? '0px' : '9999px'}}>
      {attachment()}
      <Link className="update-link" to={`/home/dogs/${props.id}`}>
        {props.dog_update_count} update{parseInt(props.dog_update_count) == 1 ? '' : 's'}
      </Link>
      <div className="text-center reported-date">
        {props.created_at}
      </div>
      <div className="marker" onClick={openMap}>
        <img src={require('images/marker.png')} />
      </div>
      <div className="dog-place">
        {props.place}
      </div>
      <div className="description">
        {props.description.map((segment, i) => (
          <span key={i}>
            {segment}
            <br />
          </span>
        ))}
      </div>
      {edit_link()}
      {delete_link()}
      {false ? sharer_link() : null}

    </div>
  )
}
export {Dog}