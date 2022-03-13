import React from 'react'
import ContactCard from './ContactCard'
import { useState, useEffect } from 'react';

const Rightbar = (props) => {
    const [data, setData] = useState("")
    const lists=[1,2,3,4,5]

    useEffect(() => {
        if(props.following){
            setData(props.following.identity.followings.list)
        }
    }, [props.following])

    return (
        <div className='rightbar-wrap'>
            <div className='friend-search-wrap'>
                <input className='friend-search' type="text" placeholder='Search Address'/>
            </div>
            <div className='friends-list'>
                <div>
                    Following
                </div>
                {
                    data ?
                    data.map((e)=>(
                        <ContactCard key={e.address} id={props.size+"_"+e.address} data={e}/>
                    ))
                    :<></>
                }
            </div>
        </div>
    )
}

export default Rightbar