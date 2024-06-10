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


const Landing = () => {
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
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Your Wardrobe, Your Canvas",
        "Fashion Your Way, Every Day",
        "Explore, Shop, Conquer",
        "Your Fashion Journey Starts Here",
        "Slay the Day Every Day",
      ],
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 100,
      backDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });

    /*==================== SHOW MENU ====================*/
    const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

      // Validate that variables exist
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          // We add the show-menu class to the div tag with the nav__menu class
          nav.classList.toggle("show-menu");
        });
      }
    };
    showMenu("nav-toggle", "nav-menu");

    /*==================== REMOVE MENU MOBILE ====================*/
    const navLink = document.querySelectorAll(".nav__link");

    function linkAction() {
      const navMenu = document.getElementById("nav-menu");
      // When we click on each nav__link, we remove the show-menu class
      navMenu.classList.remove("show-menu");
    }
    navLink.forEach((n) => n.addEventListener("click", linkAction));

    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    const sections = document.querySelectorAll("section[id]");

    function scrollActive() {
      const scrollY = window.pageYOffset;

      // sections.forEach((current) => {
      //   const sectionHeight = current.offsetHeight;
      //   const sectionTop = current.offsetTop - 50;
      //   let sectionId = current.getAttribute("id");

      //   if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      //     document
      //       .querySelector(".nav__menu a[href*=" + sectionId + "]")
      //       .classList.add("active-link");
      //   } else {
      //     document
      //       .querySelector(".nav__menu a[href*=" + sectionId + "]")
      //       .classList.remove("active-link");
      //   }
      // });
    }
    window.addEventListener("scroll", scrollActive);

    /*==================== CHANGE BACKGROUND HEADER ====================*/
    function scrollHeader() {
      const nav = document.getElementById("header");
      // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
      if (this.scrollY >= 200) nav.classList.add("scroll-header");
      else nav.classList.remove("scroll-header");
    }
    window.addEventListener("scroll", scrollHeader);

    /*==================== SHOW SCROLL TOP ====================*/
    function scrollTop() {
      const scrollTop = document.getElementById("scroll-top");
      // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
      if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
      else scrollTop.classList.remove("show-scroll");
    }
    window.addEventListener("scroll", scrollTop);

    /*==================== DARK LIGHT THEME ====================*/
    const themeButton = document.getElementById("theme-button");
    const darkTheme = "dark-theme";
    const iconTheme = "bx-sun";

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () =>
      themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

    // We validate if the user previously chose a topic
    if (selectedTheme) {
      // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
        iconTheme
      );
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener("click", () => {
      // Add or remove the dark / icon theme
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      // We save the theme and the current icon that the user chose
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    });

    return () => {
      typed.destroy();
    };

    // /*==================== SCROLL REVEAL ANIMATION ====================*/
    // const sr = ScrollReveal({
    //   origin: 'top',
    //   distance: '30px',
    //   duration: 2000,
    //   reset: true
    // });

    // sr.reveal(`.home__data, .home__img,
    //           .about__data, .about__img,
    //           .services__content, .menu__content,
    //           .app__data, .app__img,
    //           .contact__data, .contact__button,
    //           .footer__content`, {
    //   interval: 200
    // })
  });
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
                <div
                  className="nav__link active-link"
                  onClick={() => {
                    scrollTo(home_ref);
                  }}
                >
                  Home
                </div>
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
      <main className="l-main">
        {/*========== HOME ==========*/}
        <section className="home bg_gray" id="home" ref={home_ref}>
          <div className="home__container bd-container bd-grid">
            <div className="home__data">
              <p className="home__titlex">Introducing</p>
              <p className="haulway-img-title">Haulway</p>
              <img
                className="haulway-img-line"
                src="./assets/rectangle-157-oMH.png"
              />
              {/* <div>

                  </div> */}
              {/* <h1>
                      <span class="typer home__title" id="main" data-colors="hsl(357, 86%, 57%)" data-words="RELIABLE,AFFORDABLE,SEAMLESS,EASY TO USE" data-delay="100" data-deleteDelay="1000"></span>
                      <span class="cursor home__title" data-owner="main"></span>
                  </h1> */}
              <h3 className="home__subtitle">
                The Ultimate Fashion <br /> Social Commerce Platform
              </h3>
              <span style={{ display: "inline-flex" }}>
                <p
                  ref={el}
                  className="home__description typer"
                  id="main"
                  data-delim="-"
                  data-colors="none"
                  data-words="Your Wardrobe, Your Canvas - Fashion Your Way, Every Day - Explore, Shop, Conquer - Your Fashion Journey Starts Here - Slay the Day Every Day"
                  data-delay={50}
                  data-deletedelay={500}
                />
                <p className="cursor home__description" data-owner="main" />
              </span>
              <br />
              <button
                type="button"
                className="button get-started special-button"
                onClick={() => {
                  scrollTo(contact_us);
                }}
              >
                Get Started
              </button>
              <br />
              <br />
              <strong className="home__description">Connect With Us</strong>
              <div>
                <a
                  href="https://instagram.com/haulwayglobal?igshid=NGVhN2U2NjQ0Yg=="
                  className="footer__social"
                >
                  <i className="bx bxl-instagram" />
                </a>
                <a
                  href="https://x.com/haulwayglobal?t=obIxDbhj43cWvjcpDUsWPg&s=09"
                  className="footer__social"
                >
                  <i className="bx bxl-twitter" />
                </a>
              </div>
            </div>
            <div className="home__slides">

              <Splide
                options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
                aria-label="Haulway"
              >
                <SplideSlide>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  ><Grid
                    gridTemplateColumns={'max-content max-content max-content'}
                    // gridTemplateRows={'1fr 1fr'}              
                    gap={1}
                    width={'100%'}
                    className="disap"
                    direction={'row'}
                    justifyContent={'center'}
                    alignContent={'center'}
                    // gridAutoFlow={'column'}
                    display={'grid'}
                    margin={0}
                    my={2}

                  >
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Social Commerce'} subtitle={'Elevate your Shopping Experience with Social Interactions.'} onClick={() => {
                        scrollTo(social_commerce_ref);
                      }} />
                      <Box className='disappear' width={'40px'} height={'40px'} bgcolor={'transparent'}></Box>
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Creator Centre'} subtitle={'Sell your bespoke content, turn your creative passion into substantial income.'} onClick={() => {
                        scrollTo(creator_center_ref);
                      }} />
                      <Box className='disappear' width={'40px'} height={'40px'} bgcolor={'transparent'}></Box>
                      <Stack className='disappear' width={'60px'} height={'60px'} bgcolor={'transparent'} justifyContent={'center'} alignItems={'center'}>
                        <Stack
                          className="card"
                          borderRadius='100%'
                          width={`calc(100% - 2px)`}
                          height={`calc(100% - 2px)`}
                          margin={0}
                          border={'3px solid var(--text-color)'}
                          bgcolor={'var(--body-color)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                        // padding={'8px'}





                        >
                          <img alt="true" src={favicon} width={30} style={{ filter: 'var(--logo-filter)' }} />
                          {/* <Security sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} /> */}



                        </Stack>
                      </Stack>
                      <Box className='disappear' width={'40px'} height={'40px'} bgcolor={'transparent'}></Box>
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Skill Centre'} subtitle={'Unlock your Creative Potential: Get access to tutorials and resources.'} onClick={() => {
                        scrollTo(skill_place_ref);
                      }} />
                      <Box className='disappear' width={'40px'} height={'40px'} bgcolor={'transparent'}></Box>
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Fair Contracts'} subtitle={'Elevate your collaborations with clear, fair affiliate marketing contracts.'} onClick={() => {
                        scrollTo(creator_center_ref);
                      }} />
                      {/* <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'UGC Sales'} subtitle={'Monetize your creativity with custom User-Generated Content (UGC) sales.'} /> */}

                    </Grid>
                  </motion.div>


                </SplideSlide>
                <SplideSlide>
                  <img
                    src="assets/mocks61.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "100%" }}
                  />

                </SplideSlide>
              </Splide>


            </div>
          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about section" id="about" ref={about_ref}>
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              <span className="section-subtitle about__initial">About Us</span>
              <h2 className="section-title about__initial">
                Discover a new era of digital engagement
              </h2>
              <p className="about__description">
                where the lines between content and commerce seamlessly
                converge. We're transforming the way users interact, shop, and create. Dive into
                a world where social media isn't just about likes, but a direct
                gateway to a personalized shopping journey. Welcome to Haulway
              </p>
              {/* <a href="#menu" class="button get-started bd_radius">Get Started</a> */}
            </div>
            <div className="about__img__section" ref={soc_ref}
              style={{
                transform: socisInView ? "none" : "translateX(-200px)",
                opacity: socisInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
              }}> <Splide
                // className=" "
                options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
                aria-label="Haulway"

              >
                <SplideSlide>
                  <img
                    src="assets/mocks1.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "50%" }}
                  />
                  <img
                    src="assets/mocks4.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "50%" }}
                  />
                </SplideSlide>
                <SplideSlide>
                  <img
                    src="assets/mocks5.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "50%" }}
                  />
                  <img
                    src="assets/mocks2.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "50%" }}
                  />
                </SplideSlide>
              </Splide></div>


          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about section" id="about" ref={social_commerce_ref}>
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              <span className="section-subtitle about__initial">
                Bridging the Gap
              </span>
              <h2 className="section-title about__initial">
                Between Content &amp; Commerce
              </h2>
              <p className="about__description">
                We integrate a direct shopping feature within the social media
                experience allowing users to effortlessly purchase items
                directly from influencer videos. It's not just content; it's
                commerce in motion.
              </p>
              {/* <a href="#menu" className="button get-started">
                Learn more
              </a> */}
            </div>
            <video
              className="reverse__order home__img"
              // width='500'
              // height='240'
              autoPlay
              loop
              muted
              playsInline
              style={{ maxWidth: "90%" }}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* <div class="home__img__container reverse__order">
          </div> */}
          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about section" id="about" ref={creator_center_ref}>
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              <span class="section-subtitle about__initial">UGC Marketing</span>
              <h2 className="section-title about__initial">
                Creator Centre
              </h2>
              <p className="about__description">
                Our platform redefines the creator experience,
                offering a space to sell custom vendor specific User-Generated
                Content (UGC), negotiate and establish clear, fair affiliate
                marketing contracts. It's about empowering creators of all
                sizes, ensuring fair compensation for their collaborations.
              </p>
              {/* <a href="#menu" className="button get-started bd_radius">
                Join now
              </a> */}
            </div>

            <Splide
              options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
              aria-label="Haulway"
            >
              <SplideSlide>
                {/* <img
                  src="assets/mocks1.png"
                  alt
                  className="home__img "
                  style={{ maxWidth: "50%" }}
                />
                <img
                  src="assets/mocks4.png"
                  alt
                  className="home__img "
                  style={{ maxWidth: "50%" }}
                /> */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  <Grid
                    ref={crc_ref}
                    gridTemplateColumns={'max-content'}
                    // gridTemplateRows={'1fr 1fr'}              
                    gap={1}
                    width={'100%'}
                    // className="home__img"
                    direction={'row'}
                    justifyContent={'center'}
                    alignContent={'center'}
                    // gridAutoFlow={'column'}
                    display={'grid'}
                    margin={0}
                    my={2}
                    style={{
                      transform: crcisInView ? "none" : "translateX(-200px)",
                      opacity: crcisInView ? 1 : 0,
                      transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}

                  >
                    <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Monetize Your Craft'} subtitle={'Sell exclusive content and turn creativity into cash. Your art, your revenue!'} />
                    <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Earn as You Influence'} subtitle={'Authentically promote brands, and earn consistently. Your influence, your success!'} />
                    <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Fair Contracts'} subtitle={'Elevate your collaborations with clear, fair affiliate marketing contracts.'} />
                    <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'UGC Sales'} subtitle={'Monetize your creativity with custom User-Generated Content (UGC) sales.'} />


                  </Grid>
                </motion.div>
              </SplideSlide>
              <SplideSlide>
                <img
                  src="assets/mocks5.png"
                  alt
                  className="home__img "
                  style={{ maxWidth: "50%" }}
                />
                <img
                  src="assets/mocks2.png"
                  alt
                  className="home__img "
                  style={{ maxWidth: "50%" }}
                />
              </SplideSlide>
            </Splide>

          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about bg_gray section" id="about" ref={skill_place_ref}>
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              <span className="section-subtitle about__initial">
                Skill Centre
              </span>
              <h2 className="section-title about__initial">
                Our Skill Centre offers
              </h2>
              <p className="about__description">
                tutorials, resources, and workshops, empowering creators with
                the tools to enhance content quality and engagement strategies.
                It's a leveling ground for creators, ensuring everyone has
                access to professional insights.
              </p>
              {/* <a href="#menu" class="button get-started bd_radius">Get Started</a> */}
            </div>
            <div className="about__img__section " style={{ width: 'calc(100%)' }}>
              <Splide
                options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
                aria-label="Haulway"
              >
                <SplideSlide>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    <Grid
                      gridTemplateColumns={'max-content max-content'}
                      // gridTemplateRows={'1fr 1fr'}              
                      gap={1}
                      width={'100%'}
                      // className="home__img"
                      direction={'row'}
                      justifyContent={'center'}
                      alignContent={'center'}
                      // gridAutoFlow={'column'}
                      display={'grid'}
                      margin={0}
                      my={2}
                      ref={skc_ref}
                      style={{
                        transform: skcisInView ? "none" : "translateX(-200px)",
                        opacity: skcisInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                      }}


                    >
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with a global audience."} icon={MonetizationOn} />
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for massive exposure."} icon={Campaign} />
                      <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />

                    </Grid>
                  </motion.div>
                </SplideSlide>
                <SplideSlide>
                  <img
                    src="assets/mocks5.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "50%" }}
                  />
                  <img
                    src="assets/mocks2.png"
                    alt
                    className="home__img "
                    style={{ maxWidth: "50%" }}
                  />
                </SplideSlide>
              </Splide></div>


          </div>
        </section>
        {/*========== SERVICES ==========*/}
        <section className="services section" id="services" ref={services_ref}>
          <span className="section-subtitle">Incase Your Wondering</span>
          <h2 className="section-title">Why Choose Haulway?</h2>
          <CenteredTab
            children={[
              {
                label: "Brands & Vendors",
                child:
                  <div className="services section" style={{ paddingTop: '5px' }}>

                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <motion.div
                        variants={item}>
                        <div className="services__content">
                          {/* <img src="assets/serv1.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <MonetizationOn sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>

                          <i className="bx bxl-message" />
                          <h3 className="services__title">Direct Sales Platform</h3>
                          <p className="services__description">
                            Engage your audience directly and showcase products seamlessly within interactive content.
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={item}>
                        <div className="services__content">
                          {/* <img src="assets/serv2.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <Grading sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>
                          <i className="bx bxl-message" />
                          <h3 className="services__title">
                            Fair Contracting
                          </h3>
                          <p className="services__description">
                            Ensure transparent collaborations by negotiating and establishing clear, fair affiliate marketing contracts on Haulway.
                          </p>
                        </div></motion.div>
                      <motion.div
                        variants={item}>
                        <div className="services__content">
                          {/* <img src="assets/serv3.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <Bolt sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>
                          <i className="bx bxl-message" />
                          <h3 className="services__title">Real-time Analytics</h3>
                          <p className="services__description">
                            Monitor your sales performance and track engagement metrics for informed decision-making.
                          </p>
                        </div></motion.div>
                    </div>

                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div className="about__data mt-5rem" style={{ width: 'calc(100% - 2rem)' }}>
                        <span class="section-subtitle about__initial">As a Brand/Vendor</span>
                        <h2 class="section-title about__initial">You can leverage Haulway to</h2>
                        <p className="about__description">
                          boost your online sales. Showcase products directly, engage in real-time, and track performance. We provide a space for transparent collaborations, ensuring fair contract negotiations. Increase visibility, sales, and operational efficiency with our user-friendly interface and real-time analytics.
                        </p>

                        {/* <a href="#menu" className="button get-started bd_radius special-button">
                          Join now
                        </a> */}
                      </div>

                      <div className="about__img__section " style={{ width: 'calc(100% - 2rem)' }}><Splide


                        options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
                        aria-label="Haulway"
                      >
                        <SplideSlide>

                          <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                          >
                            <Grid
                              gridTemplateColumns={'max-content'}
                              // gridTemplateRows={'1fr 1fr'}              
                              gap={1}
                              width={'100%'}
                              // className="home__img"
                              direction={'row'}
                              justifyContent={'center'}
                              alignContent={'center'}
                              // gridAutoFlow={'column'}
                              display={'grid'}
                              margin={0}
                              my={2}


                            >
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Enhanced Visibility'} subtitle={'Reach a broader audience and elevate your brand visibility through targeted content.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Increased Sales'} subtitle={'Engage potential customers directly, leading to higher conversion rates and increased sales.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Transparent Partnerships:'} subtitle={'Build trust with creators through clear and fair contract negotiations.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Efficient Management'} subtitle={'Streamline your operations with real-time analytics and performance insights.'} />

                            </Grid>
                          </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                          <img
                            src="assets/mocks5.png"
                            alt
                            className="home__img "
                            style={{ maxWidth: "50%" }}
                          />
                          <img
                            src="assets/mocks2.png"
                            alt
                            className="home__img "
                            style={{ maxWidth: "50%" }}
                          />
                        </SplideSlide>

                      </Splide></div>


                    </div>


                  </div>
              },
              {
                label: "Creators",
                child:
                  <div className="services section" style={{ paddingTop: '5px' }}>
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <motion.div
                        variants={item}><div className="services__content">
                          {/* <img src="assets/serv1.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <MonetizationOn sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>

                          <i className="bx bxl-message" />
                          <h3 className="services__title">UGC Sales</h3>
                          <p className="services__description">
                            Monetize your creativity by selling custom User-Generated Content (UGC) directly to your engaged audience on Haulway.
                          </p>
                        </div></motion.div>
                      <motion.div
                        variants={item}><div className="services__content">
                          {/* <img src="assets/serv2.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <Grading sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>
                          <i className="bx bxl-message" />
                          <h3 className="services__title">
                            Fair Compensation
                          </h3>
                          <p className="services__description">
                            Negotiate fair affiliate marketing contracts and ensure you receive fair compensation for your collaborations.
                          </p>
                        </div></motion.div>
                      <motion.div
                        variants={item}><div className="services__content">
                          {/* <img src="assets/serv3.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <Lightbulb sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>
                          <i className="bx bxl-message" />
                          <h3 className="services__title">Skill Centre</h3>
                          <p className="services__description">
                            Access a robust Skill Centre offering tutorials, resources, and workshops to enhance your content creation skills.
                          </p>
                        </div></motion.div>
                    </div>
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div className="about__data mt-5rem" style={{ width: 'calc(100% - 2rem)' }}>
                        <span class="section-subtitle about__initial">As a Creator/Influencer</span>
                        <h2 class="section-title about__initial">You can leverage Haulway to</h2>
                        <p className="about__description no__mb">
                          monetize your skills and content effortlessly. Sell your custom content, negotiate clear affiliate contracts, and access tutorials in our Skill Centre. Join a community-driven platform fostering creative growth and transparent monetization. Showcase talents, connect with creators, and maximize your earning potential.
                        </p>

                        {/* <a href="#menu" className="button get-started bd_radius special-button">
                          Join now
                        </a> */}
                      </div>

                      <div className="about__img__section " style={{ width: 'calc(100% - 2rem)' }}><Splide


                        options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
                        aria-label="Haulway"
                      >
                        <SplideSlide>
                          <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                          >
                            <Grid
                              gridTemplateColumns={'max-content'}
                              // gridTemplateRows={'1fr 1fr'}              
                              gap={1}
                              width={'100%'}
                              // className="home__img"
                              direction={'row'}
                              justifyContent={'center'}
                              alignContent={'center'}
                              // gridAutoFlow={'column'}
                              display={'grid'}
                              margin={0}
                              my={2}


                            >
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Monetization Opportunities'} subtitle={'Diversify your revenue streams by selling exclusive content and negotiating fair contracts.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Increased Visibility'} subtitle={'Showcase your skills and content to a wider audience, expanding your reach and influence.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Community Support'} subtitle={'Join a collaborative community for networking, sharing insights, and mutual growth.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Skill Enhancement'} subtitle={'Elevate your content creation game with insights from industry professionals.'} />

                            </Grid>
                          </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                          <img
                            src="assets/mocks5.png"
                            alt
                            className="home__img "
                            style={{ maxWidth: "50%" }}
                          />
                          <img
                            src="assets/mocks2.png"
                            alt
                            className="home__img "
                            style={{ maxWidth: "50%" }}
                          />
                        </SplideSlide>
                      </Splide></div>


                    </div>


                  </div>
              },
              {
                label: "Tutors",
                child:
                  <div className="services section" style={{ paddingTop: '5px' }}>
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <motion.div
                        variants={item}><div className="services__content">
                          {/* <img src="assets/serv1.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <Lightbulb sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>

                          <i className="bx bxl-message" />
                          <h3 className="services__title">Skill Centre</h3>
                          <p className="services__description">
                            Offer tutorials, resources, and workshops, and monetize your expertise on Haulway.
                          </p>
                        </div></motion.div>
                      <motion.div
                        variants={item}> <div className="services__content">
                          {/* <img src="assets/serv2.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <MonetizationOn sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>
                          <i className="bx bxl-message" />
                          <h3 className="services__title">
                            Monetization
                          </h3>
                          <p className="services__description">
                            Earn as creators learn by offering valuable tutorials and resources to the community.
                          </p>
                        </div></motion.div>
                      <motion.div
                        variants={item}><div className="services__content">
                          {/* <img src="assets/serv3.png" alt className="services__img" /> */}
                          <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                            <Stack
                              className="card services__img"
                              borderRadius='100%'
                              width={`70px`}
                              height={`70px`}
                              margin={1}
                              bgcolor={'rgba(25, 118, 210, 0.05)'}
                              justifyContent={"center"}
                              alignItems={"center"}
                              padding={'8px'}
                            >
                              <Campaign sx={{ color: '#1976d2', fontSize: "1.5rem" }} />
                            </Stack>
                          </Stack>
                          <i className="bx bxl-message" />
                          <h3 className="services__title">Promotion Opportunities</h3>
                          <p className="services__description">
                            Promote your tutoring services on a growing platform with a diverse and engaged audience.
                          </p>
                        </div></motion.div>
                    </div>
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div className="about__data mt-5rem" style={{ width: 'calc(100% - 2rem)' }}>
                        <span class="section-subtitle about__initial">As a Tutor/Creator</span>
                        <h2 class="section-title about__initial">You can leverage Haulway to</h2>
                        <p className="about__description no__mb">
                          monetize your expertise on. Deliver tutorials, resources, and workshops to a diverse community. Promote your tutoring services, engage with a growing audience, and turn your knowledge into a sustainable revenue stream. Connect with learners on a vibrant educational platform.
                        </p>

                        {/* <a href="#menu" className="button get-started bd_radius special-button">
                        Join now
                      </a> */}
                      </div>

                      <div className="about__img__section " style={{ width: 'calc(100% - 2rem)' }}><Splide


                        options={{ rewind: true, autoplay: false, arrows: false, pagination: false }}
                        aria-label="Haulway"
                      >
                        <SplideSlide>
                          <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                          >
                            <Grid
                              gridTemplateColumns={'max-content'}
                              // gridTemplateRows={'1fr 1fr'}              
                              gap={1}
                              width={'100%'}
                              // className="home__img"
                              direction={'row'}
                              justifyContent={'center'}
                              alignContent={'center'}
                              // gridAutoFlow={'column'}
                              display={'grid'}
                              margin={0}
                              my={2}

                            >
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Monetization Opportunities'} subtitle={'Diversify your revenue streams by selling exclusive content and negotiating fair contracts.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Increased Visibility'} subtitle={'Showcase your skills and content to a wider audience, expanding your reach and influence.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Community Support'} subtitle={'Join a collaborative community for networking, sharing insights, and mutual growth.'} />
                              <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Skill Enhancement'} subtitle={'Elevate your content creation game with insights from industry professionals.'} />

                            </Grid>
                          </motion.div>
                        </SplideSlide>
                        <SplideSlide>
                          <img
                            src="assets/mocks5.png"
                            alt
                            className="home__img "
                            style={{ maxWidth: "50%" }}
                          />
                          <img
                            src="assets/mocks2.png"
                            alt
                            className="home__img "
                            style={{ maxWidth: "50%" }}
                          />
                        </SplideSlide>
                      </Splide></div>


                    </div>


                  </div>
              }
            ]}
          />

        </section>
        {/*========== SERVICES ==========*/}
        {/* <TabbedGridSection data={{subtitle: 'Great Ideas. Great Companies', title: 'Our Current Companies'}} /> */}
        {/*========== SERVICES ==========*/}
        {/* <TabbedGridSection data={{subtitle: 'Great Ideas. Great Companies', title: 'IPO and M&A Activity'}} /> */}

        {/*========== ABOUT ==========*/}
        <section
          className="about bg_gray section"
          id="about"
          ref={partnership_ref}
        >
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              {/* <span class="section-subtitle about__initial">About us</span> */}
              <h2 className="section-title about__initial">
                We're Revolutionizing Digital Commerce
              </h2>
              <p className="about__description">
                Be part of a community where content
                creators, influencers, and shoppers coexist harmoniously.
                Together, we're creating a sustainable and equitable ecosystem
                for digital commerce. Want to feel connected to products as you
                witness them in action, worn or used by those you trust?
              </p>
              <button
                type="button"
                className="button get-started special-button"
                onClick={() => {
                  scrollTo(contact_us);
                }}
              >
                Join the Waitlist
              </button>
            </div>
            <img
              src="assets/people1.png"
              alt
              className="about__img home__img reverse__order"
            />
          </div>
        </section>
        {/* ===== APP ======= */}
        {/* <section class="app section bd-container">
          <div class="app__container bd-grid">
              <div class="app__data">
                  <span class="section-subtitle app__initial">App</span>
                  <h2 class="section-title app__initial">Exciting Times Ahead!</h2>
                  <p class="app__description">Our App is Coming soon, Enabling You to Shop at Beloved Stores, Promote Products Earn Rewards and More!</p>
                  <div class="app__stores">
                      <a href="#"><img src="assets/img/app1.png" alt="" class="app__store"></a>
                      <a href="#"><img src="assets/img/app2.png" alt="" class="app__store"></a>
                  </div>
              </div>

              <img src="assets/mockup1.png" alt="" class="app__img home__img">
          </div>
      </section> */}
        {/*========== CONTACT US ==========*/}
        <section
          className="contact section bd-container"
          id="contact"
          ref={contact_us}
        >
          <div className="contact__container bd-grid bd-container">
            <div className="contact__data">
              <span className="section-subtitle contact__initial">
                Excited yet?
              </span>
              <h2 className="section-title contact__initial">Let's talk</h2>

              <div className="app__stores">
                <input
                  className="card frm_width"
                  style={{ color: 'var(--text-color)', background: 'var(--container-color)', boxShadow: '0 2px 20px hsla(0, 0%, 0%, 0.06)', border: 'none', fontSize: 'var(--small-font-size)' }}
                  type="email"
                  id="name_input"
                  placeholder="Name"
                  name="name"
                  onChange={(e) =>
                    setName({ ...name, text: e.target.value })
                  }
                />
                <input
                  className="card frm_width"
                  style={{ color: 'var(--text-color)', background: 'var(--container-color)', boxShadow: '0 2px 20px hsla(0, 0%, 0%, 0.06)', border: 'none', fontSize: 'var(--small-font-size)' }}
                  type="email"
                  id="email_input"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) =>
                    setEmail({ ...email, text: e.target.value })
                  }
                />
                <textarea
                  rows={4}


                  className="card frm_width"
                  style={{
                    color: 'var(--text-color)', background: 'var(--container-color)', boxShadow: '0 2px 20px hsla(0, 0%, 0%, 0.06)', border: 'none', fontSize: 'var(--small-font-size)',
                    margin: '8px 3px',
                    fontFamily: `Montserrat, 'Source Sans Pro'`,
                    // minWidth: '60%',
                    display: 'inline-block',
                    boxSizing: 'border-box',
                    paddingInline: '20px',
                    paddingBlock: '16px',
                    resize: 'none'

                  }}
                  type="email"
                  id="message_input"
                  placeholder="Message"
                  name="message"
                  onChange={(e) =>
                    setMessage({ ...message, text: e.target.value })
                  }
                />

              </div>
              <button type="button" className="button special-button" onClick={handleSave}>
                Send
              </button>
            </div>
            <img
              src="assets/people2.png"
              alt
              className="about__img home__img"
            />
          </div>
        </section>
      </main>
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
                  <div xui-modal-open={'privacy-policy-modal'} className="xui-opacity-6 xui-font-sz-80 xui-mt-1 xui-cursor-pointer">Privacy Policy</div>
                  <div xui-modal-open={'terms-modal'} className="xui-opacity-6 xui-font-sz-80 xui-mt-1-half xui-cursor-pointer">Terms & Conditions</div>
              </div>
          </div>
      </section>
      <section className="xui-modal" xui-modal={'terms-modal'} disable-click-on-outside={'true'}>
          <div className="xui-modal-content">
            <div className="xui-d-flex xui-flex-jc-flex-end">
                <div className="xui-w-50 xui-h-50 xui-bg-blue xui-text-white xui-d-inline-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer" xui-modal-close='terms-modal'>
                    X
                </div>
            </div>
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
          </div>
      </section>
      <section className="xui-modal" xui-modal={'privacy-policy-modal'} disable-click-on-outside={'true'}>
          <div className="xui-modal-content">
            <div className="xui-d-flex xui-flex-jc-flex-end">
                <div className="xui-w-50 xui-h-50 xui-bg-blue xui-text-white xui-d-inline-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer" xui-modal-close='privacy-policy-modal'>
                    X
                </div>
            </div>
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
                        <h3 className="xui-font-sz-150  xui-mt-half">INTERPRETATION AND DEFINITIONS</h3>
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
                        <h3 className="xui-font-sz-150  xui-mt-half">COLLECTING PERSONAL DATA</h3>
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
                        <h3 className="xui-font-sz-150  xui-mt-half">USE OF YOUR PERSONAL DATA</h3>
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
                        <h3 className="xui-font-sz-150  xui-mt-half">RETENTION OF YOUR PERSONAL DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We will also retain usage data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our platform, or we are legally obligated to retain this data for longer time periods</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">05)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">TRANSFER OF YOUR PERSONAL DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Your information, including Personal Data, is processed at our operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy. No transfer of your Personal Data will occur to an organization or country unless adequate controls, including data security and personal information protection, are in place.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">06)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">DISCLOSURE OF YOUR PERSONAL DATA</h3>
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
                        <h3 className="xui-font-sz-150  xui-mt-half">DO NOT TRACK</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Do Not Track (DNT) is a privacy preference that users can set in some web browsers, allowing them to opt out of being tracked by websites and online services. We do not honour browser requests not to be tracked online (known as "Do Not Track"). However, our cookie policy below outlines how you can opt out of receiving cookies.</p>
                    </div>

                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">08)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">COOKIES</h3>
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
                        <h3 className="xui-font-sz-150  xui-mt-half">LOG DATA</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Whenever you use our platform, in the event of an error, we collect data and information (through third-party products) on your device, referred to as Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our service, the time and date of your use of the platform, and other statistics.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">10)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">MESSAGING</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our platform allows users to communicate with others who post information on the platform. We may read, collect, and analyse information transmitted between users for regulatory compliance and marketing purposes. However, we do not guarantee the accuracy or completeness of information provided by users. We assume no liability or responsibility for any errors or omissions in the content provided by users.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">11)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">TESTIMONIALS</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We display personal testimonials from satisfied users on our platform, along with other endorsements. With your consent, we may post your testimonial, including your name and other information. If you wish to update or delete your testimonial, please contact us at <a className="xui-text-dc-underline" href="https://www.haulway.co">www.haulway.co</a></p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">12)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">LINKS TO OTHER WEBSITES</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our platform may include links to other websites not operated by us. Clicking on a third-party link will redirect you to that third party's site. We strongly recommend reviewing the Privacy Policy of every site you visit.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Please be aware that we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">13)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">CHANGES TO THIS PRIVACY POLICY</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">We will let you know via email and/or a prominent notice on our platform, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on the platform.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">14)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">CUSTOMIZED ADVERTISING</h3>
                        <p className="xui-mt-1"><span className="xui-font-sz-90 xui-line-height-1-half xui-font-w-bold">Customized or Tailored Advertising:</span> <span className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8">We may allow third-party service providers, including ad networks, ad servers, and affiliate marketing third parties (such as e-commerce websites), to place cookies and other tracking technologies on your computer and mobile devices, in order to collect information about your use of the platform. These third parties may use this information to optimize the placement of advertisements presented to you and to provide us with insights into the effectiveness of our marketing strategies</span></p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">It's important to note that we do not have access to the tracking technologies employed by nonaffiliated ad-based third parties that may be placed on any device you use to access the platform. These third parties may offer an opt-out option for targeted advertisements. Certain information collected by cookies through the platform may be derived from aggregated data or data you voluntarily submitted to us, and we may share it with a service provider in encrypted form. This aids in gaining a better understanding of how targeted advertisements function and how to control cookies or opt out of such services.</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">For information on how to manage customized in-app advertising, please visit the privacy settings of your mobile device or contact your device platform operator to review relevant support materials.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">15)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">CHILDREN’S RIGHTS</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Our services are not intended for minors under 18 years of age. The platform is designed for individuals aged 18 or older. If any attempts by a minor to sign into the platform are detected, we will automatically delete the account and all associated information</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">16)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">SECURITY</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">We take all required security measures (such as end-to-end encryptions, passwords, etc.) to ensure the safety of personal information provided by users of this platform, to avoid unauthorized access. While assuring you that we have done everything necessary to protect your personal information from unauthorized access, you should also bear in mind that no security measure is 100% foolproof</p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Hence, you are advised to protect your personal information, by securing your passwords and devices which you may use to access the platform. Make use of rare and strong passwords and keep them private, sign off on any shared device you may use to access the platform, not sharing or reusing an exposed password. We cannot and will not be held responsible for lost or stolen passwords, any unauthorized use of your personal information, nor for any unauthorized use of passwords on your account.</p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">17)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">INFORMATION MANAGEMENT</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">Certain information that you've provided on your profile can be changed or deleted through the preferences section in your "Dashboard." Any incorrect information must be promptly updated or reviewed. Upon request, we may close your account and delete your profile information from the platform. </p>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-1">Any information retained thereafter may be to comply with regulatory laws, assist with investigations involving any user, prevent fraudulent activities, settle disagreements, collect outstanding payments, enforce our rights or any other purpose otherwise approved by law. It is crucial to note that, while an account may be removed, User Content provided by that account may not be changed or removed. By agreeing to this Policy, we will not be held responsible for retaining information related to your account after deactivation.</p>
                    </div>
                    
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">18)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">EMAIL COMMUNICATION OPTIONS</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">You have the option to opt-out of any email subscriptions we send to you, provided that they do not directly pertain to your account, services, or quotations you have requested or received from us. Opt-out options will always be included in such emails. </p>
                    </div>
                    <div>
                        <p className="xui-font-sz-90 xui-opacity-6">19)</p>
                        <h3 className="xui-font-sz-150  xui-mt-half">CONTACT US</h3>
                        <p className="xui-font-sz-90 xui-line-height-1-half xui-opacity-8 xui-mt-half">If you have any questions about this Privacy Policy, feel free to contact us at <a className="xui-text-dc-underline" href="https://www.haulway.co">www.haulway.co</a></p>
                    </div>
                </div>
            </section>
          </div>
      </section>
      {/*========== SCROLL REVEAL ==========*/}
      {/*========== MAIN JS ==========*/}
      {/*========== MAIN JS ==========*/}
      {/*========== Typer JS ==========*/}
    </div>
  );
};

export default Landing;
