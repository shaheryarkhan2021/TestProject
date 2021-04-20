import React, { useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as modalActions from 'actions/modal'
import './styles.css'

export default _ => {
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = e => {
    e.preventDefault();
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='navbar_main_div'>
      <div className='logo'>
        <Link to='/'>
          <p className='navbar_logo'>DAILY FASHION</p>
        </Link>
      </div>
      <FontAwesomeIcon icon={faBars} onClick={e => { handleToggle(e) }} className='fa fa-bars' />

      <nav className='nav'>
        <ul className={`navigation collapsed ${isExpanded ? 'is-expanded' : ''}`}>
          <NavLink activeClassName='active disable-cursor-pointer' to='/'>
            <li>
              <span className='cursor-pointer'>Today's Product</span>
            </li>
          </NavLink>

          <NavLink activeClassName='active disable-cursor-pointer' to=''>
            <li className='navbar_logo'>
              <span className='cursor-pointer'>DAILY FASHION</span>
            </li>
          </NavLink>

          <span onClick={() => { dispatch(modalActions.toggleModal('contact_us')) }}>
            <li>
              <span className='cursor-pointer'>Contact us</span>
            </li>
          </span>

          <NavLink to={`${window.location.pathname}`}>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}
