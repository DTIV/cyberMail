import React from 'react'
import {
    FollowButton,
    Env,
    Blockchain,
  } from '@cyberconnect/react-follow-button';
import { useEffect, useRef } from 'react';

const FollowBtn = (props) => {

    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });
    
    if(mounted.current){
            return (
                <div>
                    <FollowButton   
                        provider={props.provider}
                        namespace="CyberConnect"
                        toAddr={props.data.address}
                        env={Env.PRODUCTION}
                        chain={Blockchain.ETH}
                        onSuccess={(e) => {
                            console.log(`now following ${props.data.address}`)
                            console.log(e);
                        }}
                        onFailure={(e) => {
                            console.log(e);
                        }}
                    />
                </div>
        )
    }else{
        return <></>
    }
    
}

export default FollowBtn