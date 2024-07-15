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


const TermsandConditions = () => {
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
                        <h1 className="section-title about__initial xui-lg-font-sz-300 xui-font-sz-180 xui-lg-w-fluid-80 xui-w-fluid-100 bold-font xui-font-w-600 xui-font-9">TERMS AND CONDITIONS</h1>
                        <p className="xui-font-sz-90 xui-lg-w-fluid-80 xui-w-fluid-100 xui-line-height-1-half xui-opacity-8 xui-mt-half">Please read these terms and conditions carefully before using this platform.</p>
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
                    <h3 className="xui-font-sz-150  xui-mt-half">INTRODUCTION</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">INTRODUCTION: These Terms and Conditions ("Terms") set out the rights and obligations that apply to any party using the services (Services), provided by Haulway or any of its affiliates (collectively, "Haulway"). They apply to all visitors, users, and others who access or use the services.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">By accessing and using the Haulway platform, you confirm your agreement to be bound by the terms stated herein. These Terms apply to the entire platform and any other forms of communication between the user and Haulway. If the user disagrees with any part of these Terms, they may not access the platform.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Under no circumstance shall Haulway or its affiliates be liable for any direct, indirect, special, or consequential damages, including but not limited to loss of data or money, arising out of the use or the inability to use this platform. This applies even if Haulway or an authorized representative has been advised of the possibility of such damages.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">These Terms and Conditions may be updated by Haulway or its affiliates from time to time upon reasonable notice. It is the user's responsibility to check for updates, which may be provided via the user's account or email.</p>
                    
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">02)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">LICENSE</h3>
                    <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">These Terms and Conditions constitute a contract between the user and Haulway, granting the user a revocable, non-exclusive, non-transferable, limited license to download, install, and use this platform in strict accordance with these Terms.</li>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Haulway has the right to administratively manage or maintain the user's content and/or listings on the platform.</li>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">Haulway may publish online the user’s content, listings, logos, and other materials as required. The user retains ownership but grants Haulway a royalty-free, perpetual, unrestricted license to use and publish any material provided by them for advertising on the Haulway platform.</li>
                        
                    </ol>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">03)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">DEFINITIONS AND KEY TERMS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">For these Terms and Conditions, the following definitions shall have the same meaning regardless of whether they appear in singular or plural.</p>
                    <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Haulway:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">references in these Terms to “Haulway” "we", "us" or "our" refer to the Haulway platform or its affiliates.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Affiliate:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">An affiliate, in the context of these Terms and Conditions, refers to any company or organization that is directly or indirectly related to the Haulway platform, often through ownership, control, or a business relationship. Affiliates may include subsidiaries, parent companies, partner organizations, or entities that share a connection with Haulway</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">User:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to any individual, company, or organization that registers on the Haulway platform. This term collectively encompasses Registered Users, Authorized Users, and individual users.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Platform:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to the Haulway hub</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Device:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to any internet-connected device such as a phone, tablet, computer, or any other device that can be used to access the platform and use the services.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Terms and Conditions (also referred to as "Terms"):</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to these Terms and Conditions, which constitute the complete agreement between the user and Haulway regarding the use of the service.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Personal Data:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8"> Refers to any information, whether obtained directly, indirectly, or in connection with other data (including personal identification numbers), that allows the identification or identifiability of a natural person</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Third-party service:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Denotes any services, content (including data, information, products, or services), or offerings provided by a third party, which may be displayed, included, or made available on the platform</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">You:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to any individual, company, or organization that has completed the registration process and holds an active account on the Haulway platform, thereby gaining the ability to access and utilize the services provided by the platform</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Vendor:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to an individual or entity engaged in the practice of listing their products or goods for sale on the Haulway platform.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Influencer:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refers to an individual who specializes in creating promotional content on behalf of vendors with the primary objective of increasing product or service sales. These individuals may collaborate with vendors to enhance marketing and reach a wider audience through their content creation efforts.</span></li>
                        
                    </ol>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">05)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">SCOPE OF APPLICATION</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Individual users: These Terms apply to your use of the platform and its content/services, regardless of the device you use to access it. By accessing Haulway, you agree to these terms.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Users with access: These Terms shall apply to business organisations ("Registered Users”) and their registered employees ("Authorised Users”) who access and utilize the platform and its content/services, regardless of the device used to access it. By accessing Haulway, you agree to be bound by these Terms.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">06)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">ACKNOWLEDGMENT</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">You represent that you are over the age of 18. Haulway does not permit those under 18 to use its services. Your access to and use of the service are also conditioned on your acceptance of and compliance with our Privacy Policy.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Our Privacy Policy describes our policies and procedures regarding the collection, use, and disclosure of your personal information when you use this platform. It also informs you about your privacy rights and how the law protects you. Please read our Privacy Policy carefully before using our services.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">07)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">PROHIBITED ACTIVITIES </h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Do not use the services provided by the platform to engage in or encourage any activity that is illegal, deceptive, harmful, or that violates the rights of others, or that may harm Haulway's operations or reputation. This includes:</p>
                    <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Violations of Laws:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Violating any applicable laws, regulations, or industry standards or guidance (collectively referred to as "Applicable Laws"). This includes violations of applicable laws that require (a) obtaining consent before transmitting, recording, collecting, or monitoring data or communications, or (b) complying with opt-out requests for any data or communications</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Interference with the Services:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Interfering with or otherwise negatively impacting any aspect of the services or any third-party networks linked to the services.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Falsification of Identity or Origin:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Creating a false identity or attempting to mislead others regarding the sender's identity or the origin of any data or communications.</span></li>
                        
                    </ol>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">08)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">NO SERVICE INTEGRITY VIOLATIONS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Do not compromise the integrity of the services provided by this platform, including:</p>
                    <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Bypassing Service Limitations:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Do not attempt to bypass, exploit, defeat, or disable limitations or restrictions placed on the provided services</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Security Vulnerabilities:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Do not seek to identify security vulnerabilities for the purpose of exploiting the services or attempting to bypass security mechanisms or filtering capabilities.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Disabling the Services:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Refrain from engaging in any denial of service (DoS) attack on the services or any other behaviour that disrupts, disables, or overloads the services</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Harmful Code or Bots:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Do not transmit code, files, scripts, agents, or programs with malicious intent, such as viruses or malware. Also, avoid using automated means, such as bots, to access or use the services.</span></li>
                        <li className="xui-mt-half"><span className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-font-w-bold">Unauthorized Access:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">Do not attempt to gain unauthorized access to the services.</span></li>
                        
                    </ol>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">09)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">REGISTRATION, ACCOUNTS, AND PASSWORDS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">You are responsible for the personal protection and security of any password or username you may use to access our platform. You are responsible for all activity conducted on the platform that can be linked or traced back to your username or password. You are obligated to immediately report a lost or stolen password or username to our Customer Service. </p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">If you suspect unauthorized use of your password or account, you must notify Customer Service immediately. We reserve the right to access and disclose any information, including usernames of accounts, and other information to comply with applicable laws and lawful government requests.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">10)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">COMPLIANCE WITH LOCAL LAWS AND REGULATIONS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our platform and services are not directed at you if we are prohibited by any law of any jurisdiction from making the information on our website available to you. Furthermore, our platform is not intended for any use that would be contrary to local laws or regulations.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">11)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">INDEMNIFICATION</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">You agree to indemnify and hold Haulway, its officers, employees, and agents, including covering costs and attorney's fees, harmless from any claim or demand made by any third party due to or arising out of (a) your use of the platform (b) your violation of these Terms, (c) your violation of applicable laws or regulations or (d) violation of any right of a third party.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Haulway reserves the right to assume exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of these claims. Haulway will make reasonable efforts to notify you of any such claim, action, or proceeding upon becoming aware of it.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">12)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">TERM AND TERMINATION</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Subject to this section, these Terms will remain in full force and effect while you use the platform. We may, at our sole discretion, suspend or terminate your rights to use this platform at any time, for any reason, including a violation of these Terms.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Upon termination of your rights under these Terms, your account and access to the platform will terminate immediately. Please note that any termination of your account may result in the deletion of data or information associated with your account from our live databases. Haulway will not be liable to you for any termination of your rights under these Terms.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">13)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">NO SERVICE INTEGRITY VIOLATIONS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Do not compromise the integrity of the services provided by this platform, including:</p>
                    <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">The Vendor and Influencer ("Parties") agree to pay Haulway a fixed percentage commission on the gross revenue generated from their sales made through our platform. Depending on the circumstance, different commission percentages may be agreed upon for specific services, tiers, or product categories</li>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">We may introduce additional fees for our services through the platform at any time. These fees may include, but are not limited to, listing fees and enhanced marketing fees. In the event of the introduction of such fees, parties will be notified in writing before their commencement and will have the option to opt out.</li>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">We reserve the right to adjust the percentage commission, provided suitable notice is given in advance to the parties. We will provide adequate written notice of any commission changes. This does not cover adjustments that constitute a material change in the contract terms, which would require an additional agreement on the change.</li>
                        
                    </ol>
                </div>

                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">14)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">"AS IS" AND "AS AVAILABLE" DISCLAIMER</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">The services are provided to you "AS IS" and "AS AVAILABLE,” with all faults and defects, without any warranties of any kind. To the maximum extent permitted by applicable law, Haulway, on its behalf and on behalf of its Affiliates, licensors, and service providers, expressly disclaims all warranties, whether express, implied, statutory, or otherwise, regarding the services. This includes all implied warranties of merchantability, and any warranties that may arise from the course of dealing, course of performance, usage, or trade practice.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Without limitation to the foregoing, Haulway provides no warranty or undertaking, and makes no representation of any kind that the services will meet your requirements, achieve any intended results, be compatible or work with any other software, applications, systems, or services, operate without interruption, meet any performance or reliability standards or be error-free or that any errors or defects can or will be corrected.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Without limiting the foregoing, Haulway does not make any representation or warranty of any kind, express or implied: (i) as to the operation or availability of its services, or the information, content, and materials or products included therein; (ii) that the Services will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Services; or (iv) that the Services, its servers, the content, or e-mails sent from or on behalf of the Haulway are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Please note that some jurisdictions may not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer. In such cases, the exclusions and limitations outlined in this section shall be applied to the greatest extent enforceable under applicable law.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">15)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">RETURNS AND REFUND POLICY</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">All purchases made through Haulway are subject to the return and refund policies of the respective vendor or store from which the product was purchased.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">The vendor or store is solely responsible for managing returns, refunds, and exchanges. Please familiarize yourself with their policies, which may vary.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Haulway and its affiliates are not responsible for any disputes, issues, or inconveniences related to returns or refunds. All concerns should be addressed directly with the vendor or store.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Haulway and its affiliates shall not be held liable for any issues arising from the return, refund, or exchange processes conducted by the vendor or store. This includes, but is not limited to, shipping delays, product defects, or dissatisfaction with the purchased item.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Refunds will be processed by the vendor or store in accordance with their policies. Haulway is not involved in the financial transactions or refund processing.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">16)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">THIRD-PARTY SERVICES</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">This platform may include links to third-party websites and services, as well as display advertisements for third parties. Haulway is not responsible for any aspect of these Third-Party Links & Ads, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, quality, or any other aspect.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We do not assume and shall not have any liability or responsibility to you or any other person or entity for any Third-Party Services. Haulway provides access to these Third-Party Links & Ads solely for your convenience and does not review, approve, monitor, endorse, warrant, or make any representations about Third-Party Services.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">You use all Third-Party Services at your own risk and should apply a suitable level of caution and discretion in doing so. When you click on any of the Third-Party Links & Ads, the applicable third party's terms and policies apply, including the third party's privacy and data gathering practices.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">17)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">SHIPPING POLICY</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">All shipping-related matters for purchases made through Haulway are the sole responsibility of the respective vendor or store from which the product was purchased. Customers are advised to familiarize themselves with the shipping policies of the specific vendor or store, as they may vary.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">The vendor or store is exclusively responsible for providing accurate and timely shipping information, including delivery times and tracking details.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Haulway and its affiliates shall not be held liable for any problems arising from the shipping process conducted by the vendor or store. This includes, but is not limited to, delays, damages during transit, lost packages or issues related to the delivery service.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Any shipping costs or fees associated with your purchase are determined by the vendor or store. Please refer to their policies for detailed information on shipping charges.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">18)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">MODIFICATION TO OUR SERVICE</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We reserve the right to modify, suspend, or discontinue Haulway's services, or any service connected to it, whether temporarily or permanently. This may occur with or without notice and without any liability to you.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">19)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">CHANGES TO THESE TERMS AND CONDITIONS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is considered material, we will make reasonable efforts to provide at least 30 days' notice before the new terms take effect. What constitutes a material change will be determined at our sole discretion.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">By continuing to access or use our platform after any revisions become effective, you agree to be bound by the revised terms. If you do not agree with the new terms, in whole or in part, you will no longer be authorized to use our platform.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">20)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">GOVERNING LAW</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">The laws of the Federal Republic of Nigeria, excluding its conflict of law rules, shall govern these Terms and your use of this platform. Your use of this platform may also be subject to other local, state, national, or international laws.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">21)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">DISPUTES RESOLUTION</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">If you have any concerns or disputes regarding the services provided on this platform, you agree to first attempt to resolve the dispute through informal negotiation with us within twenty (20) days from the date the notice of dispute is communicated to us. After twenty (20) days, you may commence arbitration.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Disputes will be ultimately resolved under the Arbitration and Conciliation Act, 2004, CAP. A18 of the Laws of the Federation of Nigeria, 2004, or any other statutory modification thereof. One or more Arbitrators will be appointed by both Parties in accordance with the aforementioned Act.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">In the event that the Parties fail to agree on the appointment of an Arbitrator, the Chief Judge of the High Court of Port Harcourt shall appoint an Arbitrator for the Parties. The arbitration shall take place in Port Harcourt, Nigeria, and the language of the arbitration shall be English.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">The arbitral award shall be final and binding on the Parties from the date it is made, and judgment upon any award may be entered in any court with jurisdiction. The Parties undertake to promptly implement the outcome of the arbitral award.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">22)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">SEVERABILITY</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">If any provision of these Terms is deemed unenforceable or invalid, that provision will be modified and interpreted to achieve its intended objectives to the greatest extent possible under applicable law. The remaining provisions will remain in full force and effect.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">23)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">WAIVER</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Except as provided herein, the failure to exercise a right or require the performance of an obligation under these Terms shall not affect a party's ability to exercise that right or require that performance at any time in the future. Additionally, the waiver of a breach shall not constitute a waiver of any subsequent breach.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">24)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">ENTIRE TERMS</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">These Terms constitute the entire agreement between you and us regarding the use of this platform. You may also be subject to additional terms and conditions that apply when using other services from us, which will be provided to you at the time of such use.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Our failure to exercise or enforce any right or provision of these Terms shall not be deemed a waiver of that right or provision. The section titles in these Terms are for convenience and have no legal or contractual effect. The term "including" means "including without limitation.”</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">If any provision of these Terms is held to be invalid or unenforceable, the other provisions will remain unaffected, and the invalid or unenforceable provision will be modified to be valid and enforceable to the maximum extent permitted by law.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">These Terms and your rights and obligations herein may not be assigned, subcontracted, delegated, or otherwise transferred by you without Haulway's prior written consent. Any attempted assignment, subcontract, delegation, or transfer in violation of this requirement will be null and void. Haulway, on the other hand, may freely assign these Terms, and the terms and conditions outlined in these Terms will be binding upon assignees.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">25)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">YOUR PRIVACY</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Please read our Privacy Policy.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">26)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">INTELLECTUAL PROPERTY</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our platform and all of its contents, features, and functionality (including, but not limited to, all information, software, text, displays, images, video and audio, and the design, selection, and arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected by law.</p>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Our intellectual property may not be copied, modified, reproduced, downloaded, or distributed in any manner, whether in whole or in part, without our express written permission, except as expressly provided in these Terms.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">27)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">COOKIES</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We use "cookies" to store information, including visitors' and users' preferences, and the channels/pages that the visitor/user accessed or visited. This information is utilized to enhance users' experiences by customizing suggestions or content based on users' browser type and other relevant information.</p>
                </div>
                <div>
                    <p className="xui-font-sz-90 xui-opacity-6">28)</p>
                    <h3 className="xui-font-sz-150  xui-mt-half">CONTACT US</h3>
                    <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">If you have any questions about these Terms and Conditions, you can contact us:</p>
                    <ol className="xui-mt-1" style={{"listStyleType": "circle"}}>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8"><a xui-modal-close="terms-modal" className="nav__link xui-cursor-pointer xui-text-dc-underline"onClick={() => {scrollTo(contact_us)}}>By email or</a></li>
                        <li className="xui-font-sz-90 xui-line-height-1-half xui-mt-half xui-opacity-8">By visiting this page on our website.</li>
                        
                    </ol>
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

export default TermsandConditions;
