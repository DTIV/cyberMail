import React from 'react'
import ConnectButton from '../ConnectButton'

const Showcase = (props) => {
  return (
    <div>
      <div className='lrg-title'>Welcome to CyberMail!</div>
      <div className='md-title'>
        <div className='lrg-title'>Features</div>
        
        <div>
          <div>1. A Rich-context editor to write mail utilizing Bold, Underline, Images ect.</div>
          <div>2. View recieved messages in your Inbox</div>
          <div>3. View sent messages in your Sent Folder</div>
          <div>4. Delete and Flag your messages</div>
          <div>5. View a list of cyber connect followings and followers anytime</div>
          <div>6. View Featured CyberConnect profiles.</div>
          <div>7. Block User addresses from sending messages</div>
          <div>8. Mobile Responsive</div>
        </div>
      </div>
      <div className='lrg-title'>
        Connect Your Wallet to Join!
        <ConnectButton connected={props.connected} connect={props.connect} />
      </div>
        
    </div>
  )
}

export default Showcase