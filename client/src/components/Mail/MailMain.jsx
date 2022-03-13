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
import "./mail.css"
import {
    useQuery,
  } from "@apollo/client";
import { useState, useEffect } from 'react';
import {GET_FOLLOWINGS} from "../../query"
import Topbar from '../Sidebar/Topbar'
const MailMain = (props) => {
    const address = "0x4207d42924019903c6161e5cdb7dee31fe6a5d03"
    const [preCursor, setPreCursor] = useState(0)
    const [cursor, setCursor] = useState(20)
    const [following, setFollowing] = useState("")

    const { loading, error, data } = useQuery(GET_FOLLOWINGS, { variables : { "Address":address, "After": cursor.toString()}});

    useEffect(() => {
        setFollowing(data)
    }, [data])
    
    if(props.connected){
        return (
            <div className="main">
                <div className="main-sec left-sidebar">
                  <MenuSidebar />
                </div>
                
                <div className="main-sec center-main">
                    <Topbar following={data}/>
                    <Routes>
                        <Route exact path="/" element={<MailList />}/>
                        <Route exact path="/new" element={<CreateNew />}/>
                        <Route exact path="/inbox" element={<Inbox />}/>
                        <Route exact path="/sent" element={<Sent />}/>
                        <Route exact path="/settings" element={<Settings />}/>
                    </Routes>
                </div>
                <div className="main-sec right-sidebar">
                  <Rightbar following={data}/>
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