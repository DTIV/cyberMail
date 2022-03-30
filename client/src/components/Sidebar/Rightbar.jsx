import React from 'react'
import ContactCard from './ContactCard'
import { useState, useEffect } from 'react';
import Search from './Search';
import Feature from './Feature';
const Rightbar = (props) => {
    const [following, setFollowing] = useState("")
    const [followers, setFollowers] = useState("")

    useEffect(() => {
        if(props.following){
            setFollowing(props.following.identity.followings.list)
            setFollowers(props.following.identity.followers.list)
        }
    }, [props.following])

    return (
        <div className='rightbar-wrap'>
            <Search provider={props.provider}/>
            <div className='friends-list'>
                <div className='following-list'>
                    <div>
                        Following
                    </div>
                    {
                        following.length > 0 ?
                            following.map((e)=>(
                                <ContactCard 
                                    key={e.address} 
                                    id={props.size+"_"+e.address} 
                                    data={e}
                                    provider={props.provider}
                                    following={props.following}/>
                            ))

                        :
                        <div>
                            No Contacts Yet.
                        </div>
                    }
                </div>
                <div>
                    <div>
                        Followers
                    </div>
                    {
                        following.length > 0 ?
                        following.map((e)=>(
                            <ContactCard 
                                key={e.address} 
                                id={props.size+"_"+e.address} 
                                data={e}
                                provider={props.provider}
                                following={props.following}/>
                        ))
                        :
                        <div>
                            No Contacts Yet.
                        </div>
                    }
                </div>
                <div className='feature-list'>
                    {
                        following.length < 1 && followers.length < 1 ?
                        <Feature provider={props.provider} following={props.following}/>
                        :<></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Rightbar