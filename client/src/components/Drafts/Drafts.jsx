import React from 'react'
import Topbar from '../Sidebar/Topbar'
import Showcase from '../Showcase/Showcase'
const Drafts = (props) => {
  const user = props.user
  if(user){
    return (
      <div className='main-sec center-main'>
          <Topbar following={props.following} provider={props.provider}/>
          <div className='lrg-title'>
              Drafts
          </div>
          <div className='md-title'>
              No Drafts.
          </div>
      </div>
    )
  }else{
    return(
      <Showcase />
    )
  }
  
}

export default Drafts