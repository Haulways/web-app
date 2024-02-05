import * as React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../cart.css';
import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';
import Location from "../../../assets/purchase-icons/location.png";
import expandIcon from "../../../assets/cart/expand.png";
import wallet from "../../../assets/purchase-icons/wallet.png";
import visa from "../../../assets/purchase-icons/visa.png";
import yellowLine from "../../../assets/purchase-icons/yelloLine.png";
import lorry from "../../../assets/purchase-icons/lorry.png";
import { Form, RadioButtonGroupInput } from 'react-admin';
import { PaystackButton } from 'react-paystack';


export const CartPayment = ({ cart, openForm, SetPaymentSess, componentProps }) => {

    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    return (

        <>
            <div className='payment--details'>

                <span className='delivery-location'>
                    Delivery Location
                </span>

                <div className='location-part' onClick={openForm}>
                    <span className='location-name'>
                        <img className='w-[30px] h-[30px]' src={Location} />
                        <span>
                            <h3>2, Johnson Akim St.</h3>
                            <p>Lagos, Nigeria</p>
                        </span>
                    </span>
                    <span className='cursor-pointer'
                        onClick={openForm}
                    >
                        <ChevronRightIcon className='w-[30px] h-[36px]' />
                    </span>
                </div>

                <div className='payment-method'>
                    <Accordion className='cart--accordian before:h-0  mb-[10px]' sx={{ boxShadow: 'none' }}>
                        <AccordionSummary className='bg-[#D9D9D9] rounded-[10px]'
                            expandIcon={<img className='h-[10px]' src={expandIcon} alt="expand" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className=''>
                                <span className='font-[600] text-black text-[16px]'>Select Payment Method</span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Form
                                sx={{
                                   

                                    '& .MuiSelect-select-MuiInputBase-input-MuiFilledInput-input.MuiSelect-select': {
                                        backgroundColor: "#D9D9D9 !important",
                                        borderRadius: '6px',
                                        overflow: 'hidden'
                                    },
                                    '& .MuiSelect-select-MuiInputBase-input-MuiFilledInput-input.MuiSelect-select::before': {
                                        borderBottom: 'none'
                                    },
                                    
                                }}
                            >
                                <RadioButtonGroupInput
                                    sx={{
                                        
                                        display: "flex !important",
                                        justifyContent: 'space-between !important',
                                        '& .MuiFormControlLabel-root': {
                                            display: "flex !important",
                                            justifyContent: 'space-between !important',
                                            direction: 'row-reverse !important',
                                          

                                        }, 
                                        '& .MuiTypography-root': {
                                            fontWeight: '600 !important',
    
                                        }
                                    }}
                                    source="payment_session"
                                    label=" "
                                    row={false}
                                    choices={
                                        cart && cart.payment_sessions && cart.shipping_methods
                                            ? cart.payment_sessions.map((opt) => {
                                                return {
                                                    id: opt.provider_id,
                                                    name: toTitleCase(opt.provider_id),
                                                };
                                            })
                                            : null
                                    }
                                    onChange={(event, value) => SetPaymentSess(value)}
                                />
                            </Form>


                        </AccordionDetails>
                    </Accordion>
                    
                </div>

                

                {/* Order history  */}
                <div className='order-info'>

                    {/* Total  */}
                    
                    <div className="order-summation">
                        <span className="sum-name">Grand Total</span>
                        <span className="sum-digit text-[18px]">
                            <span className="uppercase mr-[3px]">
                                {cart && cart.region && cart.region.currency_code}
                            </span>
                            {cart && cart.total ? Number((cart.total / 100 + (10)).toFixed(2)).toLocaleString() : 0}
                        </span>
                    </div>
                </div>
                
                {/* action buttons  */}
                <div className='action--btns'>
                    <IconButton>
                        <div className='update--bag'>
                            UPDATE BAG
                        </div>
                    </IconButton>
                    <IconButton>
                        <div className='ckeck--out'>
                            {cart &&
                                cart.shipping_address_id &&
                                cart.shipping_address &&
                                cart.shipping_methods &&
                                cart.payment_session &&
                                cart.shipping_methods.length > 0 ? null : (
                                <button>
                                    CHECKOUT
                                </button>
                            )}
                            {cart &&
                                cart.shipping_address_id &&
                                cart.shipping_address &&
                                cart.shipping_methods &&
                                cart.payment_session &&
                                cart.shipping_methods.length > 0 ? (
                                <PaystackButton
                                    {...componentProps}
                                    alwaysEnable={
                                        cart &&
                                            cart.shipping_methods &&
                                            cart.payment_session &&
                                            cart.shipping_methods.length > 0
                                            ? false
                                            : true
                                    }
                                    // fullWidth
                                    color="primary"
                                    variant="contained"
                                    // label="Shipping Option"
                                    // onClick={() => {
                                    //   // ListShippingOptions(cart);
                                    // }}
                                    sx={{ color: "#fff" }}
                                    disabled={
                                        cart &&
                                            cart.shipping_methods &&
                                            cart.shipping_methods.length > 0 &&
                                            cart.payment_sessions.length > 0 &&
                                            cart.payment_session
                                            ? true
                                            : false
                                    }
                                />
                            ) : null}
                        </div>
                    </IconButton>

                </div>
                    
            </div>
        
        </>
    );
};

export const BrandDetails = ({store, cart}) => {
    return (
        <>
            <div className='payment--details bg-[#FAF9F9] rounded-[10px] mt-[25px] px-[15px]'>

                <div className='payment--details--Top'>
                    <h2>{store}</h2>
                    <span className='sold-by'>
                        <p>Ships and sold by</p>
                        <span>
                            {store}
                            <img className='ml-[-.2rem] mt-[-.2rem]' src={yellowLine} alt='avenue' />
                        </span>
                    </span>
                </div>

                {/* Shipping  */}
                <div className='free-shipping'>
                    <h2>
                        Shipping Fee
                    </h2>
                    <span className='mt-[10px]'>
                        <img src={lorry} alt='lorry' />

                        <p>
                            Usually ships within 2-3 business days
                        </p>
                    </span>


                </div>

                {/* Order history  */}
                <div className='order-info'>
                    <h2>
                        Order Info
                    </h2>
                        
                    {/* subtotal  */}
                    <div className="order-summation">
                        <span className="sum-name text-[12px]">Subtotal</span>
                        <span className="sum-digit">
                            <span className="uppercase mr-[3px]">
                                {cart && cart.region && cart.region.currency_code}
                            </span>
                            {cart && cart.subtotal ? Number((cart.subtotal / 100).toFixed(2)).toLocaleString() : 0}
                        </span>
                    </div>

                    {/* shipping cost  */}
                    <div className="order-summation">
                        <span className="sum-name text-[12px]">Shopping Cost</span>
                        <span className="sum-digit">+ $10.00</span>
                    </div>
                </div>
            </div>
        </>
    );
};