import React from 'react'

type ErrorProps = {
  message: string | null
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div id="error" className={`${!message ? '' : 'fade'}`}>
      {message}
    </div>
  )
}

export default Error
