import React from 'react'
import "../Sidebar/sidebar.css"
import "../../mobile.css"
import MailCard from './MailCard'
import Topbar from '../Sidebar/Topbar'
import { useState, useEffect } from 'react';

// FLAG N DELETE DOES NOT WORK FOR SEND ONLY MAILLIST
const MailList = (props) => {
  const emails = [1,2,3,4,5,6]
  const user = props.user;
  if(props.inbox){
    const inbox = props.inbox
    return (
      <div className='mail-list'>
        <div>
          Inbox
        </div>
        {
          inbox.map((e) => (
            <MailCard key={e._id} data={e} user={user}/>
          ))
        }
      </div>
    )
  }else{
    return(
      <div>
        Loading...
      </div>
    )
  }
  
}

export default MailList