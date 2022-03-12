import React from 'react'
import ContactCard from './ContactCard'

const Rightbar = () => {
    
    const lists = [1,2,3]

    

    return (
        <div className='rightbar-wrap'>
            <div className='friend-search-wrap'>
                <input className='friend-search' type="text" placeholder='Search Friends'/>
            </div>
            <div className='friends-list'>
                {
                    lists.map((e)=>(
                        <ContactCard key={e} id={e}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Rightbar