import React from 'react'
import { GET_ID_DATA } from '../../query'
import {
    useQuery,
} from "@apollo/client";
import ContactCard from './ContactCard'

const Result = (props) => {


    const { loading, error, data } = useQuery(GET_ID_DATA, { variables : { "Address": props.address }});
    if(loading){
        return (
            <div>Loading...</div>
        )
    }
    if(error){
        return (
            <div>No Results.</div>
        )
    }
    if(data){
        return (
            <div>
                <ContactCard 
                    data={data.identity} 
                    id={"result_"+data.identity.address}
                    provider={props.provider}/>
            </div>
        )
    }

    
}

export default Result