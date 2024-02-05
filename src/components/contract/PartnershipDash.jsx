import React, { useEffect, useState } from 'react';
import './contract.css';
import backIcon from "../../assets/hauls/backIcon.png";
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DFooter from '../dashboard/footer/DFooter';
import { useRecordContext, useRedirect } from 'react-admin';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../../supabase/SupabaseConfig';
import { toast } from 'react-toastify';
import { Tags, VideoTags } from '../productTag/AddTag';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../context/ThemeProvider';




// ReadMore Fn
const ReadMore = ({ children, maxCharCnt = 200 }) => {
    const text = children;
    const [isTruncated, setIsTruncated] = useState(true);
  
    const resultString = isTruncated ? text.slice(0, maxCharCnt) : text;
  
    function toggleIsTruncated() {
      setIsTruncated(!isTruncated);
    }
  
    return (
      <p>
        {resultString}
        <span onClick={toggleIsTruncated} style={{color: '#c9c9c9', cursor: 'pointer'}}>
          {isTruncated ? '... Read more' : ' show less'}
        </span>
      </p>
    );
  };

//   Accordion
const Accordion = ({ options, handleSelect, selectedOption, currentUser, record}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    const handleOptionSelect = (option) => {
        handleSelect(option);
    };
  
    return (
        <div className="accordion" onClick={() => setIsOpen(!isOpen)}>
            <div className={`selected-option ${isOpen ? 'option-open' : ''}`} style={{backgroundColor: theme === 'light' ? '#d9d9d9' : 'rgba(68, 68, 68, 0.2)'}} >

                {currentUser ?
                    (currentUser.role === 'influencer' ?
                        (options.includes(record.influencer_unit) ? record.influencer_unit : options.includes(record.influencer_time_frame) ? record.influencer_time_frame : selectedOption)
                        :
                        currentUser.role === 'vendor' ?
                            (options.includes(record.vendor_unit) ? record.vendor_unit : options.includes(record.vendor_time_frame) ? record.vendor_time_frame : selectedOption) : selectedOption)
                    : selectedOption}
                

                {currentUser && (
                    currentUser.role === 'vendor' ? (
                        <span className='text-[10px] font-[600] ml-[.5rem]'>
                            (Vendor's choice)
                        </span>
                    ) : currentUser.role === 'influencer' && (
                        <span className='text-[10px] font-[600] ml-[.5rem]'>
                            (Influencer's choice)
                        </span>
                    ) 
                )}
                
                <span className={`icon ${isOpen ? 'open' : ''}`}>
                    <ExpandMoreIcon />
                </span>
            </div>
            <div className={`options--container ${isOpen ? '' : 'p-0 h-0'}`}>
                {isOpen && options.map((option, index) => {
                    const isChecked = selectedOption === option;
                    return (
                        <div key={index} className={`option ${isChecked ? 'selected' : ''}`}>
                            <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={() => record.agreed_at === null && handleOptionSelect(option)}>
                                {isChecked && <span>✓</span>}
                            </div>
                            <label>
                                {option}
                                {currentUser && (
                                    (currentUser.role === 'vendor' && (option === record.influencer_time_frame || option === record.influencer_unit)) ? (
                                        <span className='text-[10px] font-[600] ml-[.5rem]'>
                                            (Influencer's choice)
                                        </span>
                                    ) : (currentUser.role === 'influencer' && (option === record.vendor_unit || option === record.vendor_time_frame)) && (
                                        <span className='text-[10px] font-[600] ml-[.5rem]'>
                                            (Vendor's choice)
                                        </span>
                                    )
                                )}
                            </label>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};
  

// Partnership docs 
export const Partnership = () => {
    const { currentUser } = useContext(AuthContext);
    const record = useRecordContext();
    const [currentTab, setCurrentTab] = useState(0);
    const [isCheckedList, setIsCheckedList] = useState(Array(5).fill(false));
    const [selectedUnit, setSelectedUnit] = useState('20 Units');
    const [selectedDay, setSelectedDay] = useState('7 days');
    const [values, setValues] = useState({
        vendor_name: record?.vendor_name,
        address: record?.vendor_address,
        email: record?.vendor_email,
        phone: record?.vendor_phone,
    });
    const [values1, setValues1] = useState({
        influencer_name: record?.influencer_name,
        address: record?.influencer_address,
        email: record?.influencer_email,
        phone: record?.influencer_phone,
    });
    const redirect = useRedirect();
    const [taggedData, setTaggedData] = useState([]);
    const [taggedDataVideo, setTaggedDataVideo] = useState([]);
    const [tags, setTags] = React.useState(false);
    const [vtags, setVtags] = React.useState(false);
    const { theme } = useContext(ThemeContext);


    const openTags = () => {
        setTags(true);
    }

    const handleCloseTags = () => {
        setTags(false);
    }

    const openvTags = () => {
        setVtags(true);
    }

    const handleCloseVTags = () => {
        setVtags(false);
    }
    

    const handleChangeVendor = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleChangeInfluencer = (name) => (event) => {
        setValues1({ ...values1, [name]: event.target.value });
    };

    const checkIfAgreed = async () => {
        // First, retrieve the current record
        const { data: currentData, error: currentError } = await supabase
            .from('contract')
            .select('agreed_at')
            .eq('id', record.id);
    
        // If there's no error and agreed_at is not set
        if (currentData && !currentData[0].agreed_at) {
            // Check if vendor_unit equals influencer_unit and vendor_time_frame equals influencer_time_frame
            if (record && record.vendor_unit === record.influencer_unit && record.vendor_time_frame === record.influencer_time_frame && record.products !== null && (record.influencer_time_frame && record.vendor_time_frame !== null) && (record.record.influencer_unit && record.vendor_unit !== null) ) {
                // If they are equal, update agreed_at
                const { data, error } = await supabase
                    .from('contract')
                    .update({ agreed_at: new Date() })
                    .eq('id', record.id);
            } else {
                const { data, error } = await supabase
                    .from('contract')
                    .update({ agreed_at: null })
                    .eq('id', record.id);
            }
        }
    };
    

    useEffect(() => {
        checkIfAgreed();
    }, [currentUser, record]);

    const handleSaveForm = async () => {
        if (currentUser && currentUser.role === 'vendor') {
            const { data, error } = await supabase
                .from('contract')
                .update({
                    vendor_name: values.vendor_name,
                    vendor_address: values.address,
                    vendor_email: values.email,
                    vendor_phone: values.phone,
                    vendor_time_frame: selectedDay,
                    vendor_unit: selectedUnit,
                    vendor_last_updated: new Date(),
                    agreed_at: (record && (record.vendor_unit === record.influencer_unit && record.vendor_time_frame === record.influencer_time_frame) ? (new Date()) : null),
                    products: [taggedData]
                })
                .eq('id', record.id);
    
            if (error) {
                console.error('Error updating contract:', error);
            } else {
                console.log('Contract updated:', data);
            
            }
        } else if (currentUser && currentUser.role === 'influencer') {
            const { data, error } = await supabase
                .from('contract')
                .update({
                    influencer_name: values1.influencer_name,
                    influencer_address: values1.address,
                    influencer_email: values1.email,
                    influencer_phone: values1.phone,
                    influencer_time_frame: selectedDay,
                    influencer_unit: selectedUnit,
                    influencer_last_updated: new Date(),
                    agreed_at: (record && (record.vendor_unit === record.influencer_unit && record.vendor_time_frame === record.influencer_time_frame) ? (new Date()) : null),
                    videos: [taggedDataVideo]
                })
                .eq('id', record.id);
    
            if (error) {
                console.error('Error updating contract:', error);
            } else {
                console.log('Contract updated:', data);
            }
        }
    };

    console.log(record);


    

    const goToProfile = () => (
        redirect(`/contract`)
    )
    // console.log(selectedUnit, selectedDay);


    const handleSend = () => {
        if (currentTab === tabs.length - 1 && isCheckedList[currentTab]) {
            toast.success("Information sent")
            redirect(`/users/${currentUser?.id}/show`)
        }
    };

    
    const handleCheckboxChange = (index, value) => {
        const newIsCheckedList = [...isCheckedList];
        newIsCheckedList[index] = value;
        setIsCheckedList(newIsCheckedList);
    };

    const handleNextClick = () => {
        if (currentTab < tabs.length - 1 && isCheckedList[currentTab]) {
            setCurrentTab(currentTab + 1);
        } if (currentTab === tabs.length - 1 && isCheckedList[currentTab]) {
            handleSend();
            handleSaveForm();
        }
    };

    const handlePrevClick = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };
    
    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
    };

    const handleDaySelect = (day) => {
        setSelectedDay(day);
    };
  
    const tabs = [
        <Terms isChecked={isCheckedList[0]} setIsChecked={(value) => handleCheckboxChange(0, value)} values={values} handleChangeVendor={handleChangeVendor} handleChangeInfluencer={handleChangeInfluencer} values1={values1} currentUser={currentUser} record={record} theme={theme} />,

        <ProductTab isChecked={isCheckedList[1]} setIsChecked={(value) => handleCheckboxChange(1, value)} openTags={openTags} openvTags={openvTags} taggedData={taggedData} taggedDataVideo={taggedDataVideo} currentUser={currentUser} record={record} />,

        <ProductUnit isChecked={isCheckedList[2]} setIsChecked={(value) => handleCheckboxChange(2, value)} handleUnitSelect={handleUnitSelect} taggedDataVideo={taggedDataVideo} selectedUnit={selectedUnit} currentUser={currentUser} record={record} taggedData={taggedData}  />,

        <TimeFrame isChecked={isCheckedList[3]} setIsChecked={(value) => handleCheckboxChange(3, value)} selectedDay={selectedDay} handleDaySelect={handleDaySelect} selectedUnit={selectedUnit} handleUnitSelect={handleUnitSelect} currentUser={currentUser}  record={record} taggedDataVideo={taggedDataVideo} taggedData={taggedData} />,

        <Termination isChecked={isCheckedList[4]} setIsChecked={(value) => handleCheckboxChange(4, value)} />
    ];


    return (
        <>
            <div className="contract--container feed--page">
                <IconButton
                    onClick={goToProfile}
                    aria-label="close"
                    className='absolute top-[70px] left-[.5rem]'
                    sx={{
                        position: 'absolute',
   
                    }}
                >
                    <img className='w-[10.63px] h-[15.34px] invert' style={{ filter: theme === "light" ? "invert(1)" : "invert(0)" }} src={backIcon} alt='back' />
                </IconButton>
                <h1>Contract Agreement</h1>
                <div className="progress--container">
                    {tabs.map((tab, index) => (
                        <React.Fragment key={index}>
                            <div className={`progress-step ${index <= currentTab ? 'active' : ''}`}>
                                <div className={`inner--progress-step ${index <= currentTab ? 'active' : 'progress-step'}`}>
                                    {index + 1}
                                </div>
                            </div>
                            {index < tabs.length - 1 && <div className="progress-line" />}
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    {tabs[currentTab]}
                </div>

                <div className='contract--agree--btns'>
                    {currentTab > 0 && <button className=' font-[600] text-[13px]' onClick={handlePrevClick}>Back</button>}
                    {(record.agreed_at === null || currentTab !== tabs.length - 1) && (
                        <button className={`ml-auto bg-[#222222] text-white px-[.8rem] py-[.5rem] rounded-[5px] font-[600] text-[12px] ${!isCheckedList[currentTab] ? 'opacity-50' : ''}`} onClick={handleNextClick} disabled={!isCheckedList[currentTab]} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                            {currentTab === tabs.length - 1 ? 'Send' : 'Agree & continue'}
                        </button>
                    )}
                </div>


            </div>

            <div>
                <DFooter />
            </div>

            <Tags
                tags={tags}
                handleCloseTags={handleCloseTags}
                taggedData={taggedData}
                setTaggedData={setTaggedData}
            />

            <VideoTags
                vtags={vtags}
                handleCloseVTags={handleCloseVTags}
                taggedDataVideo={taggedDataVideo}
                setTaggedDataVideo={setTaggedDataVideo}
            />
        </>
    );
};

// Terms 
const Terms = ({isChecked, setIsChecked, values, handleChangeVendor, handleChangeInfluencer, values1, currentUser, record, theme}) => {
    

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div className='terms--container'>
                <h2>Terms of agreement</h2>
                <p className='text-[12px] font-[400]  w-[65%]'>By clicking on agree, we believe you have gone through the terms of agreement.</p>

                <div className='terms--docs'>
                    <p>
                        <b>*Disclaimer*:</b> This contract represents the agreement facilitated by Haulway (hereinafter referred to as "Company") between the verified influencer, [Influencer's Name], and the registered vendor, [Vendor's Name]. It outlines the terms, responsibilities, and obligations of all parties involved. By accepting this contract, all parties acknowledge and agree to adhere to the following terms and conditions. This contract is governed by the jurisdiction of [Jurisdiction], and any disputes will be resolved in accordance with local laws.

                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Influencer-Vendor Collaboration Agreement</h3>
                    <p>
                        This Influencer-Vendor Collaboration Agreement (the "Agreement") is entered into on {record.agreed_at !== null ? (new Date(record.agreed_at).toLocaleString()) : '[Date]'}  (the "Effective Date") between:
                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Vendor</h3>
                    
                    <p>
                        Name of Vendor: <input type="text" placeholder="e.g Tonia Mendie - @Tmendie" className='w-[70%] mb-[1px]' value={values.vendor_name} onChange={handleChangeVendor('vendor_name')} disabled style={currentUser && currentUser.role !== 'vendor' ? { backgroundColor: theme === 'light' ? '#fff' : '#222' } : {backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                        <br />
                        Address: <input type="text" placeholder="e.g 12, Tosin Street, Ikeja, Lagos State" className='w-[50%] pl-[4px] mb-[1px]' value={values.address} onChange={handleChangeVendor('address')} disabled={currentUser && currentUser.role !== 'vendor' || (currentUser.role === 'vendor' && record.agreed_at !== null) } style={currentUser && currentUser.role !== 'vendor' || (currentUser.role === 'vendor' && record.agreed_at !== null) ? { backgroundColor: theme === 'light' ? '#fff' : '#222' } : {outline: theme === 'light' ? '#222 1px solid' : '#fff 1px solid', borderRadius: '3px', backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                        <br />
                        Email: <input type="text" placeholder="e.g toniamendie@gmail.com" className='w-[70%] mb-[1px]' value={values.email} onChange={handleChangeVendor('email')} disabled style={currentUser && currentUser.role !== 'vendor' ? { backgroundColor: theme === 'light' ? '#fff' : '#222' } : {backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                        <br />
                        Phone: <input type="text" placeholder="e.g +234 456 789 1011" className='w-[50%] pl-[4px] mb-[1px]' value={values.phone} onChange={handleChangeVendor('phone')} disabled={currentUser && currentUser.role !== 'vendor' || (currentUser.role === 'vendor' && record.agreed_at !== null)} style={currentUser && currentUser.role !== 'vendor' || (currentUser.role === 'vendor' && record.agreed_at !== null) ? {backgroundColor: theme === 'light' ? '#fff' : '#222'} : {outline: theme === 'light' ? '#222 1px solid' : '#fff 1px solid', borderRadius: '3px', backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                    </p>
                    

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Influencer</h3>
                    <p>
                        Name of Influencer: <input type="text" placeholder="e.g Tonia Mendie - @Tmendie" className='w-[60%] mb-[1px]' value={values1.influencer_name} onChange={handleChangeInfluencer('influencer_name')} disabled style={currentUser && currentUser.role !== 'influencer' ? { backgroundColor: theme === 'light' ? '#fff' : '#222' } : {backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                        <br />
                        Address: <input type="text" placeholder="e.g 12, Tosin Street, Ikeja, Lagos State" className='w-[50%] pl-[4px] mb-[1px]' value={values1.address} onChange={handleChangeInfluencer('address')} disabled={currentUser && currentUser.role !== 'influencer' || (currentUser.role === 'influencer' && record.agreed_at !== null)} style={currentUser && currentUser.role !== 'influencer' || (currentUser.role === 'influencer' && record.agreed_at !== null) ? { backgroundColor: theme === 'light' ? '#fff' : '#222' } : {outline: theme === 'light' ? '#222 1px solid' : '#fff 1px solid', borderRadius: '3px', backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                        <br />
                        Email: <input type="text" placeholder="e.g toniamendie@gmail.com" className='w-[70%] mb-[1px]' value={values1.email} onChange={handleChangeInfluencer('email')} disabled style={currentUser && currentUser.role !== 'influencer' ? { backgroundColor: theme === 'light' ? '#fff' : '#222' } : {backgroundColor: theme === 'light' ? '#fff' : '#222'}} />
                        <br />
                        Phone: <input type="text" placeholder="e.g +234 456 789 1011" className='w-[50%] pl-[4px] mb-[1px]' value={values1.phone} onChange={handleChangeInfluencer('phone')} disabled={currentUser && currentUser.role !== 'influencer' || (currentUser.role === 'influencer' && record.agreed_at !== null)} style={currentUser && currentUser.role !== 'influencer' || (currentUser.role === 'influencer' && record.agreed_at !== null) ? {backgroundColor: theme === 'light' ? '#fff' : '#222' } : {borderRadius: '3px', backgroundColor: theme === 'light' ? '#fff' : '#222', outline: theme === 'light' ? '#222 1px solid' : '#fff 1px solid'}} />
                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Purpose of Agreement:
                    </h3>
                    <p>
                        This Agreement represents the mutually agreed-upon terms that define the working relationship between the Vendor and the Influencer. It sets out the respective rights and responsibilities of both parties. By signing this Agreement, all parties consent to be bound by these terms throughout their entire collaboration.
                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Warranty:
                    </h3>
                    <p>
                        The parties to this Agreement jointly represent and warrant the following:
                        Legal Capacity: Each party affirms and warrants that they possess the legal capacity, authority, and competence to enter into and perform this Agreement in accordance with applicable laws and regulations. By entering into this Agreement, each party acknowledges their legal competence to be a party to this contractual relationship.
                        Good Faith Negotiation: Both parties commit to engage in all negotiations and discussions related to the terms and conditions of this Agreement in good faith. This commitment includes but is not limited to negotiations concerning compensation, scope of work, and any other relevant provisions. The parties pledge to approach these negotiations with honesty, integrity, and a sincere intention to reach mutually beneficial terms.
                        Parties commit to upholding high ethical standards and maintaining the integrity of the partnership.

                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Commencement:
                    </h3>
                    <p>
                        The contractual obligations between the parties shall commence when the vendor has successfully delivered the sample product to the influencer for inclusion in the content for which the vendor is engaging the influencer. The vendor is responsible for ensuring that the sample product reaches the influencer, and obligations shall only commence when the influencer confirms receipt of the said product.
                        In the event that the influencer does not require a sample product for the content, contractual obligations should commence on the effective date of this Agreement.

                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Compensation:
                    </h3>
                    <p>
                        In consideration for the services provided by the Influencer, the Vendor agrees to compensate the Influencer based on the predetermined percentage of the target units to be sold within the specified timeframe (referred to as "Commission"). The Influencer will become eligible to receive Commission only upon the successful achievement of the agreed-upon sales target within the stipulated timeframe.
                        In instances where the Influencer does not meet the mutually agreed sales target, their compensation shall be limited to a base fee per unit sold. The specific base fee per unit sold will be determined based on the Influencer's tier status at the time of entering into this Agreement.

                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Governing Law and Jurisdiction
                    </h3>
                    <p>
                        Option 1: This Agreement shall be governed by and construed in accordance with the local laws of each party's respective jurisdiction (referred to as the "Local Laws"). Any disputes arising from or relating to this Agreement shall first be diligently and in good faith resolved amicably between the parties. In the event that the parties are unable to reach an amicable resolution, both parties agree to designate Haulway as an impartial intermediary to facilitate resolution.


                    </p>

                    <p>
                        Option 2: This Agreement shall be governed by and interpreted in accordance with the laws of the jurisdiction where the Vendor is registered. Unless mutually agreed upon by the Parties, any disputes arising from or related to this Agreement shall, initially, be diligently and in good faith resolved amicably between the parties. In the event that the parties are unable to reach an amicable resolution, both parties agree that Haulway shall serve as an impartial intermediary to facilitate the resolution process.


                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Amendments:
                    </h3>
                    <p>
                        This Agreement may only be amended through written agreement by both Parties.

                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Confidentiality:
                    </h3>
                    <p>
                        Both parties agree to keep all non-public information and discussions confidential unless otherwise agreed upon in writing. This includes any proprietary information, strategies, or trade secrets shared during the collaboration.

                    </p>

                    <h3 className='text-[14px] font-[600]  mb-[-.8rem] mt-[15px]'>Disclaimer:
                    </h3>
                    <p>
                        Haulway unequivocally states that it is not a party to this Agreement. Consequently, Haulway shall bear no responsibility or liability, under any circumstances, for any direct, indirect, special, or consequential damages, including, but not limited to, financial losses, arising from the failure of performance or fulfillment of the terms of this Agreement. Haulway operates solely as an independent platform, providing a means for parties to connect and transact according to their own discretion and mutually agreed terms. Haulway's role is limited to facilitating interactions between these parties and does not extend to becoming a participant or assuming any obligations under this Agreement.

                    </p>

                    <div className='check--container'>
                        <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
                            {isChecked && <span>&#10003;</span>}
                        </div>
                        <label>"By clicking 'I agree to the terms and conditions,' you are acknowledging and accepting the rules, regulations, and guidelines outlined in the terms and conditions document. This document typically contains the legal and operational framework that governs your interaction with a particular service, product, or platform. It outlines your rights, responsibilities, and the provider's policies, ensuring transparency and clarity in the use of their offerings. </label>
                    </div>

                </div>
            </div>
        </>
    );
};


// Products Tab
const ProductTab = ({ isChecked, setIsChecked, openTags, taggedData, currentUser, record, openvTags, taggedDataVideo }) => {

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const playButton = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12" fill="none">
            <path d="M3.85716 8.99977C3.7435 8.99977 3.63449 8.95462 3.55411 8.87425C3.47374 8.79387 3.42859 8.68486 3.42859 8.5712V3.42834C3.42863 3.35532 3.44733 3.28351 3.48291 3.21974C3.51849 3.15598 3.56978 3.10236 3.6319 3.06397C3.69403 3.02559 3.76493 3.00372 3.83788 3.00043C3.91083 2.99715 3.98341 3.01256 4.04873 3.0452L9.19159 5.61663C9.26268 5.65226 9.32246 5.70697 9.36423 5.77463C9.40601 5.8423 9.42813 5.92025 9.42813 5.99977C9.42813 6.07929 9.40601 6.15725 9.36423 6.22491C9.32246 6.29258 9.26268 6.34728 9.19159 6.38291L4.04873 8.95434C3.98926 8.98413 3.92368 8.99968 3.85716 8.99977ZM4.28573 4.12177V7.87777L8.04173 5.99977L4.28573 4.12177Z" fill="white" />
            <path d="M6 0.857143C7.01716 0.857143 8.01148 1.15877 8.85722 1.72387C9.70296 2.28897 10.3621 3.09218 10.7514 4.03191C11.1406 4.97165 11.2425 6.0057 11.044 7.00332C10.8456 8.00094 10.3558 8.91731 9.63655 9.63655C8.91731 10.3558 8.00094 10.8456 7.00332 11.044C6.00571 11.2425 4.97165 11.1406 4.03192 10.7514C3.09218 10.3621 2.28898 9.70296 1.72387 8.85722C1.15877 8.01148 0.857145 7.01716 0.857145 6C0.857145 4.63603 1.39898 3.32792 2.36345 2.36345C3.32793 1.39898 4.63603 0.857143 6 0.857143ZM6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0Z" fill="white" />
        </svg>
    );

    return (
        <>
            <div className='terms--container store__card'>
                <h2>Product</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section specifies the products involved in this agreement, as selected by the registered vendor. It provides detailed information about the product, including its category or class, and pricing. All parties must agree on the product details before proceeding.</p>

                <div className='product--images store__card'>
                    {currentUser.role === 'vendor' && record.agreed_at === null && (
                        <div className="flex items-center justify-center h-[70px] min-w-[70px] add_btn_border cursor-pointer" onClick={openTags}>

                            <AddIcon />
                        </div>
                    )}

                    {record && record.products[0] && record.products[0].length && record.products[0].length > 0 ? (
                        <>
                            {Array.isArray(record?.products[0]) && record.products[0].map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img src={product.images[0].url} alt={product.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : taggedData && taggedData.length > 0 ? (
                        <>
                            {taggedData && taggedData.map((product, index) => {
                                return (
                                    <div className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img key={index} src={product.images[0].url} alt={product.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <p className='text-[12px]  font-[500]'>No product selected by the vendor</p>
                    )}
                    
                   
                </div>

                <h2 className="mt-[30px]">Video type</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section specifies the videos involved in this agreement, as selected by the registered influencer. It provides detailed information about the video, including its category or class, and pricing. All parties must agree on the product details before proceeding.</p>

                <div className='product--images store__card'>
                    {currentUser.role === 'influencer' && record.agreed_at === null && (
                        <div className="flex items-center justify-center h-[70px] min-w-[70px] add_btn_border cursor-pointer" onClick={openvTags}>

                            <AddIcon />
                        </div>
                    )}

                    {record && record?.videos[0] && record?.videos[0]?.length && record?.videos[0]?.length > 0 ? (
                        <>
                            {Array.isArray(record?.videos[0]) && record?.videos[0]?.map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img src={product?.images[0]?.url} alt={product?.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : taggedDataVideo && taggedDataVideo.length > 0 ? (
                        <>
                            {taggedDataVideo && taggedDataVideo.map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px] relative">
                                        
                                        <div className='absolute w-full h-full top-0 bottom-0 right-0 left-0  backdrop-blur-[1px] z-[40] mx-auto my-auto' style={{ background: 'rgba(0, 0, 0, 0.50)' }} />
                                        <video className='w-full h-full object-cover' src={product.media[0]} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
                                        <div className='absolute w-[30px] h-[30px] top-0 bottom-0 right-0 left-0 mx-auto my-auto z-[50]'>{playButton}</div>
   
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <p className='text-[12px]   font-[500]'>No video selected</p>
                    )}
                    
                   
                </div>

                <div className='terms--docs'>
                    <p>
                        The Influencer agrees to create and post content, including photos, videos, and captions, related to the products and/or services offered by the Vendor. This content shall be comprehensive, ensuring it includes not only visually appealing and engaging elements but also a meticulous description of the Vendor's products and/or services.
                    </p>

                    <p>
                        The Influencer shall diligently incorporate all relevant information and details provided by the Vendor, guaranteeing that the content effectively captures the essence, features, and unique selling points of the products and/or services. This encompasses any specifications, benefits, or additional context that the Vendor deems essential for a thorough presentation.

                    </p>
                </div>

                <div className='check--container'>
                    <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
                        {isChecked && <span>&#10003;</span>}
                    </div>
                    <label>"By clicking 'Parties confirm that they have read and understood the terms outlined in this section and are happy to proceed to the subsequent sections of this agreement. “ </label>
                </div>
            </div>
        </>
    );
};

// Product units
const ProductUnit = ({ isChecked, setIsChecked, handleUnitSelect, selectedUnit, currentUser, record, taggedData, taggedDataVideo }) => {
    const playButton = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12" fill="none">
            <path d="M3.85716 8.99977C3.7435 8.99977 3.63449 8.95462 3.55411 8.87425C3.47374 8.79387 3.42859 8.68486 3.42859 8.5712V3.42834C3.42863 3.35532 3.44733 3.28351 3.48291 3.21974C3.51849 3.15598 3.56978 3.10236 3.6319 3.06397C3.69403 3.02559 3.76493 3.00372 3.83788 3.00043C3.91083 2.99715 3.98341 3.01256 4.04873 3.0452L9.19159 5.61663C9.26268 5.65226 9.32246 5.70697 9.36423 5.77463C9.40601 5.8423 9.42813 5.92025 9.42813 5.99977C9.42813 6.07929 9.40601 6.15725 9.36423 6.22491C9.32246 6.29258 9.26268 6.34728 9.19159 6.38291L4.04873 8.95434C3.98926 8.98413 3.92368 8.99968 3.85716 8.99977ZM4.28573 4.12177V7.87777L8.04173 5.99977L4.28573 4.12177Z" fill="white" />
            <path d="M6 0.857143C7.01716 0.857143 8.01148 1.15877 8.85722 1.72387C9.70296 2.28897 10.3621 3.09218 10.7514 4.03191C11.1406 4.97165 11.2425 6.0057 11.044 7.00332C10.8456 8.00094 10.3558 8.91731 9.63655 9.63655C8.91731 10.3558 8.00094 10.8456 7.00332 11.044C6.00571 11.2425 4.97165 11.1406 4.03192 10.7514C3.09218 10.3621 2.28898 9.70296 1.72387 8.85722C1.15877 8.01148 0.857145 7.01716 0.857145 6C0.857145 4.63603 1.39898 3.32792 2.36345 2.36345C3.32793 1.39898 4.63603 0.857143 6 0.857143ZM6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0Z" fill="white" />
        </svg>
    );

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const options = ['20 Units', '40 Units', '60 Units', '80 Units', '100 Units'];
    return (
        <>
            <div className='terms--container store__card'>
                <h2>Product</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section specifies the products involved in this agreement, as selected by the registered vendor. It provides detailed information about the product, including its category or class, and pricing. All parties must agree on the product details before proceeding..</p>

                <div className='product--images store__card'>
                {record && record.products[0] && record.products[0].length && record.products[0].length > 0 ? (
                        <>
                            {Array.isArray(record?.products[0]) && record.products[0].map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img  src={product.images[0].url} alt={product.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : taggedData && taggedData.length > 0 ? (
                        <>
                            {taggedData && taggedData.map((product, index) => {
                                return (
                                    <div className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img key={index} src={product.images[0].url} alt={product.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <p className='text-[12px]   font-[500]'>No product selected by the vendor</p>
                    )}
                </div>

                <h2 className="mt-[30px]">Video type</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section specifies the videos involved in this agreement, as selected by the registered influencer. It provides detailed information about the video, including its category or class, and pricing. All parties must agree on the product details before proceeding.</p>

                <div className='product--images store__card'>
    
                    {record && record?.videos[0] && record?.videos[0]?.length && record?.videos[0]?.length > 0 ? (
                        <>
                            {Array.isArray(record?.videos[0]) && record?.videos[0]?.map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img src={product?.images[0]?.url} alt={product?.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : taggedDataVideo && taggedDataVideo.length > 0 ? (
                        <>
                            {taggedDataVideo && taggedDataVideo.map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px] relative">
                                        
                                        <div className='absolute w-full h-full top-0 bottom-0 right-0 left-0  backdrop-blur-[1px] z-[40] mx-auto my-auto' style={{ background: 'rgba(0, 0, 0, 0.50)' }} />
                                        <video className='w-full h-full object-cover' src={product.media[0]} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
                                        <div className='absolute w-[30px] h-[30px] top-0 bottom-0 right-0 left-0 mx-auto my-auto z-[50]'>{playButton}</div>
   
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <p className='text-[12px]   font-[500]'>No video selected</p>
                    )}
                    
                   
                </div>

                <div className='terms--docs'>
                    <ReadMore maxCharCnt={150}>
                       
                        The Influencer agrees to create and post content, including photos, videos, and captions, related to the products and/or services offered by the Vendor. This content shall be comprehensive, ensuring it includes not only visually appealing and engaging elements but also a meticulous description of the Vendor's products and/or services.
                            
                        The Influencer shall diligently incorporate all relevant information and details provided by the Vendor, guaranteeing that the content effectively captures the essence, features, and unique selling points of the products and/or services. This encompasses any specifications, benefits, or additional context that the Vendor deems essential for a thorough presentation.
                   
                    </ReadMore>
                </div>

                <div className='units'>
                    <h2>Units</h2>
                    <p className='text-[12px] font-[400]  '>Minimum Units: The minimum number of units that must be sold before the influencer gains access to proceeds is determined in this section. This section includes a paragraph below the condition acceptance line, which states the vendor's choice and allows for the influencer's negotiation. If an agreement hasn't been reached, all parties must agree before proceeding. Once an agreement is reached, it will be confirmed in this section
                    </p>
                </div>

                <div className='terms--docs'>
                    <p>The parties mutually agree to define the quantity of units, referred to as "Target Sales," that must be achieved before the Influencer becomes eligible to receive the agreed-upon percentage of the proceeds. In this section, the Vendor specifies their preferred Target Sales figure, and the Influencer has the opportunity to engage in negotiations regarding this quantity.
                    </p>
                    
                    <p>The Influencer's entitlement to the agreed percentage of proceeds, derived from the designated sales, is contingent solely upon the successful attainment of the mutually agreed-upon Target Sales figure.

                    </p>
                </div>

                <div className='units--container'>
                    <h3>Units</h3>
                    <Accordion options={options} handleSelect={handleUnitSelect} selectedOption={selectedUnit} currentUser={currentUser} record={record} />
                </div>
                <div className='check--container'>
                    <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
                        {isChecked && <span>&#10003;</span>}
                    </div>
                    <label>"By clicking 'Parties confirm that they have read and understood the terms outlined in this section and are happy to proceed to the subsequent sections of this agreement. “ </label>
                </div>

            </div>
        </>
    )
};


// Time Frame
const TimeFrame = ({ isChecked, setIsChecked, selectedDay, handleDaySelect, selectedUnit, handleUnitSelect, currentUser, record, taggedData, taggedDataVideo }) => {
    const playButton = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12" fill="none">
            <path d="M3.85716 8.99977C3.7435 8.99977 3.63449 8.95462 3.55411 8.87425C3.47374 8.79387 3.42859 8.68486 3.42859 8.5712V3.42834C3.42863 3.35532 3.44733 3.28351 3.48291 3.21974C3.51849 3.15598 3.56978 3.10236 3.6319 3.06397C3.69403 3.02559 3.76493 3.00372 3.83788 3.00043C3.91083 2.99715 3.98341 3.01256 4.04873 3.0452L9.19159 5.61663C9.26268 5.65226 9.32246 5.70697 9.36423 5.77463C9.40601 5.8423 9.42813 5.92025 9.42813 5.99977C9.42813 6.07929 9.40601 6.15725 9.36423 6.22491C9.32246 6.29258 9.26268 6.34728 9.19159 6.38291L4.04873 8.95434C3.98926 8.98413 3.92368 8.99968 3.85716 8.99977ZM4.28573 4.12177V7.87777L8.04173 5.99977L4.28573 4.12177Z" fill="white" />
            <path d="M6 0.857143C7.01716 0.857143 8.01148 1.15877 8.85722 1.72387C9.70296 2.28897 10.3621 3.09218 10.7514 4.03191C11.1406 4.97165 11.2425 6.0057 11.044 7.00332C10.8456 8.00094 10.3558 8.91731 9.63655 9.63655C8.91731 10.3558 8.00094 10.8456 7.00332 11.044C6.00571 11.2425 4.97165 11.1406 4.03192 10.7514C3.09218 10.3621 2.28898 9.70296 1.72387 8.85722C1.15877 8.01148 0.857145 7.01716 0.857145 6C0.857145 4.63603 1.39898 3.32792 2.36345 2.36345C3.32793 1.39898 4.63603 0.857143 6 0.857143ZM6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0Z" fill="white" />
        </svg>
    );
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const options = ['20 Units', '40 Units', '60 Units', '80 Units', '100 Units'];

    const days = ['7 days', '14 days', '21 days', '1 month', '2 months'];

    return (
        <>
            <div className='terms--container store__card'>
                <h2>Product</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section specifies the products involved in this agreement, as selected by the registered vendor. It provides detailed information about the product, including its category or class, and pricing. All parties must agree on the product details before proceeding</p>

                <div className='product--images store__card'>
                {record && record.products[0] && record.products[0].length && record.products[0].length > 0 ? (
                        <>
                            {Array.isArray(record?.products[0]) && record.products[0].map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img  src={product.images[0].url} alt={product.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : taggedData && taggedData.length > 0 ? (
                        <>
                            {taggedData && taggedData.map((product, index) => {
                                return (
                                    <div className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img key={index} src={product.images[0].url} alt={product.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <p className='text-[12px]   font-[500]'>No product selected by the vendor</p>
                    )}
                </div>

                <h2 className="mt-[30px]">Video type</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section specifies the videos involved in this agreement, as selected by the registered influencer. It provides detailed information about the video, including its category or class, and pricing. All parties must agree on the product details before proceeding.</p>

                <div className='product--images store__card'>
                    
                    {record && record?.videos[0] && record?.videos[0]?.length && record?.videos[0]?.length > 0 ? (
                        <>
                            {Array.isArray(record?.videos[0]) && record?.videos[0]?.map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px]">
                                        <img src={product?.images[0]?.url} alt={product?.title} className="object-cover h-full w-full" />
                                    </div>

                                )
                            })}
                        </>
                    ) : taggedDataVideo && taggedDataVideo.length > 0 ? (
                        <>
                            {taggedDataVideo && taggedDataVideo.map((product, index) => {
                                return (
                                    <div key={index} className="min-w-[70px] h-[70px] overflow-hidden rounded-[6px] relative">
                                        
                                        <div className='absolute w-full h-full top-0 bottom-0 right-0 left-0  backdrop-blur-[1px] z-[40] mx-auto my-auto' style={{ background: 'rgba(0, 0, 0, 0.50)' }} />
                                        <video className='w-full h-full object-cover' src={product.media[0]} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
                                        <div className='absolute w-[30px] h-[30px] top-0 bottom-0 right-0 left-0 mx-auto my-auto z-[50]'>{playButton}</div>
   
                                    </div>

                                )
                            })}
                        </>
                    ) : (
                        <p className='text-[12px]   font-[500]'>No video selected by the Influencer</p>
                    )}
                    
                   
                </div>

                <div className='terms--docs'>
                    <ReadMore maxCharCnt={150}>
                       
                        The Influencer agrees to create and post content, including photos, videos, and captions, related to the products and/or services offered by the Vendor. This content shall be comprehensive, ensuring it includes not only visually appealing and engaging elements but also a meticulous description of the Vendor's products and/or services.
                            
                        The Influencer shall diligently incorporate all relevant information and details provided by the Vendor, guaranteeing that the content effectively captures the essence, features, and unique selling points of the products and/or services. This encompasses any specifications, benefits, or additional context that the Vendor deems essential for a thorough presentation.
                   
                    </ReadMore>
                </div>

                <div className='units'>
                    <h2>Units</h2>
                    <p className='text-[12px] font-[400]  '>Minimum Units: The minimum number of units that must be sold before the influencer gains access to proceeds is determined in this section. This section includes a paragraph below the condition acceptance line, which states the vendor's choice and allows for the influencer's negotiation. If an agreement hasn't been reached, all parties must agree before proceeding. Once an agreement is reached, it will be confirmed in this section
                    </p>
                </div>

                <div className='terms--docs'>
                    <ReadMore maxCharCnt={100}>
                        The parties mutually agree to define the quantity of units, referred to as "Target Sales," that must be achieved before the Influencer becomes eligible to receive the agreed-upon percentage of the proceeds. In this section, the Vendor specifies their preferred Target Sales figure, and the Influencer has the opportunity to engage in negotiations regarding this quantity.
                    
                    
                        The Influencer's entitlement to the agreed percentage of proceeds, derived from the designated sales, is contingent solely upon the successful attainment of the mutually agreed-upon Target Sales figure.


                    </ReadMore>
                </div>

                <div className='units--container'>
                    <h3>Units</h3>
                    <Accordion options={options} handleSelect={handleUnitSelect} selectedOption={selectedUnit} currentUser={currentUser} record={record} />
                </div>

                <div className='units'>
                    <h2>Time Frame</h2>
                    <p className='text-[12px] font-[400]  w-[85%]'>Partnership Duration: This section outlines the duration of the partnership and how long commission earnings, as agreed upon in the contract, will last. A clear and readable paragraph reflects the choices made by all parties and confirms their agreement before proceeding to the next section.
                    </p>
                </div>

                <div className='terms--docs'>
                    <p>The parties mutually agree that this Agreement shall remain in force for the specified period outlined below. Both parties commit to diligently follow the agreed-upon timeline, including content creation, posting schedules and payment schedule. Any delays or changes must be communicated promptly and agreed upon by both parties.
                    </p>
                </div>

                <div className='units--container'>
                    <h3>Time Frame</h3>
                    <Accordion options={days} selectedOption={selectedDay} handleSelect={handleDaySelect} currentUser={currentUser} record={record} />
                </div>

                <div className='check--container'>
                    <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
                        {isChecked && <span>&#10003;</span>}
                    </div>
                    <label>"By clicking 'Parties confirm that they have read and understood the terms outlined in this section and are happy to proceed to the subsequent sections of this agreement. “ </label>
                </div>
            </div>
        </>
    )
};


// Termination 
const Termination = ({isChecked, setIsChecked}) => {
  
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div className='terms--container'>
                <h2>Termination</h2>
                <p className='text-[12px] font-[400]  w-[75%]'>This section covers the grounds for the termination of the partnership, including but not limited to morality clauses, scandalous situations, and content violations of the platform's terms of use. Termination terms and conditions are outlined here.
                </p>

                <p className='font-[500] text-[13px]  mt-[15px] italic'>Either party may terminate this Agreement on any of the following grounds:</p>


                <div className='terms--docs'>
                    <p>
                        <b>Breach of Material Terms:</b> If either party breaches a material term of this Agreement or if circumstances arise that make collaboration impractical or impossible.

                    </p>

                    <p>
                        <b>Morality Clause:</b> If either party engages in conduct or activities that are deemed immoral, unethical, or contrary to the values and principles of the other party and/or Haulway.
                    </p>

                    <p>
                        <b>Scandalous Situations:</b> Situations that could harm the reputation or interests of either party, leading to potential disrepute in the work relationship.
                    </p>

                    <p>
                        <b>Platform Violations:</b> Violations of the platform's terms of use, including but not limited to the creation and posting of content that infringes on copyright, promotes hate speech, or violates community guidelines.

                    </p>

                    <p>
                        The terminating party shall provide written notice of termination to the other party, specifying the grounds for termination. Notice shall be delivered through email or another mutually agreed-upon method of communication. Upon receiving the termination notice, a grace period of three (3) days shall be observed to allow for discussions, resolution attempts, or compliance with corrective actions, where applicable.


                    </p>

                    <p>
                        Notwithstanding the grace period, immediate termination may be invoked in cases where irreparable harm or severe violations have occurred, as determined by Haulway.

                    </p>
                    <div className='units--container mb-[-10px]'>
                        <h3>Post Termination</h3>
                    </div>
                    
                    <p className='text-[5px] '>
                        In the event of termination, this section explains how Haulway, as the intermediary and rights holder to digital content, may continue to use the content even after the partnership concludes. It provides clarity on the post-termination use of content.. You'll also ensure this contract complies with all relevant laws and regulations, considering the unique role of haulway as the intermediary connecting influencers and vendors.
                    </p>

                    <p>
                        Upon termination of this Agreement, both parties hereby relinquish all rights to the content created during the term of this Agreement. Haulway, serving as the intermediary and rights holder to digital content generated or provided throughout the collaboration, retains full discretion over the utilization of said content.
                    </p>

                    <p>
                        This discretion extends to the use of content. including but not limited to images, videos, text, and related materials, for various purposes, such as promotional activities, marketing campaigns, and the presentation of past collaborations between vendors and Influencers on the platform.
                        Where applicable, Haulway agrees to provide proper credit to the Influencer and vendor for their content in accordance with standard industry practices.
                    </p>

                    <p>
                        <b>Access and Return of Assets:</b> Any assets, documents, or materials provided during the collaboration shall be promptly returned or disposed of as per the Agreement.
                    </p>

                    <p>
                        <b>Confidentiality and Non-Disparagement:</b> Both parties commit to maintaining the confidentiality of sensitive information and refrain from making disparaging remarks or actions towards each other, post-termination.
 
                    </p>

                    <p>
                        <b>Survival of Terms:</b> Termination shall not affect the survival of terms that, by their nature, should continue beyond termination, including but not limited to confidentiality and dispute resolution clauses.
 
                    </p>

                    <div className='check--container'>
                        <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
                            {isChecked && <span>&#10003;</span>}
                        </div>
                        <label>"By clicking 'Parties confirm that they have read and understood the terms outlined in this section and are happy to proceed to the subsequent sections of this agreement." </label>
                    </div>

                </div>
            </div>
        </>
    );
};