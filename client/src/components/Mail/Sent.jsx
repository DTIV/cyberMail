import Topbar from "../Sidebar/Topbar"
import MailCard from './MailCard'

const Sent = (props) => {
  if(props.sent){
    const sent = props.sent

    return (
      <div>
        <div className="lrg-title">Sent</div>
        {
          sent ?
            sent.map((e) => (
              <MailCard key={`sent_${e._id}`} data={e}/>
            ))
          :
          <div className='md-title'>No Messages.</div>
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