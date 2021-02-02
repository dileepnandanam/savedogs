import React from 'react'
import {Link} from 'react-router-dom'

const Banner = () => {
  return(
    <div className="banner" style={{backgroundImage: 'url(' + require('../../../images/banner.jpg') + ')' }}>
      <div className="col-lg-4 col-sm-4 col-12 banner-link">
        <Link to="/home/dogs-need-shelter" >Dogs Need Shelter</Link>
      </div>
      <div className="col-lg-4 col-sm-4 col-12 banner-link">
        <Link to="/home/report-a-dog" >Report a Dog</Link>
      </div>
      <div className="col-lg-4 col-sm-4 col-12 banner-link">
        <Link to="/home/dogs-updates" >Updates</Link>
      </div>
    </div>
  )
}

export {Banner}