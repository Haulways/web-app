import * as React from 'react'
import { slide1, slide2, slide3, slide4 } from '../../assets'
import {Splide, SplideSlide}from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/SupabaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import closeIcon from "../../assets/closeIcon.png";

const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

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

    const close = <img src={closeIcon} alt="close-icon" />;

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
    const whiteBg = (
        <svg className='w-[100vw]' style={{}} xmlns="http://www.w3.org/2000/svg" width="430" height="508" viewBox="0 0 430 508" fill="white">
            <path d="M-31.7283 30.9942C-31.4033 6.27508 -2.80564 -7.51615 17.526 6.5467C173.747 114.6 271.742 112.077 418.389 8.34492C438.874 -6.14517 468 7.96433 468 33.0559V478C468 494.569 454.569 508 438 508H-7.60296C-24.3257 508 -37.8202 494.327 -37.6004 477.606L-31.7283 30.9942Z" fill="white" />
        </svg>
    );
    return (
			<div className="">
				<Slides />
				<div className="mt-[-7.5rem] z-[100] relative h-screen">
					{whiteBg}
					<div className="absolute top-[7.5rem] w-full">
						<div className="mobile_sign_container">
							<form onSubmit={loginUser}>
								<input
									type="email"
									placeholder="Email Address"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<div className="password-input">
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<span
										className="password-toggle"
										onClick={togglePasswordVisibility}
									>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</span>
								</div>

								<button type="submit">Sign In</button>

								<div className="reset__link">
									<span>Forgot Login?</span>
									<Link to="/reset">Reset Password</Link>
								</div>

								{/* create account link starts */}
								<div className="signup__link">
									<span>
										<p>Don't have an account?</p>
										<Link to="/signup">Sign up</Link>
									</span>
								</div>
								{/* create account link ends */}

								{/* signin with google starts */}
								<button
									type="submit"
									className="google__link"
									onClick={signInWithGoogle}
								>
									<FaGoogle className="google" /> Sign In With Google
								</button>

								{/* signin with google ends */}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
};

export default LoginScreen

const Slides = () => {
    const splideOptions = {
        type: 'loop', autoplay: true, pauseOnHover: false, arrows: false, pagination: false, ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)', speed: 800
    };
    const close = <img src={closeIcon} alt="close-icon" />;
    return (
			<div className='relative'>
				<Link
					to="/"
					className="close__icon top-[1rem] left-2 w-[25px] h-[25px] absolute z-50"
				>
					{close}
				</Link>
				<Splide options={splideOptions}>
					<SplideSlide className="">
						<div className="w-full bg-[#825051] py-[20px]">
							<div className="slide_div">
								<img className="slide_img" src={slide1} alt="slide" />
								<h2 className="slide__text">HA</h2>
							</div>
						</div>
					</SplideSlide>

					<SplideSlide className="">
						<div className="w-full second_slide py-[20px]">
							<div className="slide_div">
								<img className="slide_img" src={slide2} alt="slide" />
								<h2 className="slide__text">UL</h2>
							</div>
						</div>
					</SplideSlide>

					<SplideSlide className="">
						<div className="w-full bg-[#808FBB] py-[20px]">
							<div className="slide_div">
								<img className="slide_img" src={slide3} alt="slide" />
								<h2 className="slide__text text-[160px]">WAY</h2>
							</div>
						</div>
					</SplideSlide>

					<SplideSlide className="">
						<div className="w-full second_slide py-[20px]">
							<div className="slide_div">
								<img className="slide_img" src={slide4} alt="slide" />
								<h2 className="slide__text2">HAULWAY</h2>
							</div>
						</div>
					</SplideSlide>
				</Splide>
			</div>
		);
};