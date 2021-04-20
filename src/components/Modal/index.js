import React from 'react'
import { useDispatch } from 'react-redux'

import * as modalActions from 'actions/modal'
import './styles.css'

export default props => {
  const dispatch = useDispatch()

  return (
    <>
      <div className='background-layer' onClick={() => { dispatch(modalActions.toggleModal()) }}>

      </div>
      <div className='reveal' data-reveal>
        {props.children}
      </div>
    </>
  )
}
