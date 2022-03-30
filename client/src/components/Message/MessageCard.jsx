import React from 'react'
import {
    useQuery,
} from "@apollo/client";
import { GET_ID_DATA } from '../../query'
import { FaTwitterSquare} from "react-icons/fa";
import {
    FollowButton,
    Env,
    Blockchain,
  } from '@cyberconnect/react-follow-button';

const MessageCard = (props) => {
    const msgData = props.data
    
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
    const dt = new Date(data.identity.joinTime)
    const newDate = dt.toLocaleString('en-US')
    return (
        <div className='message-card'>
            <div className='top-inner info-inner'>
                <div className='from-img'>
                    {
                        data.avatar ?
                        <img src={data.avatar} alt="" />
                        :
                        <img className='friend-img' src={`https://source.unsplash.com/random/?face`} alt="" />
                    }
                </div>
                <div className='from-info'>
                    <div>{msgData.fromAddress}</div>
                    <div><small>JOINED: {newDate}</small></div>
                </div>
            </div>
            <div className='top-inner social-inner'>
                <div className='social-wrap'>
                    <div className='social-box'>
                        <div>
                            Followers
                        </div>
                        <div>
                            {data.identity.followerCount}
                        </div>
                    </div>
                    <div className='social-box'>
                        <div>Following</div>
                        <div>{data.identity.followingCount}</div>
                    </div>
                    {
                        data.identity.social.twitter ?
                        <div className='twit-wrap'>
                            <a href={`http://www.twitter.com/${data.identity.social.twitter}`} className='twit-btn' target="_blank">
                                <FaTwitterSquare />
                            </a>
                        </div>
                        :
                        <div className='twit-wrap'>
                            <a href={`http://www.twitter.com/`} className='twit-btn' target="_blank">
                                <FaTwitterSquare />
                            </a>
                        </div>
                    }
                    
                </div>
                <div className='follow-wrap'>
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