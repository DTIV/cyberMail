import Topbar from "../Sidebar/Topbar"
import MailCard from './MailCard'

const Sent = () => {
  const emails = [1,2,3]
  return (
    <div>
      {
        emails.map((e) => (
          <MailCard />
        ))
      }
    </div>
  )
}

export default Sent