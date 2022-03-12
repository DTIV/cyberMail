import React from 'react'
import "../Sidebar/sidebar.css"
import MobileSidebar from '../Sidebar/MobileSidebar';

const MailList = () => {
  function openLeftNav() {
    document.getElementById("mobile-left-mySidenav").style.width = "250px";
  }

  function openRightNav() {
    document.getElementById("mobile-right-mySidenav").style.width = "250px";
  }
  return (
    <div className='mail-list'>
      <div>
        Inbox
      </div>
        <MobileSidebar side={"left"}/>
        <button onClick={openLeftNav}> &#9776; Open Menu</button>
        <button onClick={openRightNav}>Open Contacts</button>
        <MobileSidebar side={"right"}/>
    </div>
  )
}

export default MailList