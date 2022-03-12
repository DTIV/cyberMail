import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'


const MenuSidebar = () => {
  return (
    <div className='sidebar-wrap full-height'>
      <div id="mySidenav" className="sidenav">
        <Link to="/new">Create</Link>
        <Link to="/">Inbox</Link>
        <Link to="/sent">Sent</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
    
  )
}

export default MenuSidebar