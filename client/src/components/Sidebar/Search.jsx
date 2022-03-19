import React from 'react'
import { useState, useEffect } from 'react';
import Result from './Result';

const Search = () => {
    const [search, setSearch] = useState("")
    const [address, setAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setAddress(search)
    }

    return (
        <div className='friend-search-wrap'>
            <div >
                <form className='fr-form' action="" onSubmit={handleSubmit}>
                    <input className='friend-search' type="text" placeholder='Search Address' onChange={(e)=>setSearch(e.target.value)}/>
                    <input className='c-btn' type="submit" />
                </form>
            </div>
            {
                address ?
                <div>
                    <Result address={address}/>
                </div>
                :<></>
            }
        </div>
    )
}

export default Search