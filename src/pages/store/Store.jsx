import * as React from 'react';
import {  StoreCards } from '../../components/search/SearchCard';
import { IconButton } from '@mui/material';
import backIcon from '../../assets/hauls/backIcon.png';
import {  useProducts } from 'medusa-react';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { DFooter } from '../../components';
import { useNavigate } from 'react-router-dom';




  
const Store = () => {

    const { products, isLoading } = useProducts();
    const { theme } = React.useContext(ThemeContext);
    let navigate = useNavigate();

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
								Toyin Lawani
							</h2>
							<p className="font-[500] text-[14px] ">Tiannah's Empire</p>
						</div>
					</div>
				</div>

				<div className="searched max-w-[345px] mx-auto">
					{isLoading && <span>Loading...</span>}
					{products && !products.length && <span>No Products</span>}
					{products && products.length > 0 && (
						<ul>
							{products.map((product) => {
								return (
									<li key={product.id}>
										<StoreCards
											title={product.title}
											subTitle="Tiannah's Empire"
											name={product.handle}
											price="$200.00"
											product={product}
											products={products}
										/>
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<DFooter />
			</>
		);
};
export default Store;