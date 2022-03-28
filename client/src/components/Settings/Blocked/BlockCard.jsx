import React from 'react'
import "../settings.css"
import BlockIcon from '../../Icons/BlockIcon'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { CgBlock, CgUnblock} from "react-icons/cg";

const BlockCard = (props) => {
    const data = props.data
    const user = props.user
    const blockAddress = data.blockAddress
    const d = new Date(data.createdAt);
    const newDate = d.toLocaleString('en-US').split(", ")
    
    const unBlockUser = async () => {
        try{
            const res = await axios.delete(`/block/${data.blockAddress}`,{data:{"userAddress": user}})
            if(res){
                window.location.reload()
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='blockcard-wrap' >
            <div className='blockcard'>
                <div className='block-sec'>
                    {
                        blockAddress.length > 30 ?
                            data.blockAddress.slice(0,2)+"..."+data.blockAddress.slice(38,43)
                        : data.blockAddress
                    }
                </div>
                <div className='block-sec'>
                    {newDate[0]}
                </div>
                <div className='block-sec'>
                    <button className='mail-del' onClick={unBlockUser}><CgUnblock className='block-icon2 green-txt' /></button>
                </div>
            </div>
            
        </div>
    )
}

export default BlockCard