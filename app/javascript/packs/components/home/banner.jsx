import React from 'react'
import {Link} from 'react-router-dom'

const Banner = () => {
  return(
    <div className="banner" style={{backgroundImage: 'url(' + require('../../../images/banner.jpg') + ')' }}>
    </div>
  )
}

export {Banner}