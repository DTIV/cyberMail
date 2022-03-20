import React from 'react'
import BlockCard from './BlockCard'
import { useState, useEffect } from 'react';

const BlockedList = (props) => {
    const blocked = props.blocked;
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
            <div>No Blocked Users.</div>
        )
    }
    
}

export default BlockedList