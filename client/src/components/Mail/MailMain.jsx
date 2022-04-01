import React from 'react'
import MailList from './MailList'
import Showcase from '../Showcase/Showcase'
import { Routes,Router, Route, Link } from "react-router-dom";
import Sent from './Sent'
import "./mail.css"
import "../Sidebar/sidebar.css"
import Topbar from '../Sidebar/Topbar'
import axios from 'axios'
import { useState, useEffect } from 'react';

const MailMain = (props) => {

    const [cursor, setCursor] = useState(20)
    const [following, setFollowing] = useState("")
    const [getInbox, setInbox] = useState([])
    const [getSent, setSent] = useState([])
    const [update, setUpdate] = useState(false)
    const path = window.location.pathname
    const user = props.user

    const updateList = async () => {
        if(update){
            setUpdate(false)
        }else{
            setUpdate(true)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const check = path.includes('message')
            if(user){
                const res = await axios.get(`/mail/all/${user}`)
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
                <div className="main-sec center-main">
                    <Topbar following={props.following} provider={props.provider}/>
                    <Routes>                   
                        <Route exact path="/" element={<MailList 
                            inbox={getInbox} 
                            user={user} 
                            updateList={updateList}/>}/>
                        <Route exact path="/sent" element={<Sent sent={getSent} user={props.user} updateList={updateList}/>}/>
                    </Routes>
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