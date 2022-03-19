import React from 'react'
import "../Sidebar/sidebar.css"
import "../../mobile.css"
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { BsFlagFill } from "react-icons/bs";
import { BsFlag } from "react-icons/bs";
import axios from 'axios'
import { useState, useEffect } from 'react';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
} 

const MailCard = (props) => {
    const data = props.data;
    const user = props.user;

    const [getResp, setResp] = useState(data.flagged)

    const flagMail = async () => {
        try{
            const res = await axios.put(`/mail/flag/${data._id}`,{"userAddress": user})
            if(res){
                setResp(res.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    const deleteMail = async () => {
        try{
            await axios.delete(`/mail/${data._id}`,{data:{"userAddress": user}})
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
                            <div>
                                {newDate}
                            </div>

                        </div>
                    </Link>
                    <div className='data-tb'>
                        
                        {
                            getResp ?
                            <button className='mail-del' onClick={flagMail}><BsFlagFill className='mail-icon' /></button>
                            :<button className='mail-del' onClick={flagMail}><BsFlag className='mail-icon'/></button> 
                        }
                        <button className='mail-del' onClick={deleteMail}><FaTrash className='mail-icon'/></button>
                        
                    </div>
                </div>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default MailCard   