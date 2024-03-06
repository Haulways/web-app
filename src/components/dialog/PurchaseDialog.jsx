import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import './DialogBox.css'
import { useTheme } from '@emotion/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ShowVideoBox } from '../videoPlayer/VideoPlayer';
import yellowLine from "../../assets/purchase-icons/yelloLine.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import location from "../../assets/purchase-icons/location.png";
// import wallet from "../../assets/purchase-icons/wallet.png";
import cartIcon from "../../assets/purchase-icons/oneWayCart.png";
// import visa from "../../assets/purchase-icons/visa.png";
import lorry from "../../assets/purchase-icons/lorry.png";
import processing from "../../assets/purchase-icons/Processing.png";
import thankYou from "../../assets/purchase-icons/ThankYou.png";
import share from "../../assets/socials/share.png";
import FB from "../../assets/socials/fb.png";
import IG from "../../assets/socials/ig.png";
import { Confirm, Form, FormTab, RadioButtonGroupInput, SaveButton, SelectInput, TabbedForm, TextInput, Toolbar, required, useRedirect, useStore } from 'react-admin';
import Medusa from '@medusajs/medusa-js';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useContext } from 'react';
import { PaystackButton } from 'react-paystack';
import { SmallPHorizontalCards, SmallPHorizontalVariantCards } from '../card/ShowCard';
import { GetStoreVendor, ListStoreVendors } from '../../pages/post/Post';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeProvider';
import { useGetIdentity, useGetOne } from 'react-admin';







const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: "https://ecommerce.haulway.co",
});

const PaymentDialog = ({ openPayment, cancelPayment, handleCompleted, currentProduct, cart, cart_id, setCartID, setCart, custData, setCustData, theme }) => {
    const { currentUser } = useContext(AuthContext);
    const [openShipping, setOpenShipping] = React.useState(false);
    const [shipOpts, setShipOpts] = React.useState([]);
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [shipRegs, setShipRegs] = React.useState([]);
    const [config, setConfig] = React.useState(null);
    const [finalType, setFinalType] = React.useState(null);
    const [finalData, setFinalData] = useStore("order");
    const [exst_item, setExst_item] = React.useState(null);
    // const { savedPost, loading, error } = CheckSavedPost(post.id, currentUser);
    const { store, vendor, vendorAcc } = GetStoreVendor(exst_item?.variant?.product?.store_id)
    const location = useLocation()
    const redirect = useRedirect();
    const [intCart, setIntCart] = useStore("int_carts");
    const [g_cart_id, setGCartID] = useStore("gcart_id");
    const [gcart, setGCart] = React.useState(null);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();









    React.useEffect(() => {
        // console.log(currentProduct);
        if (custData && cart && cart_id) {
            // Check if the item already exists in the cart
            const existingItem = cart.items.find(item => item.variant_id === currentProduct.variants[0].id);

            if (existingItem) {
                // If the item exists and its quantity is more than 1, update it to 1
                setExst_item(existingItem)
            }

        }
    }, []);

    React.useEffect(() => {
        if (cart) {
            ListShippingOptions(cart)
        }
    }, [cart])



    useEffect(() => {
        if (cart && custData) {
            // console.log(cart);
            // console.log(custData);
        }
    }, [cart, custData]);

    useEffect(() => {
        if (exst_item) {
            // console.log(exst_item);
        }
    }, [exst_item]);

    useEffect(() => {
        if (store) {
            // console.log(store);
        }
    }, [store]);




    React.useEffect(() => {
        if (cart_id) {
            medusa.carts.retrieve(cart_id).then(({ cart }) => setCart(cart));
        }
        if (g_cart_id) {
            medusa.carts.retrieve(g_cart_id).then(({ cart }) => setGCart(cart));
        }
    }, []);

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
            };

            console.log(conf);
            setConfig(conf);
        }
    }, [cart, custData, cart_id]);

    const handleRemoveItem = (variantId) => {
        console.log(`Attempting to remove item ${variantId} from cart`);

        if (cart && cart_id && gcart && g_cart_id) {
            medusa.carts.lineItems.delete(g_cart_id, variantId).then(({ cart }) => {
                setGCart(cart);
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
                    setFinalData(data);
                    setFinalType(type);
                    console.log(data, type);
                    const lineItem = data.cart.items;

                    // Loop through each line item and remove it from the cart
                    lineItem.forEach(item => {
                        medusa.carts.lineItems.delete(cart_id, item.id)
                            .then(({ cart }) => {
                                setCart(cart);
                            })
                            .catch(error => console.error(`Error removing item ${item.id} from cart:`, error));
                    });
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
        handleCompleted()
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

    const FetchInternalCart = async (product) => {
        let cart_id = '';
        // console.log(product)
        if (product && product.metadata && product.metadata.store && product.metadata.store.id) {
            if (intCart && Object.keys(intCart).includes(product.metadata.store.id)) {
                cart_id = intCart[product.metadata.store.id];
            }
            else {
                cart_id = await medusa.auth
                    .authenticate({
                        email: identity.email,
                        password: import.meta.env.VITE_AUTH_PASSWORD,
                    })
                    .then(async ({ customer }) => {
                        if (!cart_id || cart_id === '') {
                            return await medusa.carts.create().then(async ({ cart }) => {
                                return await medusa.carts.update(cart.id, {
                                    context: { ...cart.context, ...product?.metadata },
                                    customer_id: customer.id
                                }).then(async ({ cart }) => {
                                    // console.log(cart)
                                    let int_crt = intCart ? intCart : {};
                                    let str_id = product.metadata.store.id;
                                    int_crt[str_id] = cart.id;
                                    setIntCart(int_crt);
                                    return cart.id
                                })
                            });
                        } else {
                        }
                    });
            }
        }



        if (!cart_id || cart_id === '') return null
        return cart_id
    }

    const RetrieveInternalCart = async (product) => {
        let updatedCart = null;
        let cart_id = await FetchInternalCart(product);
        setCartID(cart_id);
    }

    const AddItem2InternalCart = async (product, qty) => {
        let cart_id = await FetchInternalCart(product);
        let updatedCart = null;
        // console.log(cart_id)
        if (cart_id) {
            updatedCart = await medusa.carts.retrieve(cart_id)
                .then(async ({ cart }) => {
                    if (product && product?.variants && product?.variants.length) {
                        // Check if the item already exists in the cart
                        const existingItem = cart.items.find(item => item.variant_id === product.variants[0].id);

                        if (existingItem) {
                            // If the item exists and its quantity is >= 1, update it by one
                            if (existingItem.quantity >= 1) {
                                return await toast.promise(
                                    medusa.carts.lineItems.update(cart.id, existingItem.id, { quantity: existingItem.quantity + 1 }),
                                    {
                                        pending: `${product.title} Added to cart`,
                                        success: 'Cart Updated 👌',
                                        error: 'Cart Update Failed 🤯'
                                    }
                                )
                            }
                        } else {
                            // If the item doesn't exist, add it to the cart
                            return await toast.promise(
                                medusa.carts.lineItems.create(cart.id, { variant_id: product.variants[0].id, quantity: qty }),
                                {
                                    pending: `${product.title} Added to cart`,
                                    success: 'Cart Updated 👌',
                                    error: 'Cart Update Failed 🤯'
                                }
                            )
                        }
                    }
                })
        }





        if (!cart_id || cart_id === '') return null
        return updatedCart.cart;
    }


    const RemoveItemFromInternalCart = async (product, variantId) => {
        console.log(`Attempting to remove item ${variantId} from cart`);
        let cart_id = await FetchInternalCart(product);
        let updatedCart = null;

        if (cart_id) {
            updatedCart = await toast.promise(
                medusa.carts.lineItems.delete(cart_id, product.variants[0].id),
                {
                    pending: `Removing ${product.title} from cart`,
                    success: `Removed ${product.title} from cart 👌`,
                    error: `Removing ${product.title} from cart Failed 🤯`
                }
            )

        }

        if (!cart_id || cart_id === '') return null
        return updatedCart.cart;
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
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            console.log("Payment Session not set");
        }
    };

    useEffect(() => {
        if (custData &&
            cart &&
            cart.shipping_address_id &&
            cart.payment_sessions.length <= 0 &&
            cart.shipping_address
        ) {
            CreatePaymentSess(cart);
        }
    }, [cart])

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
                    setCart(cart);
                });
        } else {
            console.log("Please your Shipping Address first");
        }
    };

    // update shipping address 
    const UpdateShippingAddress = (address) => {
        // console.log(custData.shipping_addresses);
        if (custData && cart_id) {
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
                })
        }
        else {

            console.log("Shipping Address Already Set");
        }
    };

    const gen_url = (url, nw_pth) => {
        let base = url.split('/');
        if (base[base.length - 1] === 'address' || base[base.length - 1] === 'shipping') {
            base[base.length - 1] = nw_pth;
        }
        else if (nw_pth === '' && (base[base.length - 1] === 'address' || base[base.length - 1] === 'shipping')) {
            base = base.slice(base.length - 1)
        }
        else if (base[base.length - 1] === 'show') {
            base.push(nw_pth)
        }
        else if (base[base.length - 1] === '' && base[base.length - 2] === 'show') {
            base[base.length - 1] = nw_pth;
        }
        console.log(base, url, nw_pth)
        return base.join('/')
    }

    const AutoSaveToolbar = () => (
        <Toolbar>
            <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
                {location && location.pathname.split('/')[location.pathname.split('/').length - 1] === 'address' && (
                    <>{/* add shipipng address form button */}
                        {cart && cart.shipping_address_id && cart.shipping_address ? null : (
                            null
                        )}
                        <SaveButton
                            sx={{
                                textTransform: 'capitalize'
                            }}
                            color="primary" label={cart && cart.shipping_address_id && cart.shipping_address ? ('Update address') : ('Add new address')} icon=' '


                        // disabled={
                        //     cart && cart.shipping_address_id && cart.shipping_address
                        //         ? true
                        //         : false
                        // }
                        />

                        {/* add shipipng option form button */}
                        {cart && cart.payment_sessions && cart.payment_sessions.length > 0 ? null : (
                            null
                        )}
                        <SaveButton
                            alwaysEnable={
                                cart && cart.shipping_methods && cart.shipping_methods.length > 0
                                    ? false
                                    : true
                            }
                            // fullWidth

                            color="primary"
                            variant="contained"
                            label={"Next: Shipping"}
                            icon=' '
                            onClick={() => {

                                ListShippingOptions(cart);
                                redirect(gen_url(location.pathname, 'shipping'))
                            }}
                            sx={{ color: "#fff", textTransform: 'capitalize' }}
                        // disabled={
                        //     cart && cart.shipping_methods && cart.shipping_methods.length > 0
                        //         ? true
                        //         : false
                        // }
                        />
                    </>

                )}

                {location && location.pathname.split('/')[location.pathname.split('/').length - 1] === 'shipping' && (<>{/* add selected option form button */}
                    {cart && cart.payment_sessions && cart.payment_sessions.length > 0 ? (
                        null
                    ) : (
                        null
                    )}

                    <SaveButton
                        alwaysEnable={
                            cart && cart.shipping_methods && cart.shipping_methods.length > 0
                                ? false
                                : true
                        }
                        // fullWidth

                        color="primary"
                        variant="contained"
                        label={cart && cart.shipping_methods && cart.shipping_methods.length > 0 ? "Update Shipping method" : "Add Shipping method"}
                        icon=' '
                        onClick={() => {
                            ListShippingOptions(cart);
                        }}
                        sx={{ color: "#fff", textTransform: 'capitalize' }}
                    // disabled={
                    //     cart && cart.shipping_methods && cart.shipping_methods.length > 0
                    //         ? true
                    //         : false
                    // }
                    />

                    {/* Next/close form button */}
                    {cart && cart.shipping_address_id && cart.shipping_address ?
                        (
                            null

                        ) : null}
                    <SaveButton
                        alwaysEnable={
                            cart && cart.shipping_methods && cart.shipping_methods.length > 0 && cart.shipping_address_id && cart.shipping_address
                                ? true
                                : false
                        }
                        // fullWidth

                        color="primary"
                        variant="contained"
                        label="Next"
                        icon=' '
                        onClick={handleConfirm}
                        sx={{ color: "#fff", textTransform: 'capitalize' }}
                        disabled={
                            cart && cart.shipping_methods && cart.shipping_methods.length > 0 && cart.shipping_address_id && cart.shipping_address
                                ? true
                                : false
                        }
                    />
                </>)}


            </Stack>
        </Toolbar>
    );

    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    const handleOpenForm = () => {
        setOpenShipping(true);
        redirect(gen_url(location.pathname, 'address'))
    };
    const handleDialogClose = () => setOpenShipping(false);
    const handleConfirm = () => {
        setOpenShipping(false);
        redirect(gen_url(location.pathname, ''))
    };

    const renderPaymentButton = (cart, componentProps) => {
        switch (cart?.payment_session?.provider_id) {
            case 'paystack': return <PaystackButton
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
            />;
            default: return <button disabled>
                Not available
            </button>
        }
    }


    return (
        <>
            <Dialog
                open={openPayment}
                onClose={cancelPayment}
                PaperProps={{
                    style: {
                        borderRadius: '20px', padding: '10px', minWidth: '340px', boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff", minHeight: '130px'
                    }
                }}
                BackdropProps={{ invisible: true }}
            >
                {
                    cart && cart.id ? (<><span className='paymet__details--close cursor-pointer' onClick={cancelPayment}>
                        <CloseIcon sx={{ fontSize: '30px' }} />
                    </span>

                        <div className='payment__details' >


                            <div className='payment__details--Top'>
                                <h2>{currentProduct && currentProduct.metadata.store && currentProduct.metadata.store.name ? (currentProduct.metadata.store.name) : (store && store?.name ? (store?.name) : (null))}</h2>
                                <span className='sold--by'>
                                    <p>Ships and sold by</p>
                                    <span>
                                        {currentProduct && currentProduct.metadata.store && currentProduct.metadata.store.name ? (currentProduct.metadata.store.name) : (store && store?.name ? (store?.name) : (null))}
                                        <img className='ml-[-.2rem] mt-[-.2rem]' src={yellowLine} alt='avenue' />
                                    </span>
                                </span>
                            </div>

                            <span className='delivery--location'>
                                Delivery Location
                            </span>

                            <div className='location' onClick={handleOpenForm}>
                                <span className='location--name'>
                                    <img className='w-[30px] h-[30px]' src={location} />
                                    <span>
                                        <h3>
                                            {cart && cart.shipping_address && cart.shipping_address.address_1 ? (`${cart.shipping_address.address_1}`) : ('Not Set')}
                                        </h3>
                                        <p>{`${cart && cart.shipping_address && cart.shipping_address.country_code ? (`${cart.shipping_address.country_code}`) : ('Not Set')}, ${cart && cart.shipping_address && cart.shipping_address.city ? (`${cart.shipping_address.city}`) : ('Not Set')}`}</p>
                                    </span>
                                </span>
                                <span>
                                    <ChevronRightIcon className='w-[30px] h-[36px]' />
                                </span>
                            </div>

                            <div className='payment--method'>
                                <h2>Payment Method</h2>
                                <Form
                                    sx={{
                                        fontWeight: '600',
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
                                                direction: 'row-reverse !important'
                                            },
                                            '& .MuiTypography-root': {
                                                fontWeight: '600 !important',

                                            }
                                        }}
                                        source="payment_session"
                                        label="Select payment method"
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
                                        defaultValue={cart && cart?.payment_session && cart?.payment_session?.provider_id ? (cart?.payment_session?.provider_id) : (null)}
                                    />
                                </Form>

                            </div>


                            {/* Shipping  */}
                            <div className='free--shipping'>
                                <span>
                                    <img src={lorry} alt='lorry' />

                                    <h2>
                                        Free Shipping
                                    </h2>
                                </span>

                                <p>
                                    Usually ships within 2-3 business days
                                </p>

                            </div>

                            {/* Order history  */}
                            <div className='order--info'>
                                <h2>
                                    Order Info
                                </h2>

                                {/* subtotal  */}
                                <div className="order--summation">
                                    <span className="sum--name">Subtotal</span>
                                    <span className="sum--digit">
                                        <span className="uppercase mr-[3px]">
                                            {cart && cart.region && cart.region.currency_code}
                                        </span>
                                        {cart && cart.subtotal ? Number((cart.subtotal / 100).toFixed(2)).toLocaleString() : 0}
                                    </span>
                                </div>

                                {/* shipping cost  */}
                                <div className="order--summation">
                                    <span className="sum--name">Shopping Cost</span>
                                    <span className="sum--digit">+ $10.00</span>
                                </div>

                                {/* Total  */}
                                <div className="order--summation">
                                    <span className="sum--name">Total</span>
                                    <span className="sum--digit text-[16px]">
                                        <span className="uppercase mr-[3px]">
                                            {cart && cart.region && cart.region.currency_code}
                                        </span>
                                        {cart && cart.total ? Number((cart.total / 100 + (10)).toFixed(2)).toLocaleString() : 0}
                                    </span>
                                </div>
                            </div>

                        </div>


                        <div className='flex items-center gap-x-4'>
                            <div className='product__details--Bottom' >
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
                                    renderPaymentButton(cart, componentProps)
                                ) : null}
                            </div>
                            <div >
                                <button className='bg-black text-white px-[2rem] py-[1rem] rounded-[20px] text-[14px] font-[500] mt-[1rem]'
                                    onClick={() => { handleRemoveItem(currentProduct.variants[0].id) }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
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
                                    // borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                                    background: theme === 'light' ? '#fff' : '#222',
                                    color: theme === 'light' ? '#222' : '#fff',
                                },
                                '& .MuiInputBase-root': {
                                    borderColor: theme === 'light' ? '#222' : '#fff',
                                },
                                '& .Mui-selected': {
                                    borderColor: theme === 'light' ? '#222' : '#fff',
                                }
                            }}
                            content={
                                <Stack>
                                    <TabbedForm
                                        toolbar={<AutoSaveToolbar />}
                                        onSubmit={completePayment}
                                        syncWithLocation={true}
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

                                            '& .form-tab': {
                                                background: theme === 'light' ? '#fff' : 'rgba(68, 68, 68, 0.2)',
                                                boxShadow: theme === 'light' ? '0 5px 4px rgba(0, 0, 0, 0.01)!important;' : '0 5px 4px rgba(0, 0, 0, 0.01)!important',
                                                color: theme === 'light' ? '#222' : '#fff',
                                            }
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
                                            // validate={required()}

                                            />
                                        </FormTab>
                                    </TabbedForm>
                                </Stack>
                            }
                            onConfirm={handleConfirm}
                            onClose={handleDialogClose}
                        /></>) : (<div className='spinner justify-center items-center flex my-0 mx-0'>

                            <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                        </div>)
                }

            </Dialog>
        </>
    );
};



const ProcessingDialog = ({ openProcessing, handleCompleted, theme }) => {


    return (
        <div>

            <Dialog
                open={openProcessing}
                BackdropProps={{ invisible: true }}

                PaperProps={{ style: { borderRadius: '20px', padding: '10px', minWidth: '340px', boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff" } }}
            >
                <span onClick={handleCompleted}>
                    <ChevronRightIcon className='w-[30px] h-[36px] absolute' />
                </span>

                <div className='processing'>
                    <img src={processing} alt='processing' />
                    <h2>Processing...</h2>
                    <p>Your request is being Processed</p>
                </div>

            </Dialog>
        </div>
    );
}


const CompletedDialog = ({ openCompleted, cancelCompleted, theme }) => {


    return (
        <div>

            <Dialog
                open={openCompleted}
                PaperProps={{ style: { borderRadius: '20px', padding: '10px', minWidth: '340px', boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff" } }}
                BackdropProps={{ invisible: true }}

            >
                <div className='completed'>
                    <img src={thankYou} alt='processing' />
                    <h2>Completed</h2>
                    <p>Your request has been completed</p>
                </div>

                <div className='thank--you'>
                    <p>Thanks for your purchase</p>
                    <div className='product__details--Bottom' onClick={cancelCompleted}>
                        <button>
                            Back to home
                        </button>
                    </div>
                </div>

            </Dialog>
        </div>
    );
}


const CollectionsDialog = ({ openCompleted, cancelCompleted, theme }) => {


    return (
        <div>

            <Dialog
                open={openCompleted}
                PaperProps={{ style: { borderRadius: '20px', padding: '10px', minWidth: '340px', boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff" } }}
                BackdropProps={{ invisible: true }}

            >
                <div className='completed'>
                    <img src={thankYou} alt='processing' />
                    <h2>Completed</h2>
                    <p>Your request has been completed</p>
                </div>

                <div className='thank--you'>
                    <p>Thanks for your purchase</p>
                    <div className='product__details--Bottom' onClick={cancelCompleted}>
                        <button>
                            Back to home
                        </button>
                    </div>
                </div>

            </Dialog>
        </div>
    );
}



export const PurchaseDialog = ({ openPurchase, handleClosePurchase, handleClosePurchase1, openPurchase1, setOpenPurchase1, mediaUrl, product, theme }) => {
    const [openPayment, setOpenPayment] = React.useState(false);
    const [purchase, setPurchase] = React.useState(true);
    const [openProcessing, setOpenProcessing] = React.useState(false);
    const [openCompleted, setOpenCompleted] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isMuted, setIsMuted] = React.useState(true);
    const [custData, setCustData] = useStore("customer");
    const [cart, setCart] = React.useState(null);
    const [gcart, setGCart] = React.useState(null);
    const { currentUser } = React.useContext(AuthContext)
    const [cart_id, setCartID] = useStore("cart_id");
    const [g_cart_id, setGCartID] = useStore("gcart_id");
    const currentProduct = product || mediaUrl;
    const [currProdVar, setCurrProdVar] = React.useState(null)
    const { pathname } = useLocation();
    const redirect = useRedirect();
    const [intCart, setIntCart] = useStore("int_carts");
    const { data: identity, isLoading: identityLoading } = useGetIdentity();
    

    const convertToDecimal = (amount) => {
        return Math.floor(amount) / 100
    }

    const formatPrice = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            // TODO assuming region is already defined somewhere
            currency: cart?.region.currency_code,
        }).format(convertToDecimal(amount))
    }

    React.useEffect(() => {

        medusa.auth
            .authenticate({
                email: identity.email,
                password: import.meta.env.VITE_AUTH_PASSWORD,
            })
            .then(({ customer }) => {
                setCustData(customer);
                RetrieveInternalCart(currentProduct);
                if (!g_cart_id) {
                    medusa.carts.create().then(({ cart }) => {
                        setGCartID(cart.id);
                        setGCart(cart)
                    });
                } else {
                    medusa.carts.retrieve(g_cart_id).then(({ cart }) => setGCart(cart));
                }
            });

    }, []);

    React.useEffect(() => {
        if (currentProduct) {
            RetrieveInternalCart(currentProduct);
        }
    }, [currentProduct])

    React.useEffect(() => {
        if (cart_id) {
            medusa.carts.retrieve(cart_id).then(({ cart }) => setCart(cart));
        }
    }, [cart_id]);

    const RetrieveInternalCart = async (product) => {
        let updatedCart = null;
        let cart_id = await FetchInternalCart(product);
        setCartID(cart_id);
        if (cart_id) {
            medusa.carts.retrieve(cart_id).then(({ cart }) => {
                console.log(cart);
                setCart(cart)
            });
        }
    }

    const FetchInternalCart = async (product) => {
        let cart_id = '';
        // console.log(product)
        if (product && product.metadata && product.metadata.store && product.metadata.store.id) {
            if (intCart && Object.keys(intCart).includes(product.metadata.store.id)) {
                cart_id = intCart[product.metadata.store.id];
            }
            else {
                cart_id = await medusa.auth
                    .authenticate({
                        email: identity.email,
                        password: import.meta.env.VITE_AUTH_PASSWORD,
                    })
                    .then(async ({ customer }) => {
                        if (!cart_id || cart_id === '') {
                            return await medusa.carts.create().then(async ({ cart }) => {
                                return await medusa.carts.update(cart.id, {
                                    context: { ...cart.context, ...product?.metadata },
                                    customer_id: customer.id
                                }).then(async ({ cart }) => {
                                    // console.log(cart)
                                    let int_crt = intCart ? intCart : {};
                                    let str_id = product.metadata.store.id;
                                    int_crt[str_id] = cart.id;
                                    setIntCart(int_crt);
                                    return cart.id
                                })
                            });
                        } else {
                        }
                    });
            }
        }



        if (!cart_id || cart_id === '') return null
        return cart_id
    }

    const AddItem2InternalCart = async (product, qty) => {
        let cart_id = await FetchInternalCart(product);
        let updatedCart = null;
        // console.log(cart_id)
        if (cart_id) {
            updatedCart = await medusa.carts.retrieve(cart_id)
                .then(async ({ cart }) => {
                    if (product && product?.variants && product?.variants.length) {
                        // Check if the item already exists in the cart
                        const existingItem = cart.items.find(item => item.variant_id === product.variants[0].id);

                        if (existingItem) {
                            // If the item exists and its quantity is >= 1, update it by one
                            if (existingItem.quantity >= 1) {
                                return await toast.promise(
                                    medusa.carts.lineItems.update(cart.id, existingItem.id, { quantity: existingItem.quantity + 1 }),
                                    {
                                        pending: `${product.title} Added to cart`,
                                        success: 'Cart Updated 👌',
                                        error: 'Cart Update Failed 🤯'
                                    }
                                )
                            }
                        } else {
                            // If the item doesn't exist, add it to the cart
                            return await toast.promise(
                                medusa.carts.lineItems.create(cart.id, { variant_id: product.variants[0].id, quantity: qty }),
                                {
                                    pending: `${product.title} Added to cart`,
                                    success: 'Cart Updated 👌',
                                    error: 'Cart Update Failed 🤯'
                                }
                            )
                        }
                    }
                })
            setCart(updatedCart.cart)
        }





        if (!cart_id || cart_id === '') return null
        return updatedCart.cart;
    }


    const RemoveItemFromInternalCart = async (product, variantId) => {
        console.log(`Attempting to remove item ${variantId} from cart`);
        let cart_id = await FetchInternalCart(product);
        let updatedCart = null;

        if (cart_id) {
            updatedCart = await toast.promise(
                medusa.carts.lineItems.delete(cart_id, product.variants[0].id),
                {
                    pending: `Removing ${product.title} from cart`,
                    success: `Removed ${product.title} from cart 👌`,
                    error: `Removing ${product.title} from cart Failed 🤯`
                }
            )
            setCart(updatedCart.cart)

        }

        if (!cart_id || cart_id === '') return null
        return updatedCart.cart;
    };


    const addItem2Cart = (variantId, qty) => {
        // console.log(custData)
        AddItem2InternalCart(currentProduct, qty);
        if (custData && cart && cart_id && gcart && g_cart_id) {
            toast.promise(
                medusa.carts.lineItems.create(g_cart_id, { variant_id: variantId, quantity: qty }),
                {
                    pending: `${currentProduct.title} Added to cart"`,
                    success: 'Cart Updated 👌',
                    error: 'Cart Update Failed 🤯'
                }
            )

        }

    };


    const add2Cart = async (variantId, qty) => {
        if (custData && cart && cart_id && gcart && g_cart_id) {
            // Check if the item already exists in the cart
            console.log(gcart)
            const existingItem = gcart.items.find(item => item.variant_id === variantId);

            const in_cart = await AddItem2InternalCart(currentProduct, qty);


            if (existingItem) {
                // If the item exists and its quantity is more than 1, update it to 1
                if (existingItem.quantity >= 1) {
                    medusa.carts.lineItems.update(g_cart_id, existingItem.id, { quantity: existingItem.quantity + 1 });
                    // await toast.promise(
                    //     medusa.carts.lineItems.update(g_cart_id, existingItem.id, { quantity: 1 }),
                    //     {
                    //         pending: `${currentProduct.title} Added to cart`,
                    //         success: 'Cart Updated 👌',
                    //         error: 'Cart Update Failed 🤯'
                    //     }
                    // )
                }
            } else {
                // If the item doesn't exist, add it to the cart
                medusa.carts.lineItems.create(g_cart_id, { variant_id: variantId, quantity: qty });
                // await toast.promise(
                //     medusa.carts.lineItems.create(g_cart_id, { variant_id: variantId, quantity: qty }),
                //     {
                //         pending: `${currentProduct.title} Added to cart`,
                //         success: 'Cart Updated 👌',
                //         error: 'Cart Update Failed 🤯'
                //     }
                // )
            }

            // Fetch the updated cart
            const updatedCart = await medusa.carts.retrieve(g_cart_id);
            setGCart(updatedCart.cart);
        }


    };





    // console.log(currentProduct);

    const handleCompleted = () => {
        setOpenCompleted(true);
        setOpenProcessing(false)
        setOpenPayment(false)
        setOpenPurchase1(false);
    };


    const cancelCompleted = () => {
        setOpenCompleted(false);
        setOpenProcessing(false);
        setOpenPayment(false);
        handleClosePurchase1();
        setPurchase(true)
    }

    const handleProcessing = () => {
        setOpenProcessing(true);
        setOpenPayment(false)
        setOpenPurchase1(false);

    };


    const cancelPayment = () => {
        setOpenPayment(false);
        setPurchase(true);
    }

    const handleOpenPayment = () => {
        setOpenPayment(true);
        setPurchase(false);
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={openPurchase}
                onClose={handleClosePurchase}
                BackdropProps={{ invisible: false }}
                PaperProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}

            >


                {/* Purchase dialog */}
                {purchase && (
                    <Dialog
                        open={openPurchase1}
                        PaperProps={{ style: { borderRadius: '20px', padding: '10px', minWidth: '340px', boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff" } }}
                        BackdropProps={{ invisible: true }}
                    >
                        <div className='product__details--Top'>
                            <span className='cursor-pointer absolute left-4 top-6' onClick={handleClosePurchase1}>
                                <ArrowBackIosIcon />
                            </span>

                            <span className='product--price' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                {cart && product ? formatPrice(product.variants[0].prices.filter((curr) => { return curr.currency_code === cart.region.currency_code })[0].amount) : 0}
                            </span>
                        </div>

                        <div className='mx-auto pt-[1rem]'>
                            <SmallPHorizontalCards post={product} />
                        </div>
                        <div className='product__details--Middle mt-[2px]'>
                            <span className="brand--name">
                                {currentProduct?.title}
                            </span>

                            <span className="product--socials">
                                <span className="share">
                                    <img src={share} />
                                </span>

                                {/* <span className="fb-ig">
                                    <img src={FB} />
                                </span> */}

                                <span className="fb-ig">
                                    <img src={IG} />
                                </span>
                            </span>
                        </div>

                        <div className='product__details--MiddleText'>
                            {currentProduct?.description}
                        </div>

                        <div className='mx-auto pb-[1rem]'>
                            <SmallPHorizontalVariantCards post={product} />
                        </div>


                        <div className='flex items-center justify-center gap-x-[23px]'>
                            <button onClick={() => {
                                addItem2Cart(currentProduct?.variants[0].id, 1);
                            }}>
                                <img src={cartIcon} alt='cart' />
                            </button>
                            <div className='product__details--Bottom mt-0 h-[50px]' onClick={() => {
                                console.log(currentProduct?.title + " Added to cart");
                                add2Cart(currentProduct?.variants[0].id, 1);
                                handleOpenPayment()
                            }}>
                                <button>
                                    Buy Now
                                </button>
                            </div>
                        </div>

                    </Dialog>
                )}

                {/* Payment dialog */}
                {openPayment && (
                    <PaymentDialog openPayment={openPayment} cancelPayment={cancelPayment} handleProcessing={handleProcessing} currentProduct={currentProduct} cart={cart} custData={custData} cart_id={cart_id} setCart={setCart} setCustData={setCustData} setCartID={setCartID} handleCompleted={handleCompleted} theme={theme} />
                )}

                {/* Processing dialog */}
                <ProcessingDialog openProcessing={openProcessing} handleCompleted={handleCompleted} theme={theme} />

                {/* Completed dialog */}

                <CompletedDialog openCompleted={openCompleted} cancelCompleted={cancelCompleted} theme={theme} />

            </Dialog>
        </div>
    );
};



