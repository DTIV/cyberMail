import React from 'react'
import {
    useQuery,
} from "@apollo/client";
import { GET_ID_DATA } from '../../query'
import ContactCard from '../Sidebar/ContactCard';
import { FaTwitterSquare} from "react-icons/fa";
import {
    FollowButton,
    Env,
    Blockchain,
  } from '@cyberconnect/react-follow-button';
import { useState, useEffect } from 'react';
const MessageCard = (props) => {
    const msgData = props.data
    
    
    
    console.log(msgData)
    const { loading, error, data } = useQuery(GET_ID_DATA, { variables : { "Address": msgData.fromAddress }});
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(error){
        console.log(error)
        return(
            <></>
        )

    }
    console.log(props.provider)
    return (
        <div className='message-card'>
            <div className='top-inner'>
                <div className='from-img'>
                    {
                        data.avatar ?
                        <img src={data.avatar} alt="" />
                        :
                        <img className='friend-img' src={`https://source.unsplash.com/random/?face`} alt="" />
                    }
                </div>
                <div className='from-info'>
                    {msgData.fromAddress}
                </div>
            </div>
            <div className='top-inner'>
                <div className='social-wrap'>
                    <div className='social-box'>
                        <div>
                            Followers
                        </div>
                        <div>
                            10
                        </div>
                    </div>
                    <div className='social-box'>
                        <div>Following</div>
                        <div>5</div>
                    </div>
                    <div>
                        <button>
                            <FaTwitterSquare />
                        </button>
                    </div>
                </div>
                <div>
                    {
                        props.provider ?
                        <FollowButton
                            provider={props.provider}
                            namespace="CyberConnect"
                            toAddr={msgData.fromAddress}
                            env={Env.STAGING}
                            chain={Blockchain.ETH}
                            onSuccess={(e) => {
                                console.log(e);
                            }}
                            onFailure={(e) => {
                                console.log(e);
                            }}
                        />
                        :<></>
                    }
                    
                </div>
            </div>
            
        </div>
    )
}

export default MessageCard