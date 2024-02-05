import * as React from 'react'
import './onboard.css'
import page1img from '../../assets/onboard/page1.webp';
import page2img from '../../assets/onboard/page2.webp';
import page3img from '../../assets/onboard/page3.webp';
import page4img from '../../assets/onboard/page4.webp';
import page5img from '../../assets/onboard/page5.webp';
import nextBtn from '../../assets/onboard/nextBtn.png';
import { useRedirect } from 'react-admin';



const OnboardScreen = () => {
    const redirect = useRedirect();
    const [activePage, setActivePage] = React.useState(0);
    const pages = [
        <Page1 />,
        <Page2 />,
        <Page3 />,
        <Page4 />,
        <Page5 />
    ];
    
    const handleNext = () => {
        if (activePage < pages.length - 1) {
            setActivePage(activePage + 1);
        }
    };
    
    const goToStart = () => {
        redirect('/login');
    }
    return (
        <div className="onboard--page">

            {pages.map((page, index) => (
                <div key={index} className={`page ${activePage === index ? "active" : ""}`}>
                    {page}
                </div>
            ))}


            {activePage < pages.length - 1 && (
                <div className="pagination">
                    {pages.map((page, index) => (
                        <div key={index} className={`dot ${activePage === index ? "active" : ""}`}></div>
                    ))}
                </div>
            )}


            <div>
                {activePage < pages.length - 1 ? (
                    <>
                        <button onClick={goToStart} className="skipButton">Skip</button>
                        <button onClick={handleNext} className="nextButton">
                            <img src={nextBtn} alt='next' />
                        </button>
                    </>
                ) : (
                        <div onClick={goToStart} className="startButton">
                            <button>Start</button>
                        </div>
                )}
            </div>



        </div>
    );
};

export default OnboardScreen

const Page1 = () => {
    return (
        <>
            <div className='onboard--content'>
                <img src={page1img} alt='onboardingImage' />
                <h1><span>Explore</span> Trendy Fashion</h1>

                <p>Explore the latest trends in the world of fashion you never have to miss a beat.</p>
            </div>
        </>
    );
};

const Page2 = () => {
    return (
        <>
            <div className='onboard--content'>
                <img src={page2img} alt='onboardingImage' />
                <h1><span>Select</span> Your Style</h1>

                <p>From our huge collection of Hauls, Lookbook, DIY and GRWM, you can choose the best for you.</p>
            </div>
        </>
    );
};

const Page3 = () => {
    return (
        <>
            <div className='onboard--content'>
                <img src={page3img} alt='onboardingImage' />
                <h1><span>Select</span> Your Style</h1>

                <p>From our huge collection of Hauls, Lookbook, DIY and GRWM, you can choose the best for you.</p>
            </div>
        </>
    );
};

const Page4 = () => {
    return (
        <>
            <div className='onboard--content'>
                <img src={page4img} alt='onboardingImage' />
                <h1><span>Select</span> Your Style</h1>

                <p>From our huge collection of Hauls, Lookbook, DIY and GRWM, you can choose the best for you.</p>
            </div>
        </>
    );
};

const Page5 = () => {
    return (
        <>
            <div className='onboard--content'>
                <img src={page5img} alt='onboardingImage' />
                <h1><span>Select</span> Your Style</h1>

                <p>From our huge collection of Hauls, Lookbook, DIY and GRWM, you can choose the best for you.</p>
            </div>
        </>
    );
};