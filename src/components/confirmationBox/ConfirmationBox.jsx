import React from 'react'
import './confirm.css';


const ConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
      <div className="confirmation__dialog">
          <p>{message}</p>
          <div className='confirm__btns'>
              <button className='backbtn' onClick={onCancel}>Back</button>
              
              <button className='deletebtn' onClick={onConfirm}>Delete</button>
          </div>
      </div>
  )
}

export default ConfirmationBox