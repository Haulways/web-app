import * as React from 'react';
import { NormalStoreCards, StoreCards } from '../../components/search/SearchCard';
import { Grid, IconButton, TextField } from '@mui/material';
import backIcon from '../../assets/hauls/backIcon.png';
import { useProducts } from 'medusa-react';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { DFooter } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { InfiniteList, TabbedShowLayout, WithListContext, useGetList, useRecordContext, useStore } from 'react-admin';
import { AuthContext } from '../../components/context/AuthContext';
import { GetStoreVendor } from '../post/Post';
import Medusa from '@medusajs/medusa-js';
import { useGetIdentity, useGetOne } from 'react-admin';
import StoreDetails from '../store-details';
import ProductList from '../products/ProductList';
import OrderList from '../orders/OrderList';
import { InfluencerStat } from '../../components/profile/Stat';
import { VendorsStat } from '../../components/profile/InfluencerStat';






const medusa = new Medusa({
	maxRetries: 3,
	baseUrl: "https://ecommerce.haulway.co",
});





const Store = () => {
	const [cart_id, setCartID] = useStore("cart_id");
	const [cart, setCart] = React.useState(null);
	const [region, setRegion] = React.useState(null);
	const { currentUser } = React.useContext(AuthContext)
	const record = useRecordContext();
	const [store, setStore] = React.useState(null);
	const [products, setProducts] = React.useState(null);
	const [productids, setProductIDs] = React.useState(null);
	// const { products: nw_prods, isLoading } = useProducts({ id: productids });
	const [custData, setCustData] = React.useState(null);
	const { theme } = React.useContext(ThemeContext);
	let navigate = useNavigate();
	const { id } = useParams();
	const { store: nw_store, vendor, vendorAcc, loading2, error2 } = GetStoreVendor(id || record?.id);
	const [input, setInput] = React.useState("");
	const [g_user, setG_User] = useStore("user");
	const { data: old_prod } = useGetList(
		"product",
		{ filter: { store_id: store?.id }, },
	);
	const { data: identity, isLoading: identityLoading } = useGetIdentity();

	React.useEffect(() => {
		if (record) {
			setStore(record)
		}

		return () => {

		}
	}, [record, id]);

	React.useEffect(() => {
		if (identity) {
			console.log(identity)
		}
	}, [identity])


	React.useEffect(() => {
		if (nw_store) {
			console.log(nw_store)
		}
		if (vendor) {
			console.log(vendor)
		}
		if (vendorAcc) {
			console.log(vendorAcc)
		}
	}, [nw_store, vendor, vendorAcc])




	React.useEffect(() => {
		if (identity) {
			medusa.auth
				.authenticate({
					email: identity.email,
					password: import.meta.env.VITE_AUTH_PASSWORD,
				})
				.then(({ customer }) => {
					setCustData(customer);
					if (!cart_id) {
						medusa.carts.create().then(({ cart }) => {
							setCartID(cart.id);
							setCart(cart)
						});
					} else {
						medusa.carts.retrieve(cart_id).then(({ cart }) => setCart(cart));
					}


				});
		}

	}, [identity]);

	React.useEffect(() => {
		if (input) {
			medusa.products.search({
				q: input
			})
				.then(({ hits }) => {
					if (hits.length && input) {
						// setProducts(hits)
					}
					else if (hits.length && !input) {
						medusa.products.list({
							expand: "variants",
							currency_code: region.currency_code,
						})
							.then(({ products, limit, offset, count }) => {
								// console.log(products)
								// setProducts(products)


							})
					}
				})

		}
	}, [input])


	React.useEffect(() => {
		if (cart) {
			//
			medusa.regions.retrieve(cart.region_id)
				.then(({ region }) => {
					console.log(region.id);
					setRegion(region)
				})
		}

	}, [cart])
	React.useEffect(() => {
		if (region) {

			medusa.products.list({
				expand: "variants.prices",
				id: productids,
				currency_code: region.currency_code,
			})
				.then(({ products, limit, offset, count }) => {
					setProducts(products)


				})
		}

	}, [region])

	// React.useEffect(() => {
	// 	if (nw_prods) {
	// 		setProducts(nw_prods)
	// 	}
	// }, [nw_prods])

	React.useEffect(() => {
		if (old_prod) {
			setProducts(old_prod)
			setProductIDs(old_prod.map(prod => prod.id))
		}
	}, [old_prod])

	React.useEffect(() => {
		if (products) {
			console.log(products)
		}
	}, [products])





	const convertToDecimal = (amount) => {
		return Math.floor(amount) / 100
	}

	const formatPrice = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			// TODO assuming region is already defined somewhere
			currency: region.currency_code,
		}).format(convertToDecimal(amount))
	}


	const mPostCarousel = {
		type: "slide",
		pauseOnHover: false,
		pagination: true,
		arrows: false,
	};

	const search = (
		<svg
			className="absolute w-[17px] h-[20px] top-[50%] left-[1rem] translate-y-[-50%]"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M9.579 6.31004e-07C8.07976 0.000801964 6.60162 0.353313 5.26339 1.0292C3.92515 1.70509 2.76414 2.6855 1.87367 3.89164C0.9832 5.09778 0.38811 6.496 0.13623 7.97393C-0.115651 9.45185 -0.0172969 10.9683 0.423386 12.4013C0.86407 13.8343 1.63479 15.1439 2.6736 16.2249C3.71242 17.3059 4.99035 18.1281 6.40468 18.6255C7.81902 19.1229 9.33031 19.2815 10.8171 19.0886C12.3039 18.8957 13.7247 18.3567 14.9653 17.515L20.8883 23.4332C21.0528 23.6097 21.2512 23.7513 21.4716 23.8496C21.692 23.9478 21.93 24.0006 22.1713 24.0048C22.4126 24.0091 22.6522 23.9647 22.876 23.8743C23.0998 23.784 23.303 23.6494 23.4737 23.4788C23.6443 23.3081 23.7788 23.1049 23.8692 22.8811C23.9596 22.6574 24.004 22.4177 23.9997 22.1764C23.9955 21.9351 23.9426 21.6972 23.8444 21.4767C23.7462 21.2563 23.6046 21.0579 23.428 20.8934L17.5099 14.9704C18.489 13.5294 19.0568 11.8487 19.1522 10.1092C19.2476 8.36962 18.8671 6.63695 18.0515 5.09746C17.236 3.55798 16.0162 2.26991 14.5234 1.37177C13.0306 0.473622 11.3212 -0.000631453 9.579 6.31004e-07ZM3.58892 9.58412C3.58892 7.99545 4.22002 6.47185 5.34337 5.3485C6.46673 4.22514 7.99033 3.59404 9.579 3.59404C11.1677 3.59404 12.6913 4.22514 13.8146 5.3485C14.938 6.47185 15.5691 7.99545 15.5691 9.58412C15.5691 11.1728 14.938 12.6964 13.8146 13.8197C12.6913 14.9431 11.1677 15.5742 9.579 15.5742C7.99033 15.5742 6.46673 14.9431 5.34337 13.8197C4.22002 12.6964 3.58892 11.1728 3.58892 9.58412Z"
				fill="#7A7A7A"
			/>
		</svg>
	);




	return (
		<>
			<div className="relative mt-[15px] feed--page">
				<IconButton
					aria-label="close"
					className="absolute top-0 left-0"
					sx={{
						position: "absolute",
					}}
					onClick={() => navigate(-1)}
				>
					<img
						className="w-[11.63px] h-[17.34px] invert"
						style={{ filter: theme === "light" ? "invert(1)" : "invert(0)" }}
						src={backIcon}
						alt="back"
					/>
				</IconButton>

				<div className="pb-[10px] px-[14px] ">
					{/* Hauls Heading */}
					<div className="flex flex-col items-center  mx-auto">
						<h2 className="font-[600] text-[16px] text-center leading-[20px] ">
							{store && store.name ? (store.name) : "Store Name"}
						</h2>
						<p className="font-[500] text-[14px] ">
							{vendor && vendor.first_name && vendor.last_name ? (`${vendor.first_name} ${vendor.last_name}`) : "Vendor"}
						</p>
					</div>
				</div>
			</div>


			<TabbedShowLayout sx={{
				backgroundColor: theme === 'light' ? '#fff' : '#222',
				color: theme === 'light' ? '#222' : '#fff',
				'& .RaTabbedShowLayout-content': {
					padding: '2px 0px'
				}

			}}>

				{currentUser && vendor && currentUser.email === vendor.email ? (<TabbedShowLayout.Tab label="Info"><StoreDetails /></TabbedShowLayout.Tab>) : (null)}

				<TabbedShowLayout.Tab label='Products' >
					{currentUser && vendor && currentUser.email === vendor.email ? (<ProductList />) : (
						<div className="pt-[0rem] pb-[4rem]">
							<div className="mb-[1.5rem]">

								{/* Search box */}
								<div
									className="general search--box my-[1rem]"
									style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
								>
									<input
										className="search--input"
										type="search"
										placeholder={`Search ${store && store.name ? (store.name) : "Store"}`}
										value={input}
										onChange={(e) => setInput(e.target.value)}
									/>
									{search}
								</div>
							</div>







							{products && products.length && (
								<>
									{products && !products.length && <span>No Products</span>}
									{products && products.length > 0 && (
										<Grid container spacing="10px" rowGap={{ xs: 2 }} style={{
											backgroundColor: theme === 'light' ? '#fff' : '#222',
											color: theme === 'light' ? '#222' : '#fff',
										}}>
											{products &&
												products.map((product) => {
													return (
														<Grid key={product.id} item xs={4} sm={4} md={4} style={{
															backgroundColor: theme === 'light' ? '#fff' : '#222',
															color: theme === 'light' ? '#222' : '#fff',
														}}>
															<NormalStoreCards
																title=""
																subTitle={store && store.name ? (store.name) : ('Shop')}
																price={product && region && product.variants ? (formatPrice(product.variants[0].prices.filter((curr) => { return curr.currency_code === region.currency_code })[0].amount)) : (null)}
																name={product.title}
																product={product}
																vendor={vendorAcc}
															/>
														</Grid>
													);
												})}
										</Grid>
									)}
								</>
							)}
						</div>
					)}

				</TabbedShowLayout.Tab>
				{
					currentUser && vendor && currentUser.email === vendor.email ? (
						<>
							<TabbedShowLayout.Tab label='Orders' >
								<OrderList />
							</TabbedShowLayout.Tab>
							{/* <TabbedShowLayout.Tab label='Stats'>
								<div className='flex w-[90vw]'>
									{currentUser && currentUser.role === 'vendor' ? (<VendorsStat />) : (<InfluencerStat />)}
								</div>
							</TabbedShowLayout.Tab> */}
						</>
					) : (
						null
					)
				}


			</TabbedShowLayout>



			<DFooter />

		</>
	);
};
export default Store;






