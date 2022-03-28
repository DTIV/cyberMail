import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'


const MenuSidebar = (props) => {
  return (
    <div className='sidebar-wrap full-height'>
      <div id="mySidenav" className="sidenav">
        <Link to="/new">Create</Link>
        <Link to="/" >
          <div className='menu-btn'>
            <div>Inbox</div>
          </div>
        </Link>
        <Link to="/sent">
          <div className='menu-btn'>
            <div>Sent</div>
          </div>
        </Link>
        <Link to="/drafts">
          <div className='menu-btn'>
            <div>Drafts</div>
          </div>
        </Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
    
  )
}

export default MenuSidebar