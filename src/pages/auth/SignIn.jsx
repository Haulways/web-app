import { useState } from 'react';
import logoImg from '../../assets/logo192.png';
import closeIcon from '../../assets/closeIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Slider from '../../components/slider/Slider';
import './auth.css';
import { supabase } from '../../supabase/SupabaseConfig';
import { useRefresh } from 'react-admin';



const logo = (
  <div className='logo'>
    <img src={logoImg} alt='logo' />
  </div>
);

const close = (
  <img src={closeIcon} alt="close-icon" />
);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const refresh = useRefresh();
  const navigate = useNavigate();


 

  // SignIn Authentication 
  const loginUser = async (e) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        toast.error(error.message);
    } else {
        toast.success("Logged In Successfully...");
      navigate("/dashboard");
      window.location.reload();
    }
};


  async function signInWithGoogle(e) {
    e.preventDefault();
  
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  
    if (error) {
      toast.error(error.message);
    } else if (user && session) {
      toast.success('Logged In Successfully...');
      navigate('/dashboard');
    } else {
      console.log('Loading...');
    }
  }

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

          <form onSubmit={loginUser}>
            <input
              type='email'
              placeholder='Email Address'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className='password-input'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className='password-toggle' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type='submit'>Sign In</button>

            <div className='reset__link'>
              <span>Forgot Login?</span>
              <Link to='/reset'>Reset Password</Link>
            </div>

            {/* create account link starts */}
          <div className='signup__link'>
            <span>
              <p>Don't have an account?</p>
              <Link to='/signup'>Sign up</Link>
            </span>
          </div>
          {/* create account link ends */}

          {/* signin with google starts */}
          <button type='submit' className='google__link' onClick={signInWithGoogle}><FaGoogle className='google' /> Sign In With Google</button>

          {/* signin with google ends */}
          </form>

          

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
};

export default SignIn;
