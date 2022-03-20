import React from 'react'
import "../Sidebar/sidebar.css"
import "../../mobile.css"
import MailCard from './MailCard'
import Topbar from '../Sidebar/Topbar'
import { useState, useEffect } from 'react';
import axios from 'axios'

// FLAG N DELETE DOES NOT WORK FOR SEND ONLY MAILLIST
const MailList = (props) => {
  const emails = [1,2,3,4,5,6]
  const user = props.user;

  const [getBlock, setBlock] = useState(false)

  useEffect(() => {
    const getUsersBlocked = async () => {
      if(user){
        const res = await axios.get(`/block/all/${user}`)
        if(res){
          const data = res.data
          setBlock(data)
        }
      }
    }
    getUsersBlocked()
  }, [user])


  if(props.inbox){
    const inbox = props.inbox
    return (
      <div className='mail-list'>
        <div className='lrg-title'>
          Inbox
        </div>
        {
          inbox.length > 0 ?
            inbox.map((e) => (
              <MailCard key={e._id} data={e} user={user} blocked={getBlock}/>
            ))
          :
          <div className='md-title'>No Messages.</div>
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