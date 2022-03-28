import React from 'react'
import { BsFlagFill, BsFlag } from "react-icons/bs";
import BlockIcon from '../Icons/BlockIcon';
import { FaTrash } from "react-icons/fa";

const DataButtons = (props) => {
    return (
        <div className='data-tb'>
            {
                props.sent ?
                <></>
                :
                <BlockIcon 
                block={props.block} 
                unBlock={props.unBlockUser}
                blockUser={props.blockUser}/>
            }
            
            {
                props.sent ? 
                <></>
                :
                props.getFlag ?
                <button className='mail-flag ' onClick={props.flagMail}><BsFlagFill className='mail-icon flag-on flag-col' /></button>
                :<button className='mail-flag green-txt' onClick={props.flagMail}><BsFlag className='mail-icon sec-txt flag-col'/></button> 
            }
            <button className='mail-del' onClick={props.deleteMail}><FaTrash className='mail-icon trash-icon sec-txt'/></button>
        </div>
    )
}

export default DataButtons