import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Topbar from '../Sidebar/Topbar';
import './message.css'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DataButtons from '../Buttons/DataButtons';
import MessageCard from './MessageCard'
import BasicButton from '../Buttons/BasicButton';

const Message = (props) => {
  const user = props.user
  const path = window.location.pathname
  const msgID = path.replace('/message/',"")

  const [msgData, setMsgData] = useState("")
  const [block, setBlock] = useState(false)
  const [getBlock, setAllBlock] = useState(false)
  const [update, setUpdate] = useState(false)

  const updateList = async () => {
    if(update){
        setUpdate(false)
    }else{
        setUpdate(true)
    }
  }
  
  let flagged;
  if(msgData.flagged){
    flagged = true;
  }else{
    flagged=false
  }

  useEffect(() => {
    const getUsersBlocked = async () => {
      if(user){
        const res = await axios.get(`/block/all/${user}`)
        if(res){
          const data = res.data
          setAllBlock(data)
        }
      }
    }
    getUsersBlocked()
  }, [user])

    useEffect(() => {
        if(getBlock){
            const b = getBlock.filter((e)=>{
                return msgData.fromAddress === e.blockAddress
            })
            if(b.length > 0){
                setBlock(true)
            }
        }
    }, [getBlock])
    
    const flagMail = async () => {
        try{
            const res = await axios.put(`/mail/flag/${msgData._id}`,{"userAddress": user})
            if(res){
              flagged=true
            }
        }catch(err){
            console.log(err)
        }
    }

    const deleteMail = async () => {
        try{
            await axios.delete(`/mail/${msgData._id}`,{data:{"userAddress": user}})
            updateList()
        }catch(err){
            console.log(err)
        }
    }

    const blockUser = async () => {
        try{
            console.log(msgData.fromAddress)
            const res = await axios.post(`/block/${msgData.fromAddress}`,{"userAddress": user})
            console.log("user blocked")
            if(res){
                setBlock(true)
            }
        }catch(err){
            console.log(err)
        }
    }

    const unBlockUser = async () => {
        try{
            const res = await axios.delete(`/block/${msgData.fromAddress}`,{data:{"userAddress": user}})
            console.log("user unblocked")
            if(res){
                setBlock(false)
            }
        }catch(err){
            console.log(err)
        }
    }

  useEffect(() => {
    const getData = async () => {
      if(user){
        const url = `http://${window.location.host}/mail/${msgID}`
        const res = await axios.get(url)
        if(res.status === 200){
          setMsgData(res.data)
        }
      }
    }
    getData()
  }, [user])
  
  return (
    <div className='main-sec center-main'>
      <Topbar />
      <div className='main-msg'>
        <div className='lrg-title'>
          {msgData.subject}
          </div>
        <div className='msg-content'>
          <div>
            From:
          </div>
          <div className='msg-card'>
            {
              msgData ?
              <MessageCard data={msgData} provider={props.provider}/>
              :
              <div>
                <div>
                {Date(msgData.createdAt)}
              </div>
              
              <div className='sender-card'>
                {msgData.fromAddress}
              </div>
              </div>
            }
          </div>
          <div className='msg-card'>
            <div className='msg-date'>
              {Date(msgData.createdAt)}
            </div>
            <div className='data-btn-wrap'>
              <div className='data-btn'>
                <DataButtons 
                  block={block} 
                  unBlockUser={unBlockUser} 
                  blockUser={blockUser}
                  sent={props.sent}
                  getFlag={flagged}
                  flagMail={flagMail}
                  deleteMail={deleteMail}/>
              </div>
              
            </div>
            {
              msgData ?
                ReactHtmlParser(msgData.mail)
              :<></>
            }
          </div>
        </div>
        <div>
          <BasicButton name="Reply" location="/new" />
        </div>

      </div>
    </div>
  )
}

export default Message