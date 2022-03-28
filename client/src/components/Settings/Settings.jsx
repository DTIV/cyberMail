import './settings.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import BlockedList from './Blocked/BlockedList';
import AddBlocked from './Blocked/AddBlocked';
import Topbar from '../Sidebar/Topbar';
import Showcase from '../Showcase/Showcase';
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
  
  if(user){
    return (
      <div className='main-sec center-main'>
        <Topbar following={props.following} provider={props.provider}/>
        <div className='lrg-title'>Settings</div>
        
        <div className='blocked-wrap'>
          <div className='md-title'>Blocked Users</div>
          <AddBlocked user={user}/>
          <BlockedList blocked={blocked} user={user} pointer={pointer}/>
        </div>
      </div>
    )
  }else{
    return(
      <Showcase />
    )
  }
}

export default Settings