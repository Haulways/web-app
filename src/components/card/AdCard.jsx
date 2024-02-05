import './card.css';
import vendorImg from '../../assets/Ads/vendorImg.png';

export const AdCard = () => {

    return (

        <>
            <div className='Ad--container'>
                <div className='Ad--contents'>
                    <h2>commercial</h2>
                    <h3>call for vendors</h3>
                    <button>register now</button>
                </div>
                <div className='Ad--image'>
                    <img src={vendorImg} alt='ads' />
                </div>
            </div>
        
        </>
    )
};