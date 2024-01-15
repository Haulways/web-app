/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import Typed from "typed.js";
import { createClient } from "@supabase/supabase-js";
import { useNotify } from "react-admin";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import video from "./vid/mockvid.mp4";
import ImageCard from "./components/cards/imageCard";
import { ArrowOutwardOutlined, Search, BubbleChart, Security } from "@mui/icons-material";
import {
  // LongTextInput,
  Chip, Stack, Box, Grid, useMediaQuery, InputAdornment,
} from "@mui/material";
import CenteredTab from "./components/tabs/centeredTab";
import favicon from './components/images/favicon.ico'
import ImageTile from "./components/cards/imageTile";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);

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

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".nav__menu a[href*=" + sectionId + "]")
            .classList.add("active-link");
        } else {
          document
            .querySelector(".nav__menu a[href*=" + sectionId + "]")
            .classList.remove("active-link");
        }
      });
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
      <a href="#" className="scrolltop" id="scroll-top">
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
                <a className="nav__link button signup">Sign Up</a>
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
                className="button get-started"
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
                  <Grid
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

                  >
                    <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Social Commerce'} subtitle={'Elevate your Shopping Experience with Social Interactions.'} />
                    <Box className='disappear' width={'40px'} height={'40px'} bgcolor={'transparent'}></Box>
                    <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Skill Centre'} subtitle={'Unlock your Creative Potential: Get access to tutorials and resources.'} />
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
                    <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'Fair Contracts'} subtitle={'Elevate your collaborations with clear, fair affiliate marketing contracts.'} />
                    <Box className='disappear' width={'40px'} height={'40px'} bgcolor={'transparent'}></Box>
                    <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--section-color)'} cont_color={'var(--body-color)'} notch={'false'} title={'UGC Sales'} subtitle={'Monetize your creativity with custom User-Generated Content (UGC) sales.'} />

                  </Grid>


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
            <Splide
              className="about__img__section "
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
                {/* <Grid
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

                >
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} />
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} />
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} />
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} />

                </Grid> */}
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
            {/* <div className="about__img__section ">
              <img
                src="assets/mocks4.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
              />
              <img
                src="assets/mocks1.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
                style={{ display: "none" }}
              />
              <img
                src="assets/mocks2.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
                style={{ display: "none" }}
              />
              <img
                src="assets/mocks3.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
                style={{ display: "none" }}
              />
            </div> */}
            {/* <div class="home__img__container about__img">
              </div> */}
          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about section" id="about" ref={about_ref}>
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
        <section className="about section" id="about" ref={about_ref}>
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
                  <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Monetize Your Craft'} subtitle={'Sell exclusive content and turn creativity into cash. Your art, your revenue!'} />
                  <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Earn as You Influence'} subtitle={'Authentically promote brands, and earn consistently. Your influence, your success!'} />
                  <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Fair Contracts'} subtitle={'Elevate your collaborations with clear, fair affiliate marketing contracts.'} />
                  <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'UGC Sales'} subtitle={'Monetize your creativity with custom User-Generated Content (UGC) sales.'} />


                </Grid>
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
            {/* <img
              src="assets/people6.png"
              alt
              className="about__img home__img"
            /> */}
            {/* <div class="home__img__container about__img">
        </div> */}
          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about bg_gray section" id="about" ref={about_ref}>
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              <span className="section-subtitle about__initial">
                Skill Centre
              </span>
              <h2 className="section-title about__initial">
                Our Skill Center offers
              </h2>
              <p className="about__description">
                tutorials, resources, and workshops, empowering creators with
                the tools to enhance content quality and engagement strategies.
                It's a leveling ground for creators, ensuring everyone has
                access to professional insights.
              </p>
              {/* <a href="#menu" class="button get-started bd_radius">Get Started</a> */}
            </div>
            <div className="about__img__section " style={{ width: 'calc(100%)' }}><Splide
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

                >
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Center for powerful content and engagement."} />
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with a global audience."} />
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Center for massive exposure."} />
                  <ImageCard img_width={'170px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} />

                </Grid>
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

            {/* <div className="about__img__section ">
              <img
                src="assets/people7.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
              />
              <img
                src="assets/mocks1.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
                style={{ display: "none" }}
              />
              <img
                src="assets/mocks2.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
                style={{ display: "none" }}
              />
              <img
                src="assets/mocks3.png"
                alt
                className="about__img home__img mySlides1 w3-animate-fading"
                style={{ display: "none" }}
              />
            </div> */}
            {/* <div class="home__img__container about__img">
              </div> */}
          </div>
        </section>
        {/*========== SERVICES ==========*/}
        <section className="services section" id="services" ref={services_ref}>
          <span className="section-subtitle">Incase Your Wondering</span>
          <h2 className="section-title">Why Choose Haulway?</h2>
          <CenteredTab
            children={[
              {
                label: "Vendors",
                child:
                  <div className="services section" style={{ paddingTop: '5px' }}>
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div className="services__content">
                        {/* <img src="assets/serv1.png" alt className="services__img" /> */}
                        <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                          <Stack
                            className="card services__img"
                            borderRadius='100%'
                            width={`70px`}
                            height={`70px`}
                            margin={1}
                            bgcolor={'rgba(0, 240, 77, 0.05)'}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={'8px'}
                          >
                            <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                          </Stack>
                        </Stack>

                        <i className="bx bxl-message" />
                        <h3 className="services__title">Direct Sales Platform</h3>
                        <p className="services__description">
                          Engage your audience directly and showcase products seamlessly within interactive content.
                        </p>
                      </div>
                      <div className="services__content">
                        {/* <img src="assets/serv2.png" alt className="services__img" /> */}
                        <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                          <Stack
                            className="card services__img"
                            borderRadius='100%'
                            width={`70px`}
                            height={`70px`}
                            margin={1}
                            bgcolor={'rgba(0, 240, 77, 0.05)'}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={'8px'}
                          >
                            <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                          </Stack>
                        </Stack>
                        <i className="bx bxl-message" />
                        <h3 className="services__title">
                          Fair Contracting
                        </h3>
                        <p className="services__description">
                          Ensure transparent collaborations by negotiating and establishing clear, fair affiliate marketing contracts on Haulway.
                        </p>
                      </div>
                      <div className="services__content">
                        {/* <img src="assets/serv3.png" alt className="services__img" /> */}
                        <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                          <Stack
                            className="card services__img"
                            borderRadius='100%'
                            width={`70px`}
                            height={`70px`}
                            margin={1}
                            bgcolor={'rgba(0, 240, 77, 0.05)'}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={'8px'}
                          >
                            <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                          </Stack>
                        </Stack>
                        <i className="bx bxl-message" />
                        <h3 className="services__title">Real-time Analytics</h3>
                        <p className="services__description">
                          Monitor your sales performance and track engagement metrics for informed decision-making.
                        </p>
                      </div>
                    </div>
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div className="about__data mt-5rem" style={{ width: 'calc(100% - 2rem)' }}>
                        {/* <span class="section-subtitle about__initial">About us</span> */}
                        {/* <h2 class="section-title about__initial">Join Our Influencer Program</h2> */}
                        <p className="about__description">
                          Boost your online sales with Haulway. Showcase products directly, engage in real-time, and track performance. We provide a space for transparent collaborations, ensuring fair contract negotiations. Increase visibility, sales, and operational efficiency with our user-friendly interface and real-time analytics.
                        </p>

                        <a href="#menu" className="button get-started bd_radius">
                          Join now
                        </a>
                      </div>

                      <div className="about__img__section " style={{ width: 'calc(100% - 2rem)' }}><Splide


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
                            margin={'10px 2px'}

                          >
                            <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Enhanced Visibility'} subtitle={'Reach a broader audience and elevate your brand visibility through targeted content.'} />
                            <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Increased Sales'} subtitle={'Engage potential customers directly, leading to higher conversion rates and increased sales.'} />
                            <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Transparent Partnerships:'} subtitle={'Build trust with creators through clear and fair contract negotiations.'} />
                            <ImageTile img_width={'320px'} img_height={'70px'} tran_color={'var(--container-color)'} title={'Efficient Management'} subtitle={'Streamline your operations with real-time analytics and performance insights.'} />

                          </Grid>
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
                    {/* <img
                        src="assets/people8.png"
                        alt
                        className=""
                      /> */}
                    {/* <div class="home__img__container about__img">
        </div> */}

                  </div>
              },
              {
                label: "Creators", child: <div className="services section" style={{ paddingTop: '5px' }}>
                  <div className="services__container  bd-grid bd-container gap-2rem">
                    <div className="services__content">
                      {/* <img src="assets/serv1.png" alt className="services__img" /> */}
                      <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                        <Stack
                          className="card services__img"
                          borderRadius='100%'
                          width={`70px`}
                          height={`70px`}
                          margin={1}
                          bgcolor={'rgba(0, 240, 77, 0.05)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                          padding={'8px'}
                        >
                          <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                        </Stack>
                      </Stack>

                      <i className="bx bxl-message" />
                      <h3 className="services__title">UGC Sales</h3>
                      <p className="services__description">
                        Monetize your creativity by selling custom User-Generated Content (UGC) directly to your engaged audience on Haulway.
                      </p>
                    </div>
                    <div className="services__content">
                      {/* <img src="assets/serv2.png" alt className="services__img" /> */}
                      <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                        <Stack
                          className="card services__img"
                          borderRadius='100%'
                          width={`70px`}
                          height={`70px`}
                          margin={1}
                          bgcolor={'rgba(0, 240, 77, 0.05)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                          padding={'8px'}
                        >
                          <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                        </Stack>
                      </Stack>
                      <i className="bx bxl-message" />
                      <h3 className="services__title">
                        Fair Compensation
                      </h3>
                      <p className="services__description">
                        Negotiate fair affiliate marketing contracts and ensure you receive fair compensation for your collaborations.
                      </p>
                    </div>
                    <div className="services__content">
                      {/* <img src="assets/serv3.png" alt className="services__img" /> */}
                      <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                        <Stack
                          className="card services__img"
                          borderRadius='100%'
                          width={`70px`}
                          height={`70px`}
                          margin={1}
                          bgcolor={'rgba(0, 240, 77, 0.05)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                          padding={'8px'}
                        >
                          <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                        </Stack>
                      </Stack>
                      <i className="bx bxl-message" />
                      <h3 className="services__title">Skill Center</h3>
                      <p className="services__description">
                        Access a robust Skill Center offering tutorials, resources, and workshops to enhance your content creation skills.
                      </p>
                    </div>
                  </div>
                  <div className="services__container  bd-grid bd-container gap-2rem">
                    <div className="about__data mt-5rem" style={{ width: 'calc(100% - 2rem)' }}>
                      {/* <span class="section-subtitle about__initial">About us</span> */}
                      {/* <h2 class="section-title about__initial">Join Our Influencer Program</h2> */}
                      <p className="about__description no__mb">
                        Monetize your skills and content effortlessly on Haulway. Sell your custom content, negotiate clear affiliate contracts, and access tutorials in our Skill Center. Join a community-driven platform fostering creative growth and transparent monetization. Showcase talents, connect with creators, and maximize your earning potential.
                      </p>

                      <a href="#menu" className="button get-started bd_radius">
                        Join now
                      </a>
                    </div>

                    <div className="about__img__section " style={{ width: 'calc(100% - 2rem)' }}><Splide


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
                  {/* <img
                  src="assets/people8.png"
                  alt
                  className=""
                /> */}
                  {/* <div class="home__img__container about__img">
  </div> */}

                </div>
              },
              {
                label: "Tutors", child: <div className="services section" style={{ paddingTop: '5px' }}>
                  <div className="services__container  bd-grid bd-container gap-2rem">
                    <div className="services__content">
                      {/* <img src="assets/serv1.png" alt className="services__img" /> */}
                      <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                        <Stack
                          className="card services__img"
                          borderRadius='100%'
                          width={`70px`}
                          height={`70px`}
                          margin={1}
                          bgcolor={'rgba(0, 240, 77, 0.05)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                          padding={'8px'}
                        >
                          <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                        </Stack>
                      </Stack>

                      <i className="bx bxl-message" />
                      <h3 className="services__title">Skill Center</h3>
                      <p className="services__description">
                        Offer tutorials, resources, and workshops, and monetize your expertise on Haulway.
                      </p>
                    </div>
                    <div className="services__content">
                      {/* <img src="assets/serv2.png" alt className="services__img" /> */}
                      <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                        <Stack
                          className="card services__img"
                          borderRadius='100%'
                          width={`70px`}
                          height={`70px`}
                          margin={1}
                          bgcolor={'rgba(0, 240, 77, 0.05)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                          padding={'8px'}
                        >
                          <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                        </Stack>
                      </Stack>
                      <i className="bx bxl-message" />
                      <h3 className="services__title">
                        Monetization
                      </h3>
                      <p className="services__description">
                        Earn as creators learn by offering valuable tutorials and resources to the community.
                      </p>
                    </div>
                    <div className="services__content">
                      {/* <img src="assets/serv3.png" alt className="services__img" /> */}
                      <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
                        <Stack
                          className="card services__img"
                          borderRadius='100%'
                          width={`70px`}
                          height={`70px`}
                          margin={1}
                          bgcolor={'rgba(0, 240, 77, 0.05)'}
                          justifyContent={"center"}
                          alignItems={"center"}
                          padding={'8px'}
                        >
                          <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />
                        </Stack>
                      </Stack>
                      <i className="bx bxl-message" />
                      <h3 className="services__title">Promotion Opportunities</h3>
                      <p className="services__description">
                        Promote your tutoring services on a growing platform with a diverse and engaged audience.
                      </p>
                    </div>
                  </div>
                  <div className="services__container  bd-grid bd-container gap-2rem">
                    <div className="about__data mt-5rem" style={{ width: 'calc(100% - 2rem)' }}>
                      {/* <span class="section-subtitle about__initial">About us</span> */}
                      {/* <h2 class="section-title about__initial">Join Our Influencer Program</h2> */}
                      <p className="about__description no__mb">
                      Monetize your expertise on Haulway. Deliver tutorials, resources, and workshops to a diverse community. Promote your tutoring services, engage with a growing audience, and turn your knowledge into a sustainable revenue stream. Connect with learners on a vibrant educational platform.
                      </p>
                      
                      <a href="#menu" className="button get-started bd_radius">
                        Join now
                      </a>
                    </div>

                    <div className="about__img__section " style={{ width: 'calc(100% - 2rem)' }}><Splide


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
                  {/* <img
                  src="assets/people8.png"
                  alt
                  className=""
                /> */}
                  {/* <div class="home__img__container about__img">
  </div> */}

                </div>
              }
            ]}
          />

        </section>

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
                className="button get-started"
                onClick={() => {
                  scrollTo(contact_us);
                }}
              >
                Join us Today
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
              {/* <p className="contact__description">
                {" "}
                As we grow, we'll introduce you to our team and invite you to
                join us on this exciting journey toward a brighter future. Are
                you ready to take the next step? Let's have a chat and explore
                the possibilities together.
              </p> */}
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
              <button type="button" className="button" onClick={handleSave}>
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
      <footer className="footer section bd-container">
        <div className="footer__container bd-grid">
          <div className="footer__content">
            <a href="#" className="footer__logo">
              Follow Us
            </a>
            {/* <span class="footer__description">Telecom</span>
              <span class="footer__description">Services</span> */}
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
          <div className="footer__content">
            <h3 className="footer__title">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="footer__link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__content">
            <h3 className="footer__title">Explore</h3>
            <ul>
              <li>
                <a href="#" className="footer__link">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__content">
            <h3 className="footer__title">Subscribe</h3>
            <div className="app__stores">
              <input
                type="email"
                id="email_input1"
                placeholder="Email Address"
                name="email"
                onChange={(e) => setEmail({ ...email, email: e.target.value })}
              />
              {/* <a href="#" class="button">Send</a> */}
            </div>
            <ul></ul>
          </div>
        </div>
        <p className="footer__copy">
          © 2023 Haulway Global. All right reserved
        </p>
      </footer>
      {/*========== SCROLL REVEAL ==========*/}
      {/*========== MAIN JS ==========*/}
      {/*========== MAIN JS ==========*/}
      {/*========== Typer JS ==========*/}
    </div>
  );
};

export default Landing;
