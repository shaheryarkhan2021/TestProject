import React, { useState } from 'react'

export default _ => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = async _ => {
    if (email.trim() !== '') {
      setEmail('')
      setSubmitted(true)
    }
  }

  return (
    <footer className='footer'>
      <div className='grid-container'>
        <div className='newsletter-form'>
          <label>
            Subscribe for Weekly offer Notification
          </label>
          <div className='grid-x grid-padding-x'>
            <div className='cell medium-9 large-9 small-12 cell'>
              <input
                className='button-box one-whole newsletter-input'
                type='email'
                name='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter email address'
                autoCorrect='off'
                autoCapitalize='off'
              />
            </div>

            <div className='cell medium-3 large-3 small-12 cell'>
               <input
                className='button-default text-inverted btn_submit cursor-pointer'
                type='submit'
                onClick = {handleSubmit}
                name='commit'
                value='Sign up'
              />
            </div>
          </div>
           {
              submitted &&
              <p className='success_message'>
                Thank you! Check your email to confirm your subscription.
              </p>
          }
        </div>
      </div>
    </footer>
  )
}
