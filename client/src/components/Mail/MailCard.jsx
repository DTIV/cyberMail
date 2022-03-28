import React from 'react'
import "../Sidebar/sidebar.css"
import "../../mobile.css"
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { BsFlagFill, BsFlag } from "react-icons/bs";
import BlockIcon from '../Icons/BlockIcon';
import axios from 'axios'
import { useState, useEffect } from 'react';
import DataButtons from '../Buttons/DataButtons';

const MailCard = (props) => {
    const data = props.data;
    const user = props.user;
    const blocked = props.blocked;
    const updateList = props.updateList;

    const [getFlag, setFlag] = useState(data.flagged)
    const [block, setBlock] = useState(false)

    useEffect(() => {
        if(blocked){
            const b = blocked.filter((e)=>{
                return data.fromAddress === e.blockAddress
            })
            if(b.length > 0){
                setBlock(true)
            }
        }
    }, [blocked])
    
    const flagMail = async () => {
        try{
            const res = await axios.put(`/mail/flag/${data._id}`,{"userAddress": user})
            if(res){
                setFlag(res.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    const deleteMail = async () => {
        try{
            await axios.delete(`/mail/${data._id}`,{data:{"userAddress": user}})
            updateList()
        }catch(err){
            console.log(err)
        }
    }

    const blockUser = async () => {
        try{
            console.log(data.fromAddress)
            const res = await axios.post(`/block/${data.fromAddress}`,{"userAddress": user})
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
            const res = await axios.delete(`/block/${data.fromAddress}`,{data:{"userAddress": user}})
            console.log("user unblocked")
            if(res){
                setBlock(false)
            }
        }catch(err){
            console.log(err)
        }
    }

    if(data){
        const d = new Date(data.createdAt);
        const newDate = d.toLocaleString('en-US')
        return (
            <div className='mail-wrap'>
                <div className='mail-card'>
                    <div className='data-tb'>
                        <input className='mail-check' type="checkbox" />

                    </div>
                    <Link to={`/message/${data._id}`} className='mail-card-inner'>
                        <div>
                                {
                                    data.subject ?
                                        <strong>{data.subject}</strong>
                                    : <strong>No Subject</strong>
                                }
                        </div>
                        <div className='email-from'>
                            {data.fromAddress.slice(0,2)+"..."+data.fromAddress.slice(38,43)}
                        </div>
                        <div className='data-tb'>
                            <div className='date-wrap'>
                                {newDate}
                            </div>

                        </div>
                    </Link>
                    <DataButtons 
                        block={block} 
                        unBlockUser={unBlockUser} 
                        blockUser={blockUser}
                        sent={props.sent}
                        getFlag={getFlag}
                        flagMail={flagMail}
                        deleteMail={deleteMail}/>
                </div>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default MailCard   