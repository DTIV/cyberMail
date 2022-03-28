import React from 'react'
import BlockCard from './BlockCard'
import { useState, useEffect } from 'react';
import "../settings.css"

const BlockedList = (props) => {
    let blocked = props.blocked;
    const user = props.user;

    if(blocked.length > 0){
        return (
            <div className='block-list'>
                {
                    blocked.map((e) => (
                        <BlockCard data={e} key={e.blockAddress} user={user} pointer={props.pointer}/>
                    ))
                }
            </div>
        ) 
    }else{
        return(
            <div className='no-blocked'>No Blocked Users.</div>
        )
    }
    
}

export default BlockedList