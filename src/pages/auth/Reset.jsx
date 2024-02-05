import { useState } from 'react';
import logoImg from '../../assets/logo192.png';
import closeIcon from '../../assets/closeIcon.png';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Reset = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  // Password Reset Authentication 
  const resetPassword = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://haulway-demo-project.web.app/reset-page'
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check email for reset link.");
      setEmail("");
      setName("");
    }
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

          <div className='form reset__form'>
            {logo}

            <form onSubmit={resetPassword}>

              <input
                type='text'
                placeholder='Full Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type='email'
                placeholder='Email Address'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type='submit'>Reset Password</button>

              <div className='reset__links'>
                <Link to="/login">- Sign In</Link>
                <Link to="/signup">- Sign Up</Link>
              </div>
            
            </form>

        

            {/* terms of services link starts */}
            <div className='reset__terms terms__link'>
              <p>
                By continuing you agree to Haulway's{' '}
                <Link to='/terms'>Terms Of Service and have read our Privacy Policies</Link>
              </p>
            </div>
            {/* terms of services link ends */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset