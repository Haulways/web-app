import React from 'react'
import './createAd.css';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import expandIcon from "../../assets/cart/expand.png";


const Categories = ({ setSelectedCategory, selectedCategory, theme }) => {
    

  const handleOptionClick = (option) => {
    if (selectedCategory.includes(option)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== option));
    } else {
      setSelectedCategory([...selectedCategory, option]);
    }

  };
    
  return (
    <>
      <div className='cat__container feed--page'>
        <Accordion className='cart--accordian before:h-0  mb-[10px]' sx={{ boxShadow: 'none', filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
          <AccordionSummary className='bg-[#D9D9D9] rounded-[10px]'
            expandIcon={<img className='h-[10px]' src={expandIcon} alt="expand" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className=''>
              <h2 className='cat__header'>Add category</h2>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            
            <div className='categories__contents' style={{filter: theme === "light" ? "invert(0)" : "invert(1)"}}>
              <span type="button" className={selectedCategory.includes('Featured') ? 'selected' : ''} onClick={() => handleOptionClick('Featured')} > Featured
              </span>

              <span type="button" className={selectedCategory.includes('Grwm') ? 'selected' : ''} onClick={() => handleOptionClick('Grwm')} > Grwm
              </span>
                
              <span type="button" className={selectedCategory.includes('Lookbook') ? 'selected' : ''} onClick={() => handleOptionClick('Lookbook')} >  Lookbook
              </span>

              <span type="button" className={selectedCategory.includes('Hauls') ? 'selected' : ''} onClick={() => handleOptionClick('Hauls')} > Hauls
              </span>

              <span type="button" className={selectedCategory.includes('DIY') ? 'selected' : ''} onClick={() => handleOptionClick('DIY')} > DIY
              </span>

              <span type="button" className={selectedCategory.includes('Beach') ? 'selected' : ''} onClick={() => handleOptionClick('Beach')} > Beach
              </span>
                
              <span type="button" className={selectedCategory.includes('Dinner') ? 'selected' : ''} onClick={() => handleOptionClick('Dinner')} >  Dinner
              </span>

              <span type="button" className={selectedCategory.includes('Office') ? 'selected' : ''} onClick={() => handleOptionClick('Office')} > Office
              </span>

              <span type="button" className={selectedCategory.includes('Pajamas') ? 'selected' : ''} onClick={() => handleOptionClick('Pajamas')} > Pajamas
              </span>
                
              <span type="button" className={selectedCategory.includes('Sport') ? 'selected' : ''} onClick={() => handleOptionClick('Sport')} >  Sport
              </span>

              <span type="button" className={selectedCategory.includes('Casual') ? 'selected' : ''} onClick={() => handleOptionClick('Casual')} > Casual
              </span>

              <span type="button" className={selectedCategory.includes('Jewelry') ? 'selected' : ''} onClick={() => handleOptionClick('Jewelry')} > Jewelry
              </span>

              <span type="button" className={selectedCategory.includes('cosmetics') ? 'selected' : ''} onClick={() => handleOptionClick('cosmetics')} > Cosmetics
              </span>

              <span type="button" className={selectedCategory.includes('fashion') ? 'selected' : ''} onClick={() => handleOptionClick('fashion')} > Fashion design
              </span>

              <span type="button" className={selectedCategory.includes('craft') ? 'selected' : ''} onClick={() => handleOptionClick('craft')} > Craft
              </span>

              <span type="button" className={selectedCategory.includes('makeup') ? 'selected' : ''} onClick={() => handleOptionClick('makeup')} > Makeup
              </span>
                
              {/* Add more buttons for additional options */}
            </div>
          </AccordionDetails>
        </Accordion>
        
      </div>
    </>
  )
};

export default Categories