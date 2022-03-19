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
            <div className='box green'><small>{props.inboxAmount}</small></div>
          </div>
        </Link>
        <Link to="/sent">
          <div className='menu-btn'>
            <div>Sent</div>
            <div className='box green'><small>{props.sentAmount}</small></div>
          </div>
        </Link>
        <Link to="/sent">
          <div className='menu-btn'>
            <div>Drafts</div>
            <div className='box red'><small>0</small></div>
          </div>
        </Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
    
  )
}

export default MenuSidebar