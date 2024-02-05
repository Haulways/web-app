import { useContext, useEffect, useRef, useState } from 'react';
import { transImg1, transImg2, transImg3, transImg4, transImg5, transImg6 } from '../../assets';
import {  gsap, Power3 } from 'gsap';
import AnimationContext from '../animateContext/AnimationContext'
import {Splide, SplideSlide}from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './slider.css'
import Header from '../header/Header';
import slide1 from "../../assets/transitionImages/slide1.webp";
import slide2 from "../../assets/transitionImages/slide2.webp";
import slide3 from "../../assets/transitionImages/slide3.webp";

// SLIDER SETUP 
const slider = [
  {
    heading: "HAULWAY",
    image: slide1
  },
  {
    heading: "HAULWAY",
    image: slide2
  },
  {
    heading: "HAULWAY",
    image: slide3
  },
]

const Slider = () => {

    // THE CODE LOGIC FOR THE ANIMATED PART STARTS HERE
  const { isAnimationActive, activateAnimation } = useContext(AnimationContext);
  

  let bodyRef = useRef(null);
  let img1 = useRef(null);
  let img4 = useRef(null);
  let img3 = useRef(null);
  let img2 = useRef(null);
  let img7 = useRef(null);
  let img6 = useRef(null);
  let img8 = useRef(null);
  let img5 = useRef(null);
  let btn = useRef(null);
  let haulText = useRef(null);

  useEffect(() => {
    if (isAnimationActive) {
      handleAnimation();
    }
  }, [isAnimationActive]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  // THE CODE LOGIC FOR THE SLIDER PART STARTS HERE

  useEffect(() => {
    if (isButtonClicked) {
      setTimeout(() => {
        setIsSliderVisible(true);
      }, 1800);
    }
  }, [isButtonClicked]);

  const splideOptions = {
    type: 'loop', autoplay: true, pauseOnHover: false, arrows: false, pagination: false, ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)', speed: 800
  };
  // THE CODE LOGIC FOR THE SLIDER PART ENDS HERE

  const handleAnimation = () => {
    setIsButtonClicked(true);
    const image1 = img1.current;
    const image4 = img4.current;
    const image3 = img3.current;
    const image2 = img2.current;
    const image7 = img7.current;
    const image6 = img6.current;
    const image8 = img8.current;
    const image5 = img5.current;
    const btn1 = btn.current;
    const haulway = haulText.current;
    const mainBody = bodyRef.current;
    
    //  second__body animation 
     
    
     //  main__body animation 
     gsap.to([haulway, btn1], 
      {  opacity: 0, duration: 1, delay: .8, ease: 'power1.inOut' })
    
      gsap.to(mainBody, 
        {  visibility: 'hidden', duration: 1, delay: 2, ease:Power3.easeOut })
    
    
    // for the last image sliding top mid air
    gsap.to(image8,
      { y: 100, visibility: 'visible', duration: 1.3, delay: 1, ease: 'power1.out' })
    
    // for the first image sliding top mid air
    gsap.to(image5,
      { y: 100, opacity: 0,  duration: 1.3, delay: 1, ease: 'power1.out' })
    
    // for the first image sliding down right to bottom
    gsap.to(image1, 
      { y: 600, opacity: 0, rotation: (-45), x: 200, duration: 1.3, delay: 1, ease: 'power1.inOut' })
    
    // for the seventh image sliding down left to bottom
    gsap.to(image7, 
      { y: 600, opacity: 0, rotation: (-45), x: -400, duration: 1.3, delay: 1, ease: 'power1.inOut' })
    
    // for the second image sliding down the middle
    gsap.to(image2, 
      { y: 500, x: -100, opacity: 0, rotation: (60),  duration: 1.3, delay: 1, ease: 'power1.inOut' })
    
    // for the three image sliding towards the left half
    gsap.to(image3, 
      { x: -350, y: 300, opacity: 0, rotation: (-45),  duration: 2, delay: 1, ease: 'power1.inOut' })
    
    // for the forth image sliding towards the right half
    gsap.to(image4, 
      { y: 300, opacity: 0, rotation: (40), x: 350, duration: 2, delay: 1, ease: 'power1.inOut' })
    
     // for the sixth image sliding towards the right half
     gsap.to(image6, 
       { y: 300, opacity: 0, rotation: (40), x: 350, duration: 1.2, delay: 1.2, ease: 'power1.inOut' })
    
  // THE CODE LOGIC FOR THE ANIMATED PART ENDS HERE



  }

  return (
    <>
    <Header />
       {/* Animation code starts here  */}
  
        <div ref={bodyRef} className='animation'>
          <div className='animation__imgs'>
            
            <img ref={img1} className='animateImg1' src={transImg1} alt='animation' />
            <img ref={img2} className='animateImg2' src={transImg2} alt='animation' />
            <img ref={img3} className='animateImg3' src={transImg3} alt='animation' />
            <img ref={img7} className='animateImg3' src={transImg3} alt='animation' />
            <img ref={img4} className='animateImg4' src={transImg4} alt='animation' />
            <img ref={img6} className='animateImg5' src={transImg5} alt='animation' />
            <img ref={img5} className='animateImg6' src={transImg6} alt='animation' />
          </div>
          
          {/* get started button and stroked text  */}
          <div className='text__part'>
               <p ref={haulText} className='stroked__text'>HAULWAY</p>
            <button ref={btn} onClick={activateAnimation}>Get Started</button>
          </div> 
        
      </div>
      {/* Animation code ends here  */}

      {/* SLIDER ANIMATION CODE STARTS HERE  */}

        {isButtonClicked && isSliderVisible && (
          <div className="slider__container">
            <Splide options={splideOptions} className='slider__box slider1'>
              <SplideSlide className='slide__contents'>
                <div className=' slide'>
                  <ul className='slide__text'>
                    <li>{slider[0].heading}</li>
                    <li>{slider[0].heading}</li>
                    <li>{slider[0].heading}</li>
                  </ul>
                  <img src={slider[0].image} alt={slider[0].heading} />
                </div>
              </SplideSlide>

              <SplideSlide className='slide__contents slider2'>
                <div className=' slide'>
                  <ul className='slide__text'>
                    <li>{slider[0].heading}</li>
                    <li>{slider[0].heading}</li>
                    <li>{slider[0].heading}</li>
                  </ul>
                  <img src={slider[1].image} alt={slider[0].heading} />
                </div>
              </SplideSlide>

              <SplideSlide className='slide__contents slider3'>
                <div className=' slide'>
                  <ul className='slide__text'>
                    <li>{slider[0].heading}</li>
                    <li>{slider[0].heading}</li>
                    <li>{slider[0].heading}</li>
                  </ul>
                  <img src={slider[2].image} alt={slider[0].heading} />
                </div>
              </SplideSlide>
            </Splide>

          </div>
        )}

        {/* SLIDER ANIMATION CODE ENDS HERE  */} 
    </>
  )
}

export default Slider