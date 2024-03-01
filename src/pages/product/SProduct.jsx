import { CardMedia, CircularProgress, Dialog, Grid, IconButton, Skeleton } from '@mui/material';
import * as React from 'react';
import { InfiniteList, Link, WithListContext, useDataProvider, useRecordContext, useStore } from 'react-admin';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { ShortReviews } from '../../components/reviews/ShortReviews';
import backIcon from "../../assets/hauls/backIcon.png";
import Medusa from '@medusajs/medusa-js';
import { AuthContext } from '../../components/context/AuthContext'; import { SmallPHorizontalCards, SmallPHorizontalVariantCards } from '../../components/card/ShowCard';
import share from "../../assets/socials/share.png";
import IG from "../../assets/socials/ig.png";
import { GetStoreVendor } from '../post/Post';


const medusa = new Medusa({
	maxRetries: 3,
	baseUrl: "https://ecommerce.haulway.co",
});

const SProduct = () => {
	const record = useRecordContext();
	const [product, setProduct] = React.useState(null);
	const { id } = useParams();
	const { theme } = React.useContext(ThemeContext);
	const [selectedTab, setSelectedTab] = React.useState("related");
	let navigate = useNavigate();
	const { currentUser } = React.useContext(AuthContext)
	const [custData, setCustData] = React.useState(null);
	const [products, setProducts] = React.useState(null);
	const [cart_id, setCartID] = useStore("cart_id");
	const [cart, setCart] = React.useState(null);
	const [region, setRegion] = React.useState(null);
	const [g_user, setG_User] = useStore("user");
	const { store, vendor, vendorAcc, loading2, error2 } = GetStoreVendor(record?.store_id);

	React.useEffect(() => {
		if (g_user) {
			medusa.auth
				.authenticate({
					email: g_user.email,
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


	}, []);




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
		if (record && region && id) {
			//
			medusa.products.retrieve(id, { expand: 'store' })
				.then(({ product }) => {
					// console.log({...product, store_id: record.store_id})
					setProduct({ ...product, store_id: record.store_id })

				})

		}

	}, [region, record, id])



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


	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	React.useEffect(() => {
		if (record) {
			setProduct(record)
		}

		return () => {

		}
	}, [record]);


	// console.log(product);

	return (
		<>
			<Dialog
				open={true}
				fullScreen
				PaperProps={{
					style: {
						backgroundColor: theme === "light" ? "#fff" : "#222",
						color: theme === "light" ? "#222" : "#fff",
					},
				}}
			>
				<IconButton
					aria-label="close"
					className="absolute top-[10px] left-[10px]"
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

				<div
					className="flex gap-x-2  items-center  drop-shadow-lg mobile:drop-shadow-none laptop:mx-0 rounded-[4px]  laptop:w-[450px] laptop:gap-x-6  laptop:h-[200px] mb-[20px] mt-[4rem] px-[20px]"
					style={{
						backgroundColor:
							theme === "light" ? "#fff !important" : "#222 !important",
						color: theme === "light" ? "#222 !important" : "#fff !important",
					}}
				>
					{/* product container  */}
					<div className="rounded-[8px] overflow-hidden flex-shrink-0 laptop:h-[200px] laptop:w-[200px] w-[100px] h-[100px]">
						<img
							className="h-full w-full object-cover"
							src={product && product.thumbnail}
							alt={product && product.title}
						/>
					</div>

					{/* product details container  */}
					<div className=" h-full w-full items-center ">
						<p className="brand text-[16px] font-[500]  mb-[7px] laptop:text-[25px]">
							{product && product.title}
						</p>
						<p className="price text-[15px] font-[500] laptop:text-[22px]  mb-[7px]">
							{product && product.variants && product.variants.length && formatPrice(product.variants[0].prices.filter((curr) => { return curr.currency_code === region.currency_code })[0].amount)}
						</p>
						<h2 className="body text-[14px] laptop:text-[22px] font-[500] text-[#7a7a7a]">
							{product && product.handle}
						</h2>
					</div>
				</div>

				<InfiniteList
					resource="posts"
					title=" "
					actions={false}
					sx={{
						"& .MuiToolbar-root": {
							minHeight: "0px !important",
						},
						"& .MuiBox-root": {
							padding: "0 ",
						},
						"& .MuiPaper-root": {
							backgroundColor:
								theme === "light" ? "#fff !important" : "#222 !important",
							color:
								theme === "light" ? "#222 !important" : "#fff !important",
						},
					}}
					className="store__card"
				>
					<WithListContext
						render={({ isLoading, data }) =>
							!isLoading ? (
								<>
									<ul className="flex  mx-auto max-w-[95vw] gap-x-2 mb-[2rem] overflow-x-scroll store__card font-[500]">
										<li
											className={`cursor-pointer min-w-fit py-[5px] px-[1rem] rounded-[30px] ${selectedTab === "details"
												? theme === "light"
													? "text-[#fff] bg-[#222]"
													: "text-[#222] bg-[#fff]"
												: "text-zinc-400"
												}`}
											onClick={() => {
												handleTabClick("details");
											}}
										>
											Product details
										</li>

										<li
											className={` cursor-pointer min-w-fit py-[5px] px-[1rem] rounded-[30px]  ${selectedTab === "related"
												? theme === "light"
													? "text-[#fff] bg-[#222]"
													: "text-[#222] bg-[#fff]"
												: "text-zinc-400"
												}`}
											onClick={() => {
												handleTabClick("related");
											}}
										>
											Related videos
										</li>
										<li
											className={` cursor-pointer min-w-fit py-[5px] px-[1rem] rounded-[30px]  ${selectedTab === "reviews"
												? theme === "light"
													? "text-[#fff] bg-[#222]"
													: "text-[#222] bg-[#fff]"
												: "text-zinc-400"
												}`}
											onClick={() => {
												handleTabClick("reviews");
											}}
										>
											Reviews
										</li>
									</ul>

									<div className="mt-[2rem]">
										{selectedTab === "details" ? (
											<PDetails theme={theme} product={product} />
										) : selectedTab === "related" ? (
											<RVideos data={data} product={product} id={id} theme={theme} />
										) : selectedTab === "reviews" ? (
											<Reviews product={product} theme={theme} />
										) : null}
									</div>
								</>
							) : (
								<p className="font-[500] text-[#222] flex items-center justify-center">
									Loading...
								</p>
							)
						}
					/>
				</InfiniteList>
			</Dialog>
		</>
	);
};

export default SProduct


const RVideos = ({ product, id, theme }) => {
	const [isReady, setIsReady] = React.useState(false);

	const handleCanPlay = () => {
		setIsReady(true);
	};

	const useFetchMultipleLists = (resources) => {
		const dataProvider = useDataProvider();
		const [data, setData] = React.useState([]);
		const [loading, setLoading] = React.useState(true);
		const [error, setError] = React.useState(null);

		React.useEffect(() => {
			const fetchResources = async () => {
				try {
					const dataPromises = resources.map((resource) =>
						dataProvider.getList(resource, {
							pagination: { page: 1, perPage: 1000 },
							sort: { field: "id", order: "ASC" },
							filter: {},
						})
					);

					const results = await Promise.all(dataPromises);
					const seenIds = new Set();
					const combinedData = results.reduce((acc, { data }) => {
						const uniqueData = data.filter((item) => {
							if (!seenIds.has(item.id)) {
								seenIds.add(item.id);
								return true;
							}
							return false;
						});
						return [...acc, ...uniqueData];
					}, []);

					setData(combinedData);
				} catch (e) {
					setError(e);
				} finally {
					setLoading(false);
				}
			};

			fetchResources();
		}, [dataProvider, resources]);

		return { data, loading, error };
	};

	const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
	const { data, loading } = useFetchMultipleLists(tables);

	let filteredData = data?.filter(item =>
		item.taggedProducts.some(taggedProduct => taggedProduct.id === id)
	);

	// console.log();

	return (
		<>
			{loading ? (
				<span className='px-[1rem] text-center'>Loading Videos</span>
			) : filteredData.length === 0 ? (
				<span className='px-[1rem] text-center'>No Related Videos</span>
			) : null}

			{filteredData && filteredData.length > 0 ? (
				<Grid container spacing="5px" className="mb-[2rem]">
					{filteredData &&
						filteredData.map((post) => {
							const mediaUrl = post.media[0]; // Get the URL of the single media file
							const isImage =
								mediaUrl.includes(".jpg") ||
								mediaUrl.includes(".jpeg") ||
								mediaUrl.includes(".png");
							return (
								<Grid
									key={post.id}
									item
									xs={4}
									sm={4}
									md={4}
									className="mx-auto"
								>
									<Link to={`/${post.URL}/${post.id}/show`}>
										<div className="w-[100%] h-[120px] laptop:h-[500px] laptop:w-[100%] tablet:h-[300px] tablet:w-[100%] flex-shrink-0 overflow-hidden ">
											{isImage ? (
												<img
													src={mediaUrl}
													alt="user-post"
													className="object-cover w-full h-full"
												/>
											) : (
												<div>
													{!isReady && (
														<Skeleton
															variant="rectangular"
															width="100%"
															height="100%"
														/>
													)}
													<CardMedia
														component="video"
														src={mediaUrl}
														playsInline={true}
														className="object-cover h-full w-full"
														loop
														autoPlay
														muted={true}
														controls={false}
														poster={post.posterUrl ? post.posterUrl : null}
														onCanPlay={handleCanPlay}
														style={{
															display: isReady ? "block" : "none",
														}}
													/>
												</div>
											)}
										</div>
									</Link>
								</Grid>
							);
						})}
				</Grid>
			) : (<div className='spinner absolute top-0 bottom-0 left-0 right-0 my-0 mx-0'>

				<CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
			</div>)}
		</>
	);
};


const Reviews = ({ product, theme }) => {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const index = 0;

	return (
		<>
			<InfiniteList
				title=" "
				resource="product_review"
				actions={false}
				sx={{
					"& .MuiBox-root": {
						padding: "0",
					},
					backgroundColor: theme === "light" ? "#fff" : "#222",
					color: theme === "light" ? "#222" : "#fff",
				}}
				className='px-[1rem]'
			>
				<WithListContext
					render={({ isLoading, data }) =>
						!isLoading ? (
							<>
								<ShortReviews
									activeIndex={activeIndex}
									url="product_review"
									index={index}
									theme={theme}
									mediaUrl={product}
									data={data}
								/>
							</>
						) : (<div className='spinner absolute top-0 bottom-0 left-0 right-0 my-0 mx-0'>

							<CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
						</div>)
					}
				/>
			</InfiniteList>
		</>
	);
};

const PDetails = ({ theme, product }) => {
	// console.log(product);
	return (
		<>{
			product && product.variants ? (<div className='mx-5'>
				<div className='mx-auto pt-[1rem]'>
					<SmallPHorizontalCards post={product} />
				</div>
				<div className='product__details--Middle mt-[2px]'>
					<span className="brand--name">
						{product?.title}
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
					{product?.description}
				</div>

				<div className='mx-auto pb-[1rem]'>
					<SmallPHorizontalVariantCards post={product} />
				</div>
			</div>) : (<div className='spinner absolute top-0 bottom-0 left-0 right-0 my-0 mx-0'>

				<CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
			</div>)}</>
	);
};



