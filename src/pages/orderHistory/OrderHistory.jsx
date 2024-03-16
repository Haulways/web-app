import { Collapse, Dialog, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './order.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from '../../components/search/SearchBox';
import backIcon from "../../assets/hauls/backIcon.png";
import ArrowUp from "../../assets/history/ArrowUp.png";
import ArrowDown from "../../assets/history/ArrowDown.png";
import { useStore } from 'react-admin';
import Medusa from '@medusajs/medusa-js';
import { AuthContext } from '../../components/context/AuthContext';
import { DFooter } from '../../components';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { useGetIdentity, useGetOne } from 'react-admin';
// import { useOrders } from "medusa-react"


const medusa = new Medusa({
    baseUrl: "https://ecommerce.haulway.co",
});


const OrderHistory = () => {
    const [open, setOpen] = React.useState(true);
    const { currentUser } = React.useContext(AuthContext);
    const [openStates, setOpenStates] = React.useState([]);
    const [openState, setOpenState] = React.useState(false);
    const [cart, setCart] = React.useState(null);
    const [custOrders, setCustOrders] = React.useState([]);
    const [custData, setCustData] = useStore("customer");
    const { theme } = React.useContext(ThemeContext);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();

    const LoadOrders = async () => {
        let all_orders = await Promise.all(custOrders.map(async (ord) => {
            return await medusa.orders.retrieve(ord.id).then(({ order }) => {
                return order
            });
        }))

        if (all_orders && all_orders.length) {
            setCustOrders(all_orders);
        }
    }


    React.useEffect(() => {
        if (custOrders && custOrders.length && !custOrders[0].shipping_address && !custOrders[0].shipping_address?.id) {
            LoadOrders()
        }
    }, [custOrders])


    React.useEffect(() => {
        if (identity) {
            medusa.auth
                .authenticate({
                    email: identity.email,
                    password: import.meta.env.VITE_AUTH_PASSWORD,
                })
                .then(({ customer }) => {
                    setCustData(customer);
                    console.log(customer);
                    setCustOrders(customer.orders);
                    medusa.customers.listOrders()
                        .then(({ orders, limit, offset, count }) => {
                            console.log(orders)
                            setCustOrders(orders);
                            // console.log(orders)
                        })
                });
        }


    }, [identity]);

    const cellStyle = {
        fontSize: '10px',
        padding: '10px',
        fontWeight: '600',
        color: '#fff',
        borderBottom: 'none',
    };

    const cellBody = {
        fontSize: '10px',
        padding: '10px',
        color: '#000',
        borderBottom: 'none',
    };




    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero indexed
        const year = date.getFullYear().toString().substr(-2); // Get last two digits of year

        return `${month}/${day}/${year}`;
    }

    const HistoryCard = ({ item, order }) => (
        <div className="history--card flex">
            <div className="card--left flex w-[55%] tablet:w-[42%] laptop:w-[43%]">
                <div className="history--img">
                    <img src={item.thumbnail} alt='product-image' />
                </div>
                <div className="card--details">
                    <h3>{item.title}</h3>
                    <p>Office</p>
                </div>
            </div>
            <div className="w-[10%] tablet:w-[20%] laptop:w-[14%] font-[600]" style={cellBody}>{item.quantity}</div>
            <div className="w-[20%] tablet:w-[20%] laptop:w-[27%] font-[600]" style={cellBody}>
                <span className="uppercase mr-[3px]">
                    {order && order.currency_code}
                </span>
                {item && item.unit_price ? Number((item.unit_price / 100).toFixed(2)).toLocaleString() : 0}
            </div>
            <div className="w-[20%] tablet:w-[20%] laptop:w-[15%] font-[600]" style={cellBody}>
                <span className="uppercase mr-[3px]">
                    {order && order.currency_code}
                </span>
                {item && item.total ? Number((item.total / 100).toFixed(2)).toLocaleString() : 0}
            </div>
        </div>
    );

    const TotalCard = ({ order }) => (
        <div className="history--card flex flex-col gap-y-[20px]">
            <div className="history--summation">
                <div>Subtotal</div>
                <div>
                    <span className="uppercase mr-[3px]">
                        {order && order.currency_code}
                    </span>
                    {order && order.subtotal ? Number((order.subtotal / 100).toFixed(2)).toLocaleString() : 0}
                </div>
            </div>

            <div className="history--summation">
                <div>Shipping Cost</div>
                <div>+
                    <span className="uppercase mr-[3px]">
                        {order && order.currency_code}
                    </span>
                    {order && order.shipping_total ? Number((order.shipping_total / 100).toFixed(2)).toLocaleString() : 0}
                </div>
            </div>

            <div className="history--summation">
                <div>Sum Total</div>
                <div className="font-[700] text-[12px]">
                    <span className="uppercase mr-[3px]">
                        {order && order.currency_code}
                    </span>
                    {order && order.paid_total ? Number((order.paid_total / 100).toFixed(2)).toLocaleString() : 0}
                </div>
            </div>
        </div>
    );


    return (
        <>
            <div className='feed--page'>

                <div className='my--orders'>
                    <h3 className='header'>Order History</h3>
                    <p className='para'>Here you can manage your orders</p>

                    <div className='mb-[30.78px]'>
                        <SearchBox placeholder='Search' />
                    </div>
                </div>

                <TableContainer component={Paper}
                    sx={{
                        borderRadius: '0',
                        boxShadow: 'none',
                        paddingBottom: '4rem',
                        background: 'none !important',
                        '& .MuiPaper-root.MuiPaper-elevation': {
                        },
                        '& .MuiPaper-elevation': {
                            background: 'none !important'
                        }
                    }}
                >
                    <Table sx={{ minWidth: '320px' }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: theme === "light" ? "#222" : "none", }}>
                            <TableRow>
                                <TableCell align="center" className="mobile:w-[30%] tablet:w-[20%]" sx={cellStyle}>Order Id</TableCell>
                                <TableCell align="center" className="mobile:w-[15%] tablet:w-[20%]" sx={cellStyle}>Date</TableCell>
                                <TableCell align="right" className="mobile:w-[5%] tablet:w-[20%] " sx={cellStyle}>Item</TableCell>
                                <TableCell align="center" sx={cellStyle}>Total amount</TableCell>
                                <TableCell align="center" sx={cellStyle}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    {custOrders && custOrders.map((order, index) => (

                        <React.Fragment key={index}>
                            <Table sx={{ minWidth: '320px' }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left" sx={{ ...cellBody }}>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => {
                                                    let newOpenStates = [...openStates];
                                                    newOpenStates[index] = !newOpenStates[index];

                                                    setOpenStates(newOpenStates.map((dt, indx) => {
                                                        if (indx !== index) {
                                                            return false
                                                        }
                                                        else {
                                                            return dt
                                                        }
                                                    }));
                                                }}
                                            >
                                                {openStates[index] ? (
                                                    <img src={ArrowUp} alt="Icon-up" />
                                                ) : (
                                                    <img src={ArrowDown} alt="Icon-down" />
                                                )}
                                            </IconButton>
                                            #{order.display_id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ ...cellBody, fontWeight: '500' }}>
                                            {formatDate(order.created_at)}
                                        </TableCell>
                                        <TableCell align="justify" sx={{ ...cellBody, fontWeight: '500' }}>
                                            {order.items.length}
                                        </TableCell>
                                        <TableCell align="center" sx={{ ...cellBody, fontWeight: '500' }}>
                                            <span className="uppercase mr-[3px]">
                                                {order && order.currency_code}
                                            </span>
                                            {order && order.paid_total ? Number((order.paid_total / 100).toFixed(2)).toLocaleString() : 0}
                                        </TableCell>
                                        <TableCell align="center" sx={{ ...cellBody, fontWeight: '500' }} >
                                            {order.status === "successful" && (

                                                <span className="bg-[#C7FFC5] rounded-[6px] py-[5px] px-[6px]">
                                                    Shipped
                                                </span>
                                            )}
                                            {order.status === "pending" && (

                                                <span className="bg-[#ffe23d] rounded-[6px] py-[5px] px-[6px]">
                                                    Pending
                                                </span>
                                            )}

                                            {order.status === "canceled" && (

                                                <span className="bg-[#FF4040] text-white rounded-[6px] py-[5px] px-[6px]">
                                                    Canceled
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                            <Collapse in={openStates[index]} timeout='auto' unmountOnExit>

                                {/* table header  */}
                                <div className="flex bg-black">
                                    <div className="w-[40%] tablet:w-[25%] laptop:w-[25%]" style={cellStyle}>Product</div>
                                    <div className="w-[20%]" align="right" style={cellStyle}>Qty</div>
                                    <div align="right" className="w-[15%] tablet:w-[20%] " style={cellStyle}>Price</div>
                                    <div align="right" className="w-[17%] tablet:w-[20%] laptop:w-[25%]" style={cellStyle}>Total</div>
                                </div>

                                {/* table body  */}
                                <div className="px-[10px] pt-[10px]">
                                    {/* table rows  */}
                                    {order.items && order.items.length > 0 && order.items.map((item, index) => (
                                        <HistoryCard key={index} item={item} order={order} />
                                    ))}


                                    <TotalCard order={order} />
                                </div>

                                {/* bottom table  */}
                                {
                                    order && order.shipping_address && order.shipping_address.address_1 && (
                                        <Table style={{ minWidth: '320px', marginTop: '20px', borderBottom: '1px solid #666' }} aria-label="simple table">
                                            <tr className="bg-black">
                                                <th align="center" style={cellStyle}>Delivery location</th>
                                                <th align="center" style={cellStyle}>Shipping method</th>
                                                <th align="center" style={cellStyle}>Payment method</th>
                                            </tr>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center" sx={cellBody}>
                                                        {order.shipping_address.address_1}, {order.shipping_address.city}.
                                                    </TableCell>
                                                    <TableCell align="center" sx={cellBody}>
                                                        {order.shipping_methods[0].shipping_option.name}
                                                    </TableCell>
                                                    <TableCell align="center" sx={cellBody} className='capitalize'>
                                                        {order.payments[0].provider_id}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>)
                                }


                            </Collapse>
                        </React.Fragment>
                    ))}

                </TableContainer>

                {custOrders && custOrders.length === 0 && (
                    <p className=' font-[500] flex items-center justify-center'>No Orders Yet</p>
                )}
            </div>
            <DFooter />
        </>
    );
};
export default OrderHistory;