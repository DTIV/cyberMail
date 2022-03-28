import React from 'react'
import "../settings.css"
import { useState, useEffect } from 'react';
import axios from 'axios'

const AddBlocked = (props) => {
  const user = props.user
  const [blocked, setBlocked] = useState(false)

  const blockUser = async (e) => {
    e.preventDefault()
    try{
        const res = await axios.post(`/block/${blocked}`,{"userAddress": user})
        console.log("user blocked")
        window.location.reload()
    }catch(err){
        console.log(err)
    }
}

  return (
    <div className='block-input-wrap'>
        <form action="" className='setting-block-form' onSubmit={blockUser}>
          <div>
            <input className='block-input' type="text" placeholder='Address' onChange={e=>setBlocked(e.target.value)}/>
          </div>
          <div>
            <input className='block-input' type="submit" value={"Block"}/>
          </div>
        </form>
    </div>
  )
}

export default AddBlocked