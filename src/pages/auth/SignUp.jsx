import { useState } from 'react';
import logoImg from '../../assets/logo192.png';
import closeIcon from '../../assets/closeIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import Slider from '../../components/slider/Slider';
import './auth.css'
import { supabase } from '../../supabase/SupabaseConfig';

const logo = (
  <div className='logo'>
    <img src={logoImg} alt='logo' />
  </div>
);
const close = (
  <img src={closeIcon} alt="close-icon" />
);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // SignUp Authentication
  const registerUser = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

  
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        }
      }
    });

    if (authError) {
      throw authError;
    }
    
    toast.success("Check Your email for verification...");
    navigate("/login");
      
     
    
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

      <div className='background__overlay'></div>
      <Slider />
      
      
      <div className='auth__container'>
        <div className='SignIn__container'>
          <Link to='/' className='close__icon'>
            {close}
          </Link>


          <div className='form'>
            {logo}

          
            <form onSubmit={(e) => registerUser(e)}>

              <input type='text' placeholder='Full Name' required id='displayName' />

              <input
                type='email'
                placeholder='Email Address'
                required
                id='email'
              />

              <div className='password-input'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  required
                  id='password'
                />

                <span className='password-toggle' onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

            
              <button type='submit'>Sign Up</button>

            
            </form>

            {/* create account link starts */}
            <div className='signup__link'>
              <span>
                <p>Already have an account?</p>
                <Link to='/login'>Sign In</Link>
              </span>
            </div>
            {/* create account link ends */}

            {/* terms of services link starts */}
            <div className='terms__link'>
              <p>
                By continuing you agree to Haulway's
                <Link to='/terms'>Terms Of Service and have read our Privacy Policies</Link>
              </p>
            </div>
            {/* terms of services link ends */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp