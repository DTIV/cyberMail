import React from 'react'

const ConnectButton = (props) => {
    if(props.connected){
        return(
            <button className='connect-btn' disabled>Connected</button>
        )   
    }else{
        return(
            <div className="{styles.connectWrap}">
                <button className='connect-btn' onClick={props.connect}>Connect</button>
            </div>
        )
    }

}

export default ConnectButton