import React from 'react'
import MenuSidebar from '../Sidebar/MenuSidebar'
import MailList from './MailList'
import Rightbar from '../Sidebar/Rightbar'
import Showcase from '../Showcase/Showcase'
import { Routes,Router, Route, Link } from "react-router-dom";
import CreateNew from './CreateNew'
import Sent from './Sent'
import Settings from '../Settings/Settings'
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
import Drafts from '../Drafts/Drafts'

const MailMain = (props) => {

    const [cursor, setCursor] = useState(20)
    const [following, setFollowing] = useState("")
    const [getInbox, setInbox] = useState([])
    const [getSent, setSent] = useState([])
    const [update, setUpdate] = useState(false)

    const user = props.user
    const { loading, error, data } = useQuery(GET_FOLLOWINGS, { variables : { "Address":user, "After": cursor.toString()}});
    
    useEffect(() => {
        setFollowing(data)
    }, [data])

    const updateList = async () => {
        if(update){
            setUpdate(false)
        }else{
            setUpdate(true)
        }
    }

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
    }, [user, update])
    
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
                        <Route exact path="/" element={<MailList inbox={getInbox} user={user} updateList={updateList}/>}/>
                        <Route exact path="/new" element={<CreateNew user={props.user}/>}/>
                        <Route exact path="/sent" element={<Sent sent={getSent} user={props.user} updateList={updateList}/>}/>
                        <Route exact path="/settings" element={<Settings user={props.user}/>}/>
                        <Route exact path="/drafts" element={<Drafts user={props.user}/>}/>
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