import React from 'react'
import ContactCard from './ContactCard'
import { useState, useEffect } from 'react';
import Search from './Search';
import Feature from './Feature';
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
            <Search />
            <div className='friends-list'>
                <div>
                    Following
                </div>
                {
                    data.length > 0 ?
                        data.map((e)=>(
                            <ContactCard key={e.address} id={props.size+"_"+e.address} data={e}/>
                        ))

                    :
                    <div>
                        No Contacts Yet.
                        <Feature />
                    </div>
                }
            </div>
        </div>
    )
}

export default Rightbar