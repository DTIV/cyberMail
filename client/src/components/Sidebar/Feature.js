import React from 'react'
import {
    useQuery,
} from "@apollo/client";
import { GET_FEATURED } from '../../query'
import ContactCard from './ContactCard';

const Feature = () => {
    const { loading, error, data } = useQuery(GET_FEATURED);
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
        return(
            <div>
                <div>
                    Featured
                </div>
                {
                    featured.map((e)=>(
                        <ContactCard key={`featured_${e.address}`} id={`featured_${e.address}`} data={e}/>
                    ))
                }
            </div>
        )
    }
    
}

export default Feature