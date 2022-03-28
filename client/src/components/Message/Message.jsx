import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Topbar from '../Sidebar/Topbar';

const Message = (props) => {
  const user = props.user
  const path = window.location.pathname
  const msgID = path.replace('/message/',"")

  useEffect(() => {
    const getData = async () => {
      if(user){
        const url = `http://${window.location.host}/mail/${msgID}`
        const res = await axios.get(url)
        if(res.status === 200){
          console.log(res)
        }
      }
    }
    getData()
  }, [])
  
  return (
    
    <div className='main-sec center-main'>
      <Topbar />
      Message
    </div>
  )
}

export default Message