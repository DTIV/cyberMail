import Topbar from "../Sidebar/Topbar"
import MailCard from './MailCard'

const Sent = (props) => {
  if(props.sent){
    const sent = props.sent

    return (
      <div>
        <div>Sent</div>
        {
          sent.map((e) => (
            <MailCard key={`sent_${e._id}`} data={e}/>
          ))
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