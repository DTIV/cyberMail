import React from 'react'
import ConnectButton from '../ConnectButton'

const Showcase = (props) => {
  return (
    <div>
      <div>
        Connect Your Wallet to Join!
      </div>
        <ConnectButton connected={props.connected} connect={props.connect} />
    </div>
  )
}

export default Showcase