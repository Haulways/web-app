/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import Typed from "typed.js";
import { createClient } from "@supabase/supabase-js";
import { useNotify } from "react-admin";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PrivacyImage from "../src/components/images/privacy-image.png";
import Socials from "../src/components/images/socials.png";
import "@splidejs/react-splide/css";
import { useForm } from "react-hook-form";
import video from "./vid/mockvid.mp4";
import ImageCard from "./components/cards/imageCard";
import { ArrowOutwardOutlined, Search, BubbleChart, Campaign, MonetizationOn, Lightbulb, Security, Grading, Bolt, TrendingUp } from "@mui/icons-material";
import {
  // LongTextInput,
  Chip, Stack, Box, Grid, useMediaQuery, InputAdornment,
} from "@mui/material";
import CenteredTab from "./components/tabs/centeredTab";
import favicon from './components/images/favicon.ico'
import ImageTile from "./components/cards/imageTile";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL = 'https://ecommerce.haulway.co',
  import.meta.env.VITE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicXR6anBrd2V4a21od2tnaG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2NzMzNDIsImV4cCI6MjAxMDI0OTM0Mn0.XIUZ0DOyAsdzEwR1bZ_2QZnq-wK9YzBxl0piiLFqVd0',
  import.meta.env.VITE_SUPABASE_URL = 'https://fbqtzjpkwexkmhwkghmx.supabase.co',
  import.meta.env.VITE_API_KEY = 'AIzaSyBW_pOdShDvFuB_yp5kB6oJAgyzGmf5h7E',
);
import { motion, useInView } from "framer-motion"
import { container, item } from "./components/framer_utils";
import TabbedGridSection from "./components/sections/tabbedGridSection";


const PrivacyPolicy = () => {
  const el = useRef(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState(null);
  const notify = useNotify();

  const home_ref = useRef(null);
  const about_ref = useRef(null);
  const blog_ref = useRef(null);
  const services_ref = useRef(null);
  const partnership_ref = useRef(null);
  const contact_us = useRef(null);
  const skill_place_ref = useRef(null);
  const creator_center_ref = useRef(null);
  const social_commerce_ref = useRef(null);
  const soc_ref = useRef(null);
  const crc_ref = useRef(null);
  const skc_ref = useRef(null);
  const socisInView = useInView(soc_ref, { once: true });
  const crcisInView = useInView(crc_ref, { once: true });
  const skcisInView = useInView(skc_ref, { once: true });

  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const sendRequest = (data) => {
      console.log(data);
        
  }


  // const inputF1 = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearText = async () => {
    document.getElementById("email_input").value = "";
    document.getElementById("name_input").value = "";
    document.getElementById("message_input").value = "";
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSave = async () => {
    // Save the email to Supabase
    const { data, error } = await supabase
      .from("interested_emails")
      .upsert({ name: name.text, email: email.text, message: message.text });

    if (error) {
      notify("Error saving email: " + error.message, { type: "error" });
      console.error("Error saving email:", error);
    } else {
      notify("Email saved successfully", { type: "success" });
      console.log("Email saved successfully:", data);
      // Redirect to the list view after saving
      // props.history.push('/emails');
    }
    clearText();
  };

  useEffect(() => {
    // Set the email state when the form values change
    console.log({ name: name, email: email, message: message });
  }, [email, name, message]);

  useEffect(() => {
    console.log(import.meta.env.VITE_BASE_URL);
  }, []);

  return (
    <div>
      {/*========== SCROLL TOP ==========*/}
      <a href="#" className="scrolltop special-button" id="scroll-top">
        <i className="bx bx-chevron-up scrolltop__icon" />
      </a>
      {/*========== HEADER ==========*/}
      <header className="l-header" id="header">
        <nav className="nav bd-container">
          {/* <a href="#" class="nav__logo"></a> */}
          {/* <img class="group-134-V7V" src="./assets/group-134-CyV.png"/> */}
          <img
            className="nav__logo"
            id="nav__logo"
            src="./assets/group-134-CyV.png"
          />
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a
                  href="/"
                  className="nav__link active-link"
                  onClick={() => {
                    scrollTo(home_ref);
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav__item">
                <div
                  className="nav__link"
                  onClick={() => {
                    scrollTo(about_ref);
                  }}
                >
                  About
                </div>
              </li>
              <li className="nav__item">
                <a href="https://blog.haulway.online" className="nav__link">
                  Blog
                </a>
              </li>
              <li className="nav__item">
                <a
                  className="nav__link"
                  onClick={() => {
                    scrollTo(contact_us);
                  }}
                >
                  Contact us
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link button signup special-button">Sign Up</a>
              </li>
              <li>
                <i className="bx bx-moon change-theme" id="theme-button" />
              </li>
            </ul>
          </div>
          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-menu" />
          </div>
        </nav>
      </header>
      <section>
            <section className="xui-pt-7 xui-pb-8 iyd-light-blue-bg xui-container">
                  <div className="xui-d-flex xui-flex-ai-center xui-lg-flex-dir-row xui-flex-dir-column-reverse">
                      <div className="xui-lg-col-7 xui-col-12">
                          <h1 className="section-title about__initial xui-lg-font-sz-300 xui-font-sz-180 xui-lg-w-fluid-80 xui-w-fluid-100 bold-font xui-font-w-600 xui-font-9">Privacy Policy</h1>
                          <p className="xui-font-sz-90 xui-lg-w-fluid-80 xui-w-fluid-100 xui-line-height-1-half xui-opacity-8 xui-mt-half">This Privacy Policy describes our policies and procedures regarding the collection, use, and disclosure of your information when you use the Haulway platform. It also informs you about your privacy rights and how the law protects them.</p>
                          <p className="xui-font-sz-90 xui-lg-w-fluid-80 xui-w-fluid-100 xui-line-height-1-half xui-opacity-8 xui-mt-1">As explained below, we collect information from you in various ways when you interact with our platform. By using our platform, you consent to the collection and use of information as explained in this Notice, and you agree to be bound by our Terms of Use.</p>
                      </div>
                      <div className="xui-lg-col-5 xui-col-12">
                          <img className="xui-img-500" src={PrivacyImage} alt="" />
                      </div>
                  </div>
                  
            </section>
            <section className="xui-container xui-py-2">
                <div className="xui-d-grid xui-lg-grid-col-1 xui-flex-ai-center xui-grid-col-1 xui-grid-gap-4">
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">01)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">INTERPRETATION AND DEFINITIONS</h3>
                        <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Interpretation</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                        <div className="xui-mt-2">
                          <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Definitions</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">For the purposes of this Privacy Policy:</p>
                          <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                            <li><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">You</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">(otherwise referred to as “Your” or “User”) refers to any individual, company, or organization that has completed the registration process and holds an active account on the Haulway platform, thereby gaining the ability to access and utilize the services provided by the platform</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Haulway</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">references in these Terms to “Haulway” "we", "us" or "our" refer to the Haulway platform or its affiliates. </span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Haulway</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">references in these Terms to “Haulway” "we", "us" or "our" refer to the Haulway platform or its affiliates. </span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Affiliate</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">refers to any company or organization that is directly or indirectly related to the Haulway platform, often through ownership, control, or a business relationship. Affiliates may include subsidiaries, parent companies, partner organizations, or entities that share a connection with Haulway</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Account</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">means a unique account created for you to access our service or parts of our service.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Platform</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to the Haulway hub.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Service Provider</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">means any natural or legal person engaged by Haulway to process data on its behalf. This may include third-party companies or individuals hired by Haulway to facilitate services, conduct activities related to the service, or assist in analyzing how the service is used.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Personal Data</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">refers to any information, whether obtained directly, indirectly, or in connection with other data (including personal identification numbers), that allows the identification or identifiability of a natural person.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Device</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">refers to any internet-connected device such as a phone, tablet, computer, or any other device that can be used to access the Haulway platform and its services.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Usage Data</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">refers to data collected automatically, either generated by the use of the service or from the service’s infrastructure itself (for example, the duration of a page visit).</span></li>
                          </ol>
                        </div>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">02)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">COLLECTING PERSONAL DATA</h3>
                        <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Types of Data Collected</p>
                      
                        <div className="xui-mt-2">
                          <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Personal Data</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">While using our service, we may request certain personally identifiable information that can be used to contact or identify you. This information may include, but is not limited to:</p>
                          <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Email Address</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">First name and last name</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Phone number</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Address, City, State</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Usage Data</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Demographic information (e.g., sex, age, education, race or ethnicity, and other information</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">commonly requested in user surveys)</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Date of birth</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Pictures</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Video or audio files</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Payment and/or means of identification</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Any other details which you might include in private communications with other Users or us on the platform.</li>
                            
                          </ol>
                        </div>
                        <div className="xui-mt-2">
                          <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Usage Data</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Usage Data is collected automatically when you use our platform.</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1 xui-lg-w-fluid-80 xui-w-fluid-100">Usage Data may include information such as your device's Internet Protocol address (e.g., IP address), browser type and version, pages visited including articles, presentation and videos, time and date of your visit, time spent on those pages, unique device identifiers and other diagnostic data.</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1 xui-lg-w-fluid-80 xui-w-fluid-100">When you access our platform using a mobile device, we may collect additional information automatically, including but not limited to, the type of mobile device you use, your mobile device’s unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile internet browser you use, unique device identifiers and other diagnostic data.</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1 xui-lg-w-fluid-80 xui-w-fluid-100">Furthermore, we may collect information that your browser sends each time you visit our platform or access the service using a mobile device.</p>
                        </div>

                        <div className="xui-mt-2">
                          <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Information Collected While Using the Platform</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">When you use our platform and in order to enable specific features, we may collect the following information with your prior permission:</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1 xui-lg-w-fluid-80 xui-w-fluid-100">Pictures, facial images and other data from your device's camera and photo library.</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1 xui-lg-w-fluid-80 xui-w-fluid-100">We use this information to verify the identity of our users, provide features of our service, improve, customize and secure our service. The information may be uploaded to our servers and/or a service provider's server, or it may be stored on your device, or discarded after verification.</p>
                        </div>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">03)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">USE OF YOUR PERSONAL DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We may use personal data for the following purposes:</p>
                        <div className="xui-mt-2">
                          <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-half">Definitions</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">For the purposes of this Privacy Policy:</p>
                          <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To provide and maintain our service:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Including to monitor the usage of our service.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To manage your account:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">To manage your registration as a user on the platform. The personal data you provide can give you access to different functionalities of the platform that are available to you as a registered user.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">For the performance of a contract:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may use your data to develop, comply with, and fulfil partnership agreements between vendors and influencers or any other contracts made through the platform, whether with us or other parties.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To contact you:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may reach out to you through email, telephone calls, SMS, or other electronic communication methods, including mobile application push notifications. This contact may pertain to updates or informational communications related to platform functionalities, products, or contracted services, including security updates when deemed necessary or reasonable</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To provide you with news, special offers, and general information: </span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may offer information about services similar to those you have inquired about unless you opt not to receive such information.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To manage your requests:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">To attend and manage your requests to us.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To secure and protect your account:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">To protect your account(s).</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">To maintain appropriate business records:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">To comply with lawful requests by public authorities and to comply with applicable laws and regulations or as otherwise required by law.</span></li>
                            
                          </ol>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We may share your personal information in the following situations:</p>
                          <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">With Service Providers:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may share your personal information with service providers to monitor and analyze the use of our platform or to contact you.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">For Business transfers:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may share or transfer your personal information in connection with, or during negotiations of, any merger, sale of our assets, financing, or acquisition of all or a portion of our business to another company.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">With Affiliates:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. </span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">With Business Partners:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may share your information with our business partners to offer you certain products, services or promotions.</span></li>
                            <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">With other Users:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">when you share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside the platform. Similarly, other users will be able to view descriptions of your activity, communicate with you and view your profile</span></li>
                            
                          </ol>
                        </div>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">04)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">RETENTION OF YOUR PERSONAL DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We will also retain usage data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our platform, or we are legally obligated to retain this data for longer time periods</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">05)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">TRANSFER OF YOUR PERSONAL DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Your information, including Personal Data, is processed at our operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy. No transfer of your Personal Data will occur to an organization or country unless adequate controls, including data security and personal information protection, are in place.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">06)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">DISCLOSURE OF YOUR PERSONAL DATA</h3>
                        <div className="xui-mt-1">
                          <p className="xui-font-sz-120 xui-line-height-1-half">Business Transactions</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">If we are involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
                        </div>
                        <div className="xui-mt-1">
                          <p className="xui-font-sz-120 xui-line-height-1-half">Law enforcement</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Under certain circumstances, we may be required to disclose your Personal Data if required to do so by the laws of the Federal Republic of Nigeria or in response to valid requests by public authorities (e.g., a court or a government agency).</p>
                        </div>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">In such situations, we may be inclined to disclose your personal data.</p>
                        <div className="xui-mt-1">
                          <p className="xui-font-sz-120 xui-line-height-1-half">Other legal requirements</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                          <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Comply with a legal obligation</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Protect and defend our rights or property</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Prevent or investigate possible wrongdoing in connection with the platform</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Protect the personal safety of users of the platform or the public</li>
                            <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Protect against legal liability</li>
                        
                          </ol>
                        </div>
                        <div className="xui-mt-1">
                          <p className="xui-font-sz-120 xui-line-height-1-half">Security of Your Personal Data</p>
                          <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">The security of your Personal Data is of utmost importance to us. However, it's essential to note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                          
                        </div>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">07)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">DO NOT TRACK</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Do Not Track (DNT) is a privacy preference that users can set in some web browsers, allowing them to opt out of being tracked by websites and online services. We do not honour browser requests not to be tracked online (known as "Do Not Track"). However, our cookie policy below outlines how you can opt out of receiving cookies.</p>
                    </div>

                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">08)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">COOKIES</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">When you visit our platform, we use industry-standard technologies such as "cookies" (or similar technologies), which store certain information on your computer and which will allow us, among other things, to enable automatic sign-in to the platform, make your browsing much more convenient and effortless and allow us to test user experience and offer you personalized brow computer or device in accordance with the terms of this Policy.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">The platform uses cookies to collect statistical data about its use, to tailor the platform's functionality to suit personal preferences and to assist with various aspects of the platform’s operation. These files contain a variety of information such as information about the length of time you visited the platform, data about how you came to visit the platform, areas viewed by you within the platform, and additional information. Cookies remain on your device for the period described below.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">The following is a more detailed explanation of the types of cookies we use:</p>
                        <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                          <li>
                            <p className="xui-font-sz-120 xui-line-height-1-half">Necessary cookies</p>
                            <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Necessary cookies are essential and help you navigate the platform. This helps to support security and basic functionality and are necessary for the proper operation of the platform, so if you block these cookies, we can't guarantee your use or the security during your visit.</p>
                          </li>
                          <li>
                            <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-1">Functionality cookies</p>
                            <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Functionality cookies are used to provide you the best user experience. These cookies are, for instance, used to personalize content for you based on your location. It also allows the platform to remember choices made (like turning off use of cookies or which location you have previously selected) to provide more personal features.</p>
                          </li>
                          <li>
                            <p className="xui-font-sz-120 xui-line-height-1-half xui-mt-1">Performance cookies</p>
                            <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Performance cookies help us to understand the behavior of users of the platform. This allows us to continuously improve the platform to provide the best information in support of our services. These cookies are also used to help us understand how effective our platform is</p>
                          </li>
                      
                        </ol>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">All the information gathered by these cookies is aggregated to help us improve the functionality of the platform. Some of these cookies are managed by third parties, and you may refer to the third parties' own website privacy notifications for further information.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We may use Google Analytics cookies to obtain an overall view of user habits and volumes, and to help improve the overall experience on the platform. Google Analytics is a third-party web analysis service provided by Google Inc, which uses performance cookies and targeting cookies. The information generated by these cookies about your usage of the platform (including your IP address) will be transmitted to and stored by Google Inc on servers in the United States.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Google will use the information collected for the purpose of evaluating your use of our platform on our behalf, compiling reports on site activity and providing other services relating to activity and internet usage to us. Google will not associate your IP address with any other data held by Google. You may refuse the use of cookies by selecting the appropriate settings on your browser.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Once cookies are blocked or otherwise prevented, functionality of tool cannot be guaranteed</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">09)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">LOG DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Whenever you use our platform, in the event of an error, we collect data and information (through third-party products) on your device, referred to as Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our service, the time and date of your use of the platform, and other statistics.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">10)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">MESSAGING</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our platform allows users to communicate with others who post information on the platform. We may read, collect, and analyse information transmitted between users for regulatory compliance and marketing purposes. However, we do not guarantee the accuracy or completeness of information provided by users. We assume no liability or responsibility for any errors or omissions in the content provided by users.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">11)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">TESTIMONIALS</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We display personal testimonials from satisfied users on our platform, along with other endorsements. With your consent, we may post your testimonial, including your name and other information. If you wish to update or delete your testimonial, please contact us at <a className="xui-text-dc-underline" href="https://www.haulway.co">www.haulway.co</a></p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">12)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">LINKS TO OTHER WEBSITES</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our platform may include links to other websites not operated by us. Clicking on a third-party link will redirect you to that third party's site. We strongly recommend reviewing the Privacy Policy of every site you visit.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Please be aware that we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">13)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">CHANGES TO THIS PRIVACY POLICY</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We will let you know via email and/or a prominent notice on our platform, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on the platform.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">14)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">CUSTOMIZED ADVERTISING</h3>
                        <p className="xui-mt-1"><span className="xui-font-sz-90 xui-line-height-1-half xui-font-w-bold">Customized or Tailored Advertising:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may allow third-party service providers, including ad networks, ad servers, and affiliate marketing third parties (such as e-commerce websites), to place cookies and other tracking technologies on your computer and mobile devices, in order to collect information about your use of the platform. These third parties may use this information to optimize the placement of advertisements presented to you and to provide us with insights into the effectiveness of our marketing strategies</span></p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">It's important to note that we do not have access to the tracking technologies employed by nonaffiliated ad-based third parties that may be placed on any device you use to access the platform. These third parties may offer an opt-out option for targeted advertisements. Certain information collected by cookies through the platform may be derived from aggregated data or data you voluntarily submitted to us, and we may share it with a service provider in encrypted form. This aids in gaining a better understanding of how targeted advertisements function and how to control cookies or opt out of such services.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">For information on how to manage customized in-app advertising, please visit the privacy settings of your mobile device or contact your device platform operator to review relevant support materials.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">15)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">CHILDREN’S RIGHTS</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our services are not intended for minors under 18 years of age. The platform is designed for individuals aged 18 or older. If any attempts by a minor to sign into the platform are detected, we will automatically delete the account and all associated information</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">16)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">SECURITY</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We take all required security measures (such as end-to-end encryptions, passwords, etc.) to ensure the safety of personal information provided by users of this platform, to avoid unauthorized access. While assuring you that we have done everything necessary to protect your personal information from unauthorized access, you should also bear in mind that no security measure is 100% foolproof</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Hence, you are advised to protect your personal information, by securing your passwords and devices which you may use to access the platform. Make use of rare and strong passwords and keep them private, sign off on any shared device you may use to access the platform, not sharing or reusing an exposed password. We cannot and will not be held responsible for lost or stolen passwords, any unauthorized use of your personal information, nor for any unauthorized use of passwords on your account.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">17)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">INFORMATION MANAGEMENT</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Certain information that you've provided on your profile can be changed or deleted through the preferences section in your "Dashboard." Any incorrect information must be promptly updated or reviewed. Upon request, we may close your account and delete your profile information from the platform. </p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Any information retained thereafter may be to comply with regulatory laws, assist with investigations involving any user, prevent fraudulent activities, settle disagreements, collect outstanding payments, enforce our rights or any other purpose otherwise approved by law. It is crucial to note that, while an account may be removed, User Content provided by that account may not be changed or removed. By agreeing to this Policy, we will not be held responsible for retaining information related to your account after deactivation.</p>
                    </div>
                    
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">18)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">EMAIL COMMUNICATION OPTIONS</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">You have the option to opt-out of any email subscriptions we send to you, provided that they do not directly pertain to your account, services, or quotations you have requested or received from us. Opt-out options will always be included in such emails. </p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">19)</p>
                        <h3 className="xui-font-sz-150 xui-font-w-bold  xui-mt-half">CONTACT US</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">If you have any questions about this Privacy Policy, feel free to contact us at <a className="xui-text-dc-underline" href="https://www.haulway.co">www.haulway.co</a></p>
                    </div>
                </div>
            </section>
      </section>
      {/*========== FOOTER ==========*/}
      <section className="xui-pt-3 xui-pb-5 xui-container footer">
          <div className="xui-lg-d-flex xui-d-none xui-flex-ai-center xui-py-2 xui-pos-relative footer-line-holder xui-flex-jc-space-between xui-flex-ai-center">
              <p className="xui-font-sz-90 xui-w-400">Join Us</p>
              <p className="xui-font-sz-90 amd-text-green bold-font xui-text-center" style={{"width": "calc(100% - 800px)"}}>Amandu Farm</p>
              <p className="xui-font-sz-90 xui-w-400 bold-font xui-text-right">&copy; 2024 From Grascope</p>
          </div>
          <div className='xui-d-grid xui-lg-grid-col-4 xui-grid-col-1 xui-lg-grid-gap-1 xui-grid-gap-2'>
              <div>
                  <p className='xui-font-sz-90 bold-font amd-text-green'>Follow us</p>
                  <img className="xui-mt-1 xui-img-150" src={Socials} alt="" />
              </div>
              <div>
                  <p className='xui-font-sz-90 bold-font amd-text-green'>Quick Links</p>
                  <a href="#" className="xui-opacity-6 xui-font-sz-80">About us</a>
                  <a href="#" className="xui-opacity-6 xui-font-sz-80 xui-mt-1-half">Contact us</a>
              </div>
              <div>
                  <p className='xui-font-sz-90 bold-font amd-text-green'>Explore</p>
                    <a href="/privacy-policy"  className="xui-opacity-6 xui-font-sz-80 xui-mt-1 xui-cursor-pointer">Privacy Policy</a>
                    <a href="/terms-and-conditions" className="xui-opacity-6 xui-font-sz-80 xui-mt-1-half xui-cursor-pointer">Terms & Conditions</a>
              </div>
          </div>
          {/* xui-modal-open={'privacy-policy-modal'} */}
      </section>

    </div>
  );
};

export default PrivacyPolicy;
