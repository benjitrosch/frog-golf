import React, { ReactNode } from 'react'

type ModalProps = {
  title: string | null
  contents: ReactNode | null
}

const Modal = ({ title, contents }: ModalProps) => {
  return (
    <div id="modalcontainer" className={`${!contents ? '' : 'visible'}`}>
      <div id="modalheader">{title}</div>
      <div id="contents">{contents}</div>
    </div>
  )
}

export default Modal
