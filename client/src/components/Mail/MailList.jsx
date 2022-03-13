import React from 'react'
import "../Sidebar/sidebar.css"
import "../../mobile.css"
import MailCard from './MailCard'
import Topbar from '../Sidebar/Topbar'

const MailList = (props) => {
  const emails = [1,2,3,4,5,6]
  return (
    <div className='mail-list'>
      {
        emails.map((e) => (
          <MailCard key={e}/>
        ))
      }
      
    </div>
  )
}

export default MailList