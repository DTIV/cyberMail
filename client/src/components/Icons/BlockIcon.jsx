import React from 'react'
import { CgBlock, CgUnblock} from "react-icons/cg";
import '../Mail/mail.css';

const BlockIcon = (props) => {
    const block = props.block
    return (
        <div>
            {
                block ?
                <button className='block-btn' onClick={props.unBlock}><CgUnblock className='block-icon2 blk-icon sec-txt' /></button>
                :<button className='block-btn' onClick={props.blockUser}><CgBlock className='block-icon blk-icon sec-txt'/></button> 
            }
        </div>
    )
}

export default BlockIcon