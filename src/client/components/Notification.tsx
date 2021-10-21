import React from 'react'

type NotificationProps = {
  message: string | null
}

const Notification = ({ message }: NotificationProps) => {
  return (
    <div id="notification" className={`${!message ? '' : 'fade'}`}>
      {message}
    </div>
  )
}

export default Notification
