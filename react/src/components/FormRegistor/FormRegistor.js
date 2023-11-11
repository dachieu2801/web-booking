import React from 'react';
import './FormRegistor.css'

function FormRegistor() {

  return (
    <div className='container-form-registor'>
      <h1>Save time, save money!</h1>
      <p>Sign up and we'll send the best deals to you</p>
      <form>
        <input type='email' size='36' placeholder='Your Email' />
        <button>Subscribe</button>
      </form>
    </div>
  )
}

export default FormRegistor