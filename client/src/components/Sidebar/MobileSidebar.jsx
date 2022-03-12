import React from 'react'
import { useState, useEffect } from "react";

  



const MobileSidebar = (props) => {
  
  function closeNav(e) {
    
    document.getElementById(`mobile-${e.target.dataset.side}-mySidenav`).style.width = "0";
  }
  console.log(props.side)
  return (
    <div id={`mobile-${props.side}-mySidenav`} class={`mobile-sidenav mobile-${props.side}-sidenav`}>
        <a className="closebtn" onClick={(e)=>closeNav(e)} data-side={props.side}>&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
    </div>
  )
}

export default MobileSidebar