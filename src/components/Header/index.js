import React from 'react'
import {
  faGift, faUser, faAngleDown, faShoppingBag, faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import * as modalActions from 'actions/modal'
import * as currencyActions from 'actions/currency'
import Modal from 'components/Modal'
import Nav from 'components/Nav'

export default _ => {
  const dispatch = useDispatch()
  const modal = useSelector(state => state.modal)
  const cart = useSelector(state => state.cart)

  const handleCurrencyChange = event => {
    let values = event.target.value.split(' ')

    dispatch(currencyActions.changeCurrency({
      symbol: values[0],
      title: values[1]
    }))
  }

  return (
    <>
      <header id='header'>
        <div className='top_header'>
          <div className='grid-x'>
            <div className='cell medium-4 large-4 hide-for-small-only'>
              <span className='mini-logo'>Daily Fashion</span>
            </div>

            <div className='cell medium-4 large-4 small-12 shipping_text_section'>
              <span>Free shipping</span>
            </div>

            <div className='cell medium-4 large-4'>
              <ul className='list-inline title-secondary--down-3'>
                <li>
                  <FontAwesomeIcon icon={faGift} className='gift_icon cursor-pointer' />
                </li>

                <li>
                  <FontAwesomeIcon icon={faUser} className='user_icon cursor-pointer' />
                </li>

                <li className='select_currency'>
                  <div>
                    <select className='select_input' onChange={handleCurrencyChange} defaultValue='$ USD' style={{border: 'none', background: 'none', boxShadow: 'none'}}>
                      <option value='$ AUD'>
                        $ AUD
                      </option>

                      <option value='$ CAD'>
                        $ CAD
                      </option>

                      <option value='kr. DKK'>
                        kr. DKK
                      </option>

                      <option value='€ EUR'>
                        € EUR
                      </option>

                      <option value='£ GBP'>
                        £ GBP
                      </option>

                      <option value='$ HKD'>
                        $ HKD
                      </option>

                      <option value='¥ JPY'>
                        ¥ JPY
                      </option>

                      <option value='$ NZD'>
                        $ NZD
                      </option>

                      <option value='$ SGD'>
                        $ SGD
                      </option>

                      <option value='$ USD'>
                        $ USD
                      </option>
                    </select>

                    <FontAwesomeIcon icon={faAngleDown} className='currency_dropdown_icon' />
                  </div>
                </li>

                <li>
                  <Link to='/cart'>
                    <FontAwesomeIcon icon={faShoppingBag} className='bag_icon'/>
                    <span className='cart_count'>{cart.length}</span>
                    <span className='bag_text'>bag</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
         </div>

         <Nav />
      </header>
      {
        (modal.isOpen && modal.type === 'contact_us') &&
          <Modal>
            <div className='contact_us_model'>
              <div className='cart-item-remove' onClick={() => { dispatch(modalActions.toggleModal()) }}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <h4>CONTACT US</h4>
              <div className='grid-x grid-padding-x'>
                <div className='cell medium-6 large-6 small-12'>
                  <input type='text' placeholder='Your Name' className='input' />
                </div>
                <div className='cell medium-6 large-6 small-12'>
                  <input type='text' placeholder='Enter email address' className='input' />
                </div>
                <div className='cell medium-12 large-12 small-12'>
                  <input type='text' placeholder='Subject' />
                </div>
                <div className='cell medium-12 large-12 small-12'>
                  <textarea placeholder='Leave a Message'></textarea>
                </div>
                <div className='cell medium-12 large-12 small-12' style={{textAlign: 'center'}}>
                  <span className='btn_submit cursor-pointer'>
                    Send Message
                  </span>
                </div>
              </div>
            </div>
          </Modal>
      }
    </>
  );
}
