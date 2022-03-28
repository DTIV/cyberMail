import './settings.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import BlockedList from './Blocked/BlockedList';
import AddBlocked from './Blocked/AddBlocked';

const Settings = (props) => {
  const user = props.user;

  const [blocked, setBlocked] = useState([])
  const [flag, setFlag] = useState(false)

  const pointer = async () => {
    if(flag){
      setFlag(false)
    }else{
      setFlag(true)
    }
  }

  useEffect(() => {
    const getBlocked = async () => {
      try{
        if(user){
          const res = await axios.get(`/block/all/${user}`)
          setBlocked(res.data)
        }
      }catch(err){
        console.log(err)
      }
    }
    getBlocked()
  }, [user, flag])
  
  
  return (
    <div className='main-sec center-main'>
      <div className='lrg-title'>Settings</div>
      
      <div className='blocked-wrap'>
        <div className='md-title'>Blocked Users</div>
        <AddBlocked user={user}/>
        <BlockedList blocked={blocked} user={user} pointer={pointer}/>
      </div>
    </div>
  )
}

export default Settings