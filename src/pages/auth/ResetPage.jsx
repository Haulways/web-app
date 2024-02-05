import { useState } from 'react';
import logoImg from '../../assets/logo192.png';
import closeIcon from '../../assets/closeIcon.png';
import { Link, useNavigate} from 'react-router-dom';
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

const ResetPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Password Reset Authentication
    const resetPassword = async (e) => {
        e.preventDefault();

        // Validate the new password
        if (newPassword.length < 8) {
            toast.error("The new password must be at least 8 characters long.");
            return;
        }

        // Show a loading indicator
        setIsLoading(true);

        // Update the user's password
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        setIsLoading(false);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Password reset successfully.");

            navigate("/login");
        }
    };
    

    return (
        <>

            <div className='background__overlay'></div>
            <Slider />
      
            <div className='auth__container pt-[10rem] '>
                <div className='SignIn__container'>
                    <Link to='/login' className='close__icon'>
                        {close}
                    </Link>

                    <div className='form reset__form'>
                        {logo}

                        <form onSubmit={resetPassword}>

                            <input
                                type='password'
                                placeholder='New password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <button type="submit" disabled={isLoading}>
                                Change Password
                            </button>
          
                        </form>
           
                    </div>
                </div>
            </div>
        </>
    )
};

export default ResetPage