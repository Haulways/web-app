import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, Grid, IconButton, Stack } from "@mui/material";
import '../../components/cart/cart.css';
import { Link, useLocation } from 'react-router-dom';
import { CartCard } from '../../components/cart/cartCards/CartCard';
import { BrandDetails, CartPayment } from '../../components/cart/cartCards/PaymentCard';
import { SearchBox } from '../../components/search/SearchBox';
import backIcon from '../../assets/hauls/backIcon.png';
import cartIcon from '../../assets/cart/expand.png';
import { useProducts } from 'medusa-react';
import { Button, Confirm, FormTab, RadioButtonGroupInput, SaveButton, SelectInput, SimpleForm, TabbedForm, TabbedFormTabs, TextInput, Toolbar, required, useRedirect, useStore } from 'react-admin';
import Medusa from '@medusajs/medusa-js';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Location from "../../assets/purchase-icons/location.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import { DFooter } from '../../components';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { useGetIdentity, useGetOne } from 'react-admin';
import { supabase } from '../../supabase/SupabaseConfig';
import { useContext } from 'react';
import { AuthContext } from '../../components/context/AuthContext';






// const medusa = new Medusa({
//     baseUrl: "https://ecommerce.haulway.co",
// });




const Cart = () => {
    const [openCart, setOpenCart] = React.useState(true);
    const [cart, setCart] = React.useState(null);
    const [carts, setCarts] = React.useState(null);
    const [custData, setCustData] = useStore("customer");
    const [openShipping, setOpenShipping] = useState(false);
    const [formState, setFormState] = useState('address');
    const [shipOpts, setShipOpts] = React.useState([]);
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [shipRegs, setShipRegs] = React.useState([]);
    const [config, setConfig] = React.useState(null);
    const [finalType, setFinalType] = React.useState(null);
    const [finalData, setFinalData] = useStore("order");
    const { theme } = React.useContext(ThemeContext);
    const [intCart, setIntCart] = useStore("int_carts");
    const [cart_id, setCartID] = useState(intCart[Object.keys(intCart)[0]]);
    const [expanded, setExpanded] = React.useState(false);
    const location = useLocation()
    const redirect = useRedirect();
    const { data: identity, isLoading: identityLoading } = useGetIdentity();
    const { currentUser, medusa } = useContext(AuthContext);

    const handleChange = (panel, cart) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setCartID(cart.id)

    };

    // async function filterContractDocuments(vendorEmail, influencerEmail) {
    //     try {
    //         // Query contract documents table
    //         const { data, error } = await supabase
    //             .from("contract")
    //             .select("*")
    //             .eq('vendor_email', vendorEmail)
    //             .eq('influencer_email', influencerEmail);

    //         if (error) {
    //             throw error;
    //         }

    //         // Return filtered contract documents
    //         return data;
    //     } catch (error) {
    //         console.error('Error filtering contract documents:', error.message);
    //         return null;
    //     }
    // }





    React.useEffect(() => {
        if (medusa) {
            medusa.customers.retrieve()
                .then(({ customer }) => {
                    setCustData(customer);
                });
        }
    }, [medusa]);


    useEffect(() => {
        LoadCarts();
    }, [intCart])

    // useEffect(() => {

    // }, [cart])

    useEffect(() => {
        if (cart_id) {
            // medusa.carts.retrieve(cart_id).then(({ cart }) => {
            //     setCart(cart)
            // });
            LoadCarts();
        }

    }, [cart_id])


    const LoadCarts = async () => {
        let all_carts = await Promise.all(Object.keys(intCart).map(async (store_id) => {
            return await medusa.carts.retrieve(intCart[store_id]).then(({ cart }) => {
                return cart
            });
        }))

        if (all_carts && all_carts.length) {
            setCarts(all_carts);
        }
    }

    useEffect(() => {
        if (cart) {
            console.log(cart);
            LoadCarts();
        }
    }, [cart]);

    useEffect(() => {
        if (carts) {
            // if (JSON.stringify(cart) === JSON.stringify(carts.filter((crt) => { return crt.id !== cart_id })[0])) {
            //     setCart(carts.filter((crt) => {
            //         return crt.id === cart_id;
            //     })[0])
            // }
            setCart(carts.filter((crt) => {
                return crt.id === cart_id;
            })[0])

        }
    }, [carts]);

    useEffect(() => {
        if (
            cart &&
            custData &&
            cart_id &&
            cart.shipping_address_id &&
            cart.shipping_address &&
            cart.shipping_methods &&
            cart.shipping_methods.length > 0 &&
            cart.payment_sessions.length > 0 &&
            cart.payment_session &&
            cart.payment_session.provider_id === "paystack"
        ) {
            let conf = {
                reference: cart.payment_session.data.paystackTxRef,
                email: custData.email,
                amount: cart.payment_session.amount,
                publicKey: import.meta.env.VITE_PS_PUB_KEY,
                split_code: cart.context.split_doc ? (cart.context.split_doc.split_code) : (null),
                split: cart.context.split_doc ? (cart.context.split_doc) : (null)
            };

            console.log(conf);
            setConfig(conf);
        }
    }, [cart, custData, cart_id]);

    const handleRemoveItem = (variantId) => {
        console.log(`Attempting to remove item ${variantId} from cart`);

        if (cart && cart_id) {
            medusa.carts.lineItems.delete(cart_id, variantId).then(({ cart }) => {
                setCart(cart);
            });
        }
    };


    const completeCheckout = () => {
        if (
            custData &&
            cart_id &&
            cart.shipping_address_id &&
            cart.shipping_address &&
            cart.shipping_methods &&
            cart.shipping_methods.length > 0 &&
            cart.payment_session
        ) {
            medusa.carts
                .complete(cart_id)
                .then(({ type, data }) => {
                    let intCrt = intCart;
                    delete intCrt[cart.context.store.id];
                    setIntCart({ ...intCrt })
                    // setFinalData(data);
                    // setFinalType(type);
                    // console.log(data, type);
                    // const lineItem = data.cart.items;

                    // // Loop through each line item and remove it from the cart
                    // lineItem.forEach(item => {
                    //     medusa.carts.lineItems.delete(cart_id, item.id)
                    //         .then(({ cart }) => {
                    //             setCart(cart);
                    //         })
                    //         .catch(error => console.error(`Error removing item ${item.id} from cart:`, error));
                    // });
                })
                .catch((error) => {
                    toast(error.message);
                });
            // Get the line items from the completed cart


        } else {
            toast("Check out failed");
        }
    };

    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        // UpdatePaymentSess(cart.payment_session.provider_id, reference)
        // handleCompleted()
        completeCheckout()
        setOpenShipping(false);
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
    };

    const componentProps = {
        ...config,
        text: "Pay with Paystack",
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    const completePayment = (data) => {
        console.log(data);
        UpdateShippingAddress(data);
        SelectShippingMethod(data.shipping_option);
        SetPaymentSess(data.payment_session);
    };

    // list shipping option 
    const ListShippingOptions = (cart) => {
        medusa.shippingOptions
            .listCartOptions(cart.id)
            .then(({ shipping_options }) => {
                setShipOpts(shipping_options);
            });
    };

    useEffect(() => {
        if (cart && cart.region) {

            const countries = cart.region.countries.map((country) => (
                {
                    id: country.iso_2,
                    name: country.name
                }
            ))
            // console.log(countries)
            setShipRegs(countries)
            medusa.carts.retrieve(cart_id)
                .then(({ cart }) => {
                    let totalPrice = (cart.total / 100).toFixed(2);
                    console.log(`Total price: ${totalPrice}`);
                    console.log(`Currency: ${cart.region.currency_code}`);
                })
                .catch((error) => {
                    console.log(error.message);
                });


        }
    }, [cart]);

    const CreatePaymentSess = () => {
        medusa.carts.createPaymentSessions(cart_id).then(({ cart }) => {
            setCart(cart);
        })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const SetPaymentSess = (paymentProviderId) => {
        if (
            custData &&
            cart_id &&
            cart.shipping_address_id &&
            cart.shipping_address &&
            cart.shipping_methods &&
            cart.shipping_methods.length > 0 &&
            cart.payment_sessions.length > 0 &&
            paymentProviderId
        ) {
            console.log(paymentProviderId);
            medusa.carts
                .setPaymentSession(cart_id, {
                    // retrieved from the payment session selected by the customer
                    provider_id: paymentProviderId,
                })
                .then(({ cart }) => {
                    console.log("Here", cart.payment_session);
                    setCart(cart);
                    // UpdatePaymentSessWithSplitConfig(paymentProviderId)
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            console.log("Payment Session not set");
        }
    };

    const UpdatePaymentSessWithSplitConfig = (paymentProviderId) => {
        if (
            custData &&
            cart_id &&
            cart.shipping_address_id &&
            cart.shipping_address &&
            cart.shipping_methods &&
            cart.shipping_methods.length > 0 &&
            cart.payment_sessions.length > 0 &&
            paymentProviderId === 'paystack' &&
            cart.context.split_doc
        ) {
            medusa.carts.updatePaymentSession(cart_id, paymentProviderId, {
                data: {
                    split_code: cart.context.split_doc.split_code
                },
            })
                .then(({ cart }) => {
                    console.log("Here", cart.payment_session);
                    setCart(cart);
                })
                .catch((error) => {
                    console.log(error.message);
                });


        } else {
            console.log("Payment Session not Updated");
        }

    }


    const UpdatePaymentSess = (paymentProviderId, reference) => {
        if (
            custData &&
            cart_id &&
            cart.shipping_address_id &&
            cart.shipping_address &&
            cart.shipping_methods &&
            cart.shipping_methods.length > 0 &&
            cart.payment_sessions.length > 0 &&
            paymentProviderId
        ) {
            medusa.carts.updatePaymentSession(cart_id, paymentProviderId, {
                data: {
                    ...reference
                },
            })
                .then(({ cart }) => {
                    console.log("Here", cart.payment_session);
                    setCart(cart);
                })
                .catch((error) => {
                    console.log(error.message);
                });


        } else {
            console.log("Payment Session not Updated");
        }

    }

    useEffect(() => {
        if (custData &&
            cart &&
            cart.shipping_address_id &&
            cart.payment_sessions.length <= 0 &&
            cart.shipping_address
        ) {
            CreatePaymentSess(cart);
        }
    }, [cart]);

    const SelectShippingMethod = (shippingOptionId) => {
        if (
            custData &&
            cart_id &&
            cart.shipping_address_id &&
            cart.shipping_address &&
            shipOpts &&
            shipOpts.filter((option) => {
                return option.id === shippingOptionId;
            }).length > 0
        ) {
            medusa.carts
                .addShippingMethod(cart_id, {
                    option_id: shippingOptionId, // the ID of the selected option
                })
                .then(({ cart }) => {
                    toast("Shipping Option Updated")
                    setCart(cart);
                });
        } else {
            console.log("Please your Shipping Address first");
            toast("Please your Shipping Address first")
        }
    };

    // update shipping address 
    const UpdateShippingAddress = async (address) => {
        // console.log(custData.shipping_addresses);
        if (custData && cart_id && !cart.shipping_address) {
            await toast.promise(
                medusa.carts.update(cart_id, {
                    customer_id: custData.id,
                    shipping_address: {
                        company: address.company,
                        first_name: address.first_name,
                        last_name: address.last_name,
                        address_1: address.address_1,
                        address_2: "",
                        city: address.city,
                        country_code: address.country_code,
                        province: address.province,
                        postal_code: address.postal_code,
                        phone: address.phone,
                    },
                })
                    .then(({ cart }) => {
                        setCart(cart);

                    })
                    .catch((error) => {
                        console.log(error.message)
                    }),
                {
                    pending: `Updating shipping address`,
                    success: 'shipping address Updated 👌',
                    error: 'shipping address Failed 🤯'
                }
            )

        }
        else {

            console.log("Shipping Address Already Set");
        }
    };



    const AutoSaveToolbar = () => (
        <Toolbar>
            <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
                <SaveButton
                    sx={{
                        textTransform: 'capitalize'
                    }}
                    color="primary"
                    label={cart && cart.shipping_address_id && cart.shipping_address ? ('Update') : ('Add new shipping option')}
                    icon=' '



                />

                <SaveButton

                    // fullWidth

                    color="primary"
                    variant="contained"
                    label="Close"
                    icon=' '
                    onClick={handleConfirm}
                    sx={{ color: "#fff", textTransform: 'capitalize' }}

                />


            </Stack>
        </Toolbar>
    );

    const handleOpenForm = () => {
        setOpenShipping(true);
        setFormState('address');
    };
    const handleDialogClose = () => setOpenShipping(false);
    const handleConfirm = () => {
        setOpenShipping(false);
    };


    React.useEffect(() => {
        if (custData) {
            console.log(custData)
            // console.log(cart);
        }
    }, [custData]);




    React.useEffect(() => {
        if (!cart_id) {
            medusa.carts.create().then(({ cart }) => {
                setCartID(cart.id);
                setCart(cart)
            });
        } else {
            medusa.carts.retrieve(cart_id).then(({ cart }) => setCart(cart));
        }
    }, []);


    // Function to delete item
    const DelItemFromCart = (lineItemId) => {
        if (cart && cart_id) {
            medusa.carts.lineItems.delete(cart_id, lineItemId).then(({ cart }) => {
                setCart(cart);
            });
        }
    };

    // Function to update quantity
    const updateItemInCart = (lineItemId, qty) => {
        if (cart && cart_id) {
            medusa.carts.lineItems
                .update(cart_id, lineItemId, {
                    quantity: qty,
                })
                .then(({ cart }) => {
                    setCart(cart);
                });
        }
    };

    // Function to increase quantity

    const increaseQuantity = (lineItemId, currentQty) => {
        updateItemInCart(lineItemId, currentQty + 1);
    };

    // Function to decrease quantity
    const decreaseQuantity = (lineItemId, currentQty) => {
        if (currentQty > 1) {
            updateItemInCart(lineItemId, currentQty - 1);
        } else {
            toast("Quantity cannot be less than 1");
        }
    };

    React.useEffect(() => {
        if (cart) {
            ListShippingOptions(cart)
        }
    }, [cart])


    return (
        <>
            <div className="relative feed--page">



                <div className='my--cart '>
                    <h3 className='header'>Your carts</h3>
                    <p className='para'>Experience seamless purchase.
                        Your One-Stop to get everything you love..</p>

                    <div className='mb-[30.78px]'>
                        <SearchBox placeholder='Search' />
                    </div>

                </div>

                {
                    carts && carts.length ? (
                        carts.map(cart => {
                            return cart ? (
                                <>
                                    {cart && cart.items && cart.items.length > 0 ? (
                                        <Accordion className='cart--accordian before:h-0 ' sx={{
                                            boxShadow: '0px 1px 0px 0px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(0, 0, 0, 0.019)', margin: '0 -10px', backgroundColor: theme === 'light' ? '#fff' : '#222',
                                            color: theme === 'light' ? '#222' : '#fff',
                                        }} expanded={expanded === 'panel1'} onChange={handleChange('panel1', cart)} >
                                            <AccordionSummary className='border-y-[1px] border-solid mb-[10px] border-[#D9D9D9]'
                                                expandIcon={<img className='h-[10px]' src={cartIcon} alt="expand" />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <div className='flex items-center gap-x-1'>
                                                    <span className='brand'>{cart && cart.context && cart.context.store && cart.context.store.name}</span>
                                                    <span className='number--of--order'>
                                                        {cart && cart.items.length}
                                                    </span>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ padding: '8px 0' }}>
                                                {cart && cart.items && cart.items.length > 0 && cart.items.map((item) => (
                                                    <div key={item.id}>
                                                        <CartCard
                                                            item={item}
                                                            DelItemFromCart={DelItemFromCart}
                                                            increaseQty={increaseQuantity}
                                                            decreaseQty={decreaseQuantity}
                                                            cart={cart}
                                                        />
                                                    </div>

                                                ))}
                                                <BrandDetails
                                                    store={cart && cart.context && cart.context.store && cart.context.store.name}
                                                    cart={cart}
                                                />


                                            </AccordionDetails>
                                            <CartPayment
                                                cart={cart}
                                                openForm={handleOpenForm}
                                                SetPaymentSess={SetPaymentSess}
                                                componentProps={componentProps}
                                                UpdatePaymentSessWithSplitConfig={UpdatePaymentSessWithSplitConfig}
                                            />
                                            <div className='py-7'></div>

                                        </Accordion>
                                    ) : (
                                        <p className='font-[500] flex items-center justify-center'>Your cart is empty</p>
                                    )}

                                </>

                            ) : (
                                <div className='spinner absolute top-0 bottom-0 left-0 right-0 my-0 mx-0'>

                                    <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                </div>
                            );
                        })
                    ) : (null)
                }
                <Confirm
                    isOpen={openShipping}
                    // loading={isLoading}
                    // PaperProps={{ style: { borderRadius: '10px' } }}
                    fullScreen
                    title=" "
                    sx={{
                        '& .MuiDialogTitle-root, .MuiInputBase-input, .MuiDialogActions-root': {
                            background: theme === 'light' ? '#fff' : '#222',
                            color: theme === 'light' ? '#222' : '#fff',
                        },
                        '& .MuiDialogContent-root': {
                            padding: '0px !important',
                            background: theme === 'light' ? '#fff' : '#222',
                            color: theme === 'light' ? '#222' : '#fff',
                        },

                        '& .MuiToolbar-root': {
                            // backgroundColor: '#fff !important',
                            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                            background: theme === 'light' ? '#fff' : '#222',
                            color: theme === 'light' ? '#222' : '#fff',
                        },
                        '& .MuiInputBase-root': {
                            borderColor: theme === 'light' ? '#222' : '#fff',
                        }


                    }}
                    content={
                        <Stack>
                            <TabbedForm
                                toolbar={<AutoSaveToolbar />}
                                tabs={
                                    <TabbedFormTabs variant="scrollable" scrollButtons="auto" />
                                }
                                onSubmit={completePayment}
                                syncWithLocation={false}
                                sx={{
                                    '& .MuiFilledInput-root': {
                                        backgroundColor: "#D9D9D9 !important",
                                        borderRadius: '6px',
                                        overflow: 'hidden'
                                    },
                                    '& .MuiFilledInput-root::before': {
                                        borderBottom: 'none'
                                    },
                                    '& .MuiTabs-flexContainer': {
                                        justifyContent: 'center',
                                        columnGap: '26px'
                                    },
                                    '& .MuiTab-root': {
                                        textTransform: 'capitalize !important',
                                        border: '2px solid #222',
                                        borderRadius: "6px",
                                        color: "#222 ",
                                        fontSize: '16px',
                                    },
                                    "& .Mui-selected": {
                                        color: "white !important",
                                        background:
                                            "#222222 !important",
                                        borderRadius: "6px",


                                    },
                                    "& .MuiTabs-indicator": {
                                        background: "none",
                                        border: "none",
                                    },
                                    "& .MuiDivider-root": {
                                        border: "none",
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#7A7A7A',
                                        fontWeight: '500',


                                    },
                                    '& .MuiFilledInput-input': {
                                        color: '#333',
                                        fontWeight: '500'
                                    },
                                    backgroundColor: theme === 'light' ? '#fff' : '#222',
                                    color: theme === 'light' ? '#222' : '#fff',
                                }}

                            >

                                <FormTab path='address' label="Address Info">
                                    <span className='delivery-location'>
                                        Previous
                                    </span>

                                    <div className='location-part w-full'>
                                        <span className='location-name'>
                                            <img className='w-[30px] h-[30px]' src={location} />
                                            <span>

                                                <p className='text-[#222] font-[600] text-[12px]'>Select previous delivery location</p>
                                            </span>
                                        </span>
                                        <span className='cursor-pointer '

                                        >
                                            <ExpandMoreIcon className='' width='30px' height='30px' />
                                        </span>
                                    </div>
                                    <div className='text-[14px] text-[#000] font-[600] mt-[30px]'>
                                        <h2>New Address Info</h2>
                                    </div>
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="first_name"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.first_name}` : null}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="last_name"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.last_name}` : null}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextInput
                                                source="address_1"
                                                label="Address"
                                                variant="outlined"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.address_1}` : null}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="city"
                                                variant="outlined"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.city}` : null}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="province"
                                                variant="outlined"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.province}` : null}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <SelectInput
                                                source="country_code"
                                                defaultValue={selectedRegion}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setSelectedRegion(e.target.value)}
                                                choices={
                                                    shipRegs.map((region) => {
                                                        return {
                                                            id: region.id,
                                                            name: region.name,
                                                        };
                                                    })
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="postal_code"
                                                variant="outlined"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.postal_code}` : null}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="email"
                                                variant="outlined"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.last_name}` : null}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <TextInput
                                                source="phone"
                                                variant="outlined"
                                                defaultValue={cart && cart.shipping_address ? `${cart.shipping_address.phone}` : null}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </FormTab>
                                <FormTab path='shipping' label="Shipping option">
                                    <RadioButtonGroupInput
                                        source="shipping_option"
                                        row={false}
                                        defaultValue={cart && cart.shipping_methods && cart.shipping_methods.length ? `${cart.shipping_methods[0].shipping_option.id}` : null}
                                        choices={
                                            shipOpts.length <= 0 && cart && cart.shipping_methods
                                                ? cart.shipping_methods.map((opt) => {
                                                    return {
                                                        id: opt.shipping_option.id,
                                                        name: opt.shipping_option.name,
                                                    };
                                                })
                                                : shipOpts
                                        }
                                        onChange={(event, value) => SelectShippingMethod(value)}
                                    // validate={required()}

                                    />
                                </FormTab>
                            </TabbedForm>
                        </Stack>
                    }
                    onConfirm={handleConfirm}
                    onClose={handleDialogClose}
                />
            </div>
            <DFooter />
        </>
    );
};

export default Cart