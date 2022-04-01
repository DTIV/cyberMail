import React from 'react'
import { useState, useEffect, useRef } from "react";
import "./sidebar.css"
import '../Buttons/button.css'
import FollowBtn from '../Buttons/FollowBtn';

const ContactCard = (props) => {
    const [showContactInfo, setShowContact] = useState(false);
    const [addressBtn, setAddressBtn] = useState("Address")
    const [getID, setID] = useState("")
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    },[]);
      
    useEffect(() => {
        setID(props.id)
    },[props.id]);
      
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

    const addressCopied = () => {
        navigator.clipboard.writeText(props.data.address);
        setAddressBtn("Copied!")
        setTimeout(() => {
            setAddressBtn("Address");
        }, 1000);
    }

    if(mounted.current){
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
                                    mounted.current ?
                                        <FollowBtn 
                                        provider={props.provider}
                                        data={props.data}/>
                                    :<></>
                                }
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default ContactCard