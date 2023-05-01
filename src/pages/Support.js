import React, { useState } from 'react';
import '../loginpage.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';   
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';


const Support = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
      setIsSubmitted(true);
    }
    return (
      <>
        <div className='form-container'> 
          <span className='close-btn'>×</span>
          <div className='form-content-left'>
            <img className='form-img picturelogin' 
            src='https://scontent.fbkk9-3.fna.fbcdn.net/v/t39.30808-6/273204786_489553652733992_1272408916057578591_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u15DiKVwlKwAX8nLUX1&_nc_ht=scontent.fbkk9-3.fna&oh=00_AfBuMWCc8QY8uBfn9zuw_rSY4H_207sUIr_-gBqAubUyRQ&oe=644D3770' 
            alt='spaceship' 
            />
          </div>
          {!isSubmitted ? (
            <FormSignup submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </>
    );
  };

export default Support;
