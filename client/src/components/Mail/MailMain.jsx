import React from 'react'
import MenuSidebar from '../Sidebar/MenuSidebar'
import MailList from './MailList'
import Rightbar from '../Sidebar/Rightbar'
import Showcase from '../Showcase/Showcase'
import { Routes,Router, Route, Link } from "react-router-dom";
import CreateNew from './CreateNew'
import Sent from './Sent'
import Settings from './Settings'
import "./mail.css"
import "../Sidebar/sidebar.css"
import {
    useQuery,
  } from "@apollo/client";
import { useState, useEffect } from 'react';
import {GET_FOLLOWINGS} from "../../query"
import Topbar from '../Sidebar/Topbar'
import axios from 'axios'
import Message from './Message'


const MailMain = (props) => {

    const [preCursor, setPreCursor] = useState(0)
    const [cursor, setCursor] = useState(20)
    const [following, setFollowing] = useState("")
    const [allMessages, setAllMessages] = useState([])
    const [getInbox, setInbox] = useState([])
    const [getSent, setSent] = useState([])
    const address = "0x843D3cdA1c695A5E9F38A5f4ecA145581f70DDAb"
    const user = props.user
    const { loading, error, data } = useQuery(GET_FOLLOWINGS, { variables : { "Address":user, "After": cursor.toString()}});
    
    useEffect(() => {
        setFollowing(data)
    }, [data])

    useEffect(() => {
        const getData = async () => {
            if(user){
                const res = await axios.get(`mail/all/${user}`)
                if(res.status === 200){
                    const messages = res.data
                    const sent = messages.filter((e) => {
                        return(e.fromAddress === user) 
                    })
                    const inbox = messages.filter((e) => {
                        return(e.toAddress === user) 
                    })
                    setSent(sent)
                    setInbox(inbox)
                }
            }
        }
        getData()
    }, [user])

    if(props.connected){
        return (
            <div className="main">
                <div className="main-sec left-sidebar">
                  <MenuSidebar inboxAmount={getInbox.length} sentAmount={getSent.length}/>
                </div>
                
                <div className="main-sec center-main">
                    <Topbar following={data}/>
                    <Routes>
                        <Route exact path="/message/:id" element={<Message/>}/>
                        <Route exact path="/" element={<MailList inbox={getInbox} user={user}/>}/>
                        <Route exact path="/new" element={<CreateNew user={props.user}/>}/>
                        <Route exact path="/sent" element={<Sent sent={getSent}/>}/>
                        <Route exact path="/settings" element={<Settings />}/>
                    </Routes>
                </div>
                <div className="main-sec right-sidebar">
                  <Rightbar following={data} size={"full"}/>
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