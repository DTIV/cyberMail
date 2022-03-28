import React from 'react'
import './button.css'
const BasicButton = (props) => {
  return (
    <div className='btn-wrap'>
        <a className='basic-btn' href={`${props.location}`}>{props.name}</a>
    </div>
  )
}

export default BasicButton