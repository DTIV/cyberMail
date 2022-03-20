import React from 'react'
import { CgBlock, CgUnblock} from "react-icons/cg";
import '../Mail/mail.css';

const BlockIcon = (props) => {
    const block = props.block
    return (
        <div>
            {
                block ?
                <button className='mail-del' onClick={props.unBlock}><CgUnblock className='block-icon2' /></button>
                :<button className='mail-del' onClick={props.blockUser}><CgBlock className='block-icon'/></button> 
            }
        </div>
    )
}

export default BlockIcon