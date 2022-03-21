import Topbar from "../Sidebar/Topbar"
import MailCard from './MailCard'
import { useState, useEffect } from 'react';
import axios from 'axios'

const Sent = (props) => {
  const sent = props.sent
  const user = props.user
  const [getBlock, setBlock] = useState(false)

  useEffect(() => {
    const getUsersBlocked = async () => {
      if(user){
        const res = await axios.get(`/block/all/${user}`)
        if(res){
          const data = res.data
          setBlock(data)
        }
      }
    }
    getUsersBlocked()
  }, [user])

  if(props.sent){

    return (
      <div>
        <div className="lrg-title">Sent</div>
        {
          sent.length > 0 ?
            sent.map((e) => (
              <MailCard 
                key={`sent_${e._id}`} 
                data={e} user={user} 
                sent={true} 
                updateList={props.updateList}/>
            ))
          :
          <div className='md-title'>No Sent Messages.</div>
        }
      </div>
    )
  }else{
    return (
      <div>
        Loading...
      </div>
    )
  }
  
}

export default Sent