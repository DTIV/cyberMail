import React from 'react'
import MenuSidebar from '../Sidebar/MenuSidebar'
import MailList from './MailList'
import Rightbar from '../Sidebar/Rightbar'
import Showcase from '../Showcase/Showcase'
import { Routes,Router, Route, Link } from "react-router-dom";
import CreateNew from './CreateNew'
import Inbox from './Inbox'
import Sent from './Sent'
import Settings from './Settings'

const MailMain = (props) => {
    console.log(props.connected)
    if(props.connected){
        return (
            <div className="main">
                <div className="main-sec left-sidebar">
                  <MenuSidebar />
                </div>
                <div className="main-sec center-main">
                    <Routes>
                        <Route exact path="/" element={<MailList />}/>
                        <Route exact path="/new" element={<CreateNew />}/>
                        <Route exact path="/inbox" element={<Inbox />}/>
                        <Route exact path="/sent" element={<Sent />}/>
                        <Route exact path="/settings" element={<Settings />}/>
                    </Routes>
                </div>
                <div className="main-sec right-sidebar">
                  <Rightbar />
                </div>
              </div>
          )
    }else{
        return (
            <Showcase connected={props.connected} 
            connect={props.connect}/>
        )
    }
  
}

export default MailMain