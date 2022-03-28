import React from 'react'
import { useState, useEffect } from "react";
import "./sidebar.css"
import {
    FollowButton,
    Env,
    Blockchain,
  } from '@cyberconnect/react-follow-button';
import '../Buttons/button.css'

const ContactCard = (props) => {
    const [showContactInfo, setShowContact] = useState(false);
    const [addressBtn, setAddressBtn] = useState("Address")
    const [emailBtn, setEmailBtn] = useState("Email")
    const [getID, setID] = useState("")

    useEffect(() => {
        setID(props.id)
    }, [props.id])
      
    const showContact = () => {
        if(getID){   
            var elem = document.getElementById(`${getID}`)
            if(showContactInfo){
                elem.style.height = "0";
                setShowContact(false)
            }else{
                elem.style.height = "150px";
                setShowContact(true)
            }
        }
    }
    
    const emailCopied = () =>{
        navigator.clipboard.writeText("EMAIL COPIED");
        setEmailBtn("Copied!")
        setTimeout(() => {
            setEmailBtn("Email");
        }, 1000);
    }

    const addressCopied = () => {
        navigator.clipboard.writeText(props.data.address);
        setAddressBtn("Copied!")
        setTimeout(() => {
            setAddressBtn("Address");
        }, 1000);
    }

    return (
        <div className='friend-card'>
            <button className="main-card" onClick={showContact}>
                <div className='img-wrap'>
                    {
                        props.data.avatar ?
                        <img className='friend-img' src={props.data.avatar} alt="" />
                        :
                        <img className='friend-img' src={`https://source.unsplash.com/random/?face`} alt="" />
                    }  
                </div>
                <div>
                    {
                        props.data.domain ?
                        props.data.domain
                        : props.data.address.slice(0,2)+"..."+props.data.address.slice(38,43)  
                    }
                </div>
            </button>
            <div id={props.id} className="contact">
                <div className='contact-card'>
                    <div>{ props.data.recommendationReason ?
                        props.data.recommendationReason
                        :<></>}</div>
                    <div>Followers: {props.data.followerCount}</div>
                    <div className='contact-btn-wrap'>
                        <div className='contact-btn-wrap'>
                            <input className='basic-btn' type="button" value={addressBtn} onClick={addressCopied}/>
                        </div>
                        <div className='contact-btn-wrap'>
                            {
                                props.provider ?
                                <FollowButton
                                    provider={props.provider}
                                    namespace="CyberConnect"
                                    toAddr={props.data.address}
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
            </div>
        </div>
    )
}

export default ContactCard