import * as React from 'react';
import '../cart.css';
import { IconButton } from '@mui/material';
import addImage from '../../../assets/cart/add.png';
import removeIcon from '../../../assets/cart/remove.png';
import deleteIcon from '../../../assets/cart/delete.png';
import { toast } from 'react-toastify';
import { useStore } from 'react-admin';
import Medusa from '@medusajs/medusa-js';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: "https://ecommerce.haulway.co",
  });

export const CartCard = ({ item, DelItemFromCart, increaseQty, decreaseQty, cart }) => {
// console.log(cart);
    
    return (
        <>
            <div className='product--card'>
                <div className='card--left'>
                    <div className='card--img'>
                        <img src={item.thumbnail} alt='product' />
                    </div>
                    <div className='card--details'>
                        <h3>
                            {item.title}
                        </h3>
                        <p>
                            {item.variant.product.handle}
                        </p>
                        <div className='increment--drecrement'>
                            <IconButton sx={{ padding: 0 }} onClick={() => increaseQty(item.id, item.quantity)}>
                                <img src={addImage} alt='add'
                                    
                                />
                            </IconButton>
                            <span>
                                {item.quantity}
                            </span>
                            <IconButton sx={{ padding: 0 }} onClick={() => decreaseQty(item.id, item.quantity)}>
                                <img src={removeIcon} alt='remove'
                                    
                                />
                            </IconButton>
                        </div>
                    </div>

                </div>

                <div className='card--right'>
                    <p className='product--price'>
                        <span className="uppercase mr-[3px]">
                            {cart && cart.region && cart.region.currency_code}
                        </span>
                        {Number((item.total / 100 + (10)).toFixed(2)).toLocaleString()}</p>
                    <IconButton sx={{ padding: 0 }}
                        onClick={() => {
                            toast(item.title + " Removed");
                            DelItemFromCart(item.id);
                        }}
                    >
                        <img src={deleteIcon} alt='delete' />
                    </IconButton>
                </div>
            </div>
        
        </>
    );
};



// export const addCart = () => {
//     const { currentUser } = useContext(AuthContext)
//     const [custData, setCustData] = useStore("customer");
//     const [cart, setCart] = React.useState(null);
//     const [cart_id, setCartID] = useStore("cart_id");

//     React.useEffect(() => {
//         medusa.auth
//             .authenticate({
//                 email: currentUser.email,
//                 password: "supersecret",
//             })
//             .then(({ customer }) => {
//                 setCustData(customer);
//                 if (!cart_id) {
//                     medusa.carts.create().then(({ cart }) => {
//                         setCartID(cart.id);
//                     });
//                 } else {
//                     medusa.carts.retrieve(cart_id).then(({ cart }) => setCart(cart));
//                 }
//             });
//     }, []);

//     const addItem2Cart = (variantId, qty) => {
//         if (custData && cart && cart_id) {
//             medusa.carts.lineItems
//                 .create(cart_id, {
//                     variant_id: variantId,
//                     quantity: qty,
//                 })
//                 .then(({ cart }) => {
//                     setCart(cart);
//                 });
//         }
//     };

//     return { custData, cart, addItem2Cart };
// };