import React from 'react'
import "../Sidebar/sidebar.css"
import "../../mobile.css"
import { FaTrash } from "react-icons/fa";
const MailCard = () => {
    return (
        <div className='mail-wrap'>
            <div className='mail-card'>
                <div className='data-tb'>
                    <input className='mail-check' type="checkbox" />
                <div>
                    <strong>Email Title</strong>
                </div>
                </div>
                
                <div className='email-from'>
                    4354v653655453k3k643465u4uo6
                </div>
                <div className='data-tb'>
                    <div>
                        01/23/2022
                    </div>
                    <div className='data-tb'>
                        <FaTrash className='mail-del'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MailCard   