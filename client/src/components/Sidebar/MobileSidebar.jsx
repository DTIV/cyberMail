import React from 'react'
import { Link } from 'react-router-dom'
import Rightbar from './Rightbar';
import "./sidebar.css"

const MobileSidebar = (props) => {
  
  function closeNav(e) {
    
    document.getElementById(`mobile-${e.target.dataset.side}-mySidenav`).style.width = "0";
  }

  if(props.side === "left"){
    return (
      <div id={`mobile-${props.side}-mySidenav`} className={`mobile-sidenav mobile-${props.side}-sidenav`}>
          <a className="closebtn" onClick={(e)=>closeNav(e)} data-side={props.side}>&times;</a>
          <Link to="/new">Create</Link>
          <Link to="/">Inbox</Link>
          <Link to="/sent">Sent</Link>
          <Link to="/drafts">Drafts</Link>
          <Link to="/settings">Settings</Link>
      </div>
    )
  }else{
    return(
      <div id={`mobile-${props.side}-mySidenav`} className={`mobile-sidenav mobile-${props.side}-sidenav`}>
        <a className="closebtn" onClick={(e)=>closeNav(e)} data-side={props.side}>&times;</a>
        <Rightbar following={props.following} size={"mobile"} provider={props.provider}/>
      </div>
    ) 
  }
}

export default MobileSidebar