import React from 'react'
import {
    useQuery,
} from "@apollo/client";
import { GET_FEATURED } from '../../query'
import ContactCard from './ContactCard';
import { useEffect, useRef } from 'react';

const Feature = (props) => {
    const { loading, error, data } = useQuery(GET_FEATURED);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });

    if(loading){
        return (
            <div>Loading...</div>
        )
    }
    if(error){
        return(
            <div>No Featured Profiles</div>
        )
    }
    if(data){
        const featured = data.featured
        if(mounted.current){
            return(
                <div>
                    <div>
                        Featured
                    </div>
                    {
                        featured.map((e)=>(
                            <ContactCard 
                                key={`featured_${e.address}`} 
                                id={`featured_${e.address}`} 
                                data={e}
                                provider={props.provider}/>
                        ))
                    }
                </div>
            )
        }else{
            return <></>
        }
        
    }
    
}

export default Feature