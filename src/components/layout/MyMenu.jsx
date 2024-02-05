import { Menu, useStore } from 'react-admin';
import * as React from 'react';
import DeblurIcon from '@mui/icons-material/Deblur';
import { ChevronRight } from '@mui/icons-material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import AppsIcon from '@mui/icons-material/Apps';
import GroupsIcon from '@mui/icons-material/Groups';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';
import { ThemeContext } from '../context/ThemeProvider';
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import SpaIcon from '@mui/icons-material/Spa';
import StyleIcon from '@mui/icons-material/Style';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CurtainsIcon from '@mui/icons-material/Curtains';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import BrushIcon from '@mui/icons-material/Brush';

export const MyMenu = () => {
    const { currentUser } = useContext(AuthContext);
    
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    
    return (
			<Menu
				sx={{
					position: "relative !important",

					"&.RaMenu-closed .on_close": {
						display: "none",
					},
					"&.RaMenu-closed label": {
						display: "none",
					},
					"&.RaMenu-closed .my_menu": {
						padding: "5rem 0px",
					},
				}}
			>
				<div className=" px-[5px] pb-[5rem] my_menu">
					<div className="mt-[3rem] flex items-center flex-col  mb-[2rem] on_close">
						<Link to={`/users/${currentUser.id}/show`}>
							<Avatar
								sx={{ width: "70px", height: "70px" }}
								src={currentUser.photoURL}
							/>
						</Link>
						<p className="mt-[.5rem] text-[18px] font-[500]">
							{currentUser.displayName}
						</p>
						<span className="text-[12px] text-[#7a7a7a]">
							@
							{currentUser && currentUser.username
								? currentUser.username.toLowerCase()
								: "username"}
						</span>
					</div>

					<span className="mobile:hidden">
						<Menu.DashboardItem />
					</span>

					<span className="laptop:hidden tablet:hidden">
						<Menu.Item
							to="/dashboard"
							primaryText="Feed"
							leftIcon={<AppsIcon />}
						/>
					</span>

					<SubMenu primaryText="Explore" leftIcon={<ChevronRight />}>
						<Menu.Item
							to="/hauls"
							primaryText="Hauls"
							leftIcon={<BubbleChartIcon />}
						/>
						<Menu.Item
							to="/lookbook"
							primaryText="LookBook"
							leftIcon={<DeblurIcon />}
						/>
						<Menu.Item
							to="/grwm"
							primaryText="GRWM"
							leftIcon={<DynamicFeedIcon />}
						/>
						<Menu.Item
							to="/diy"
							primaryText="DIY (Tips and tricks)"
							leftIcon={<ColorLensIcon />}
						/>
						<Menu.Item
							to="/beauty"
							primaryText="Beauty"
							leftIcon={<SpaIcon />}
						/>
					</SubMenu>

					<SubMenu primaryText="Shop" leftIcon={<ChevronRight />}>
						<Menu.Item
							to="/fashions"
							primaryText="Fashion"
							leftIcon={<StyleIcon />}
						/>
						<Menu.Item
							to="/beauty"
							primaryText="Beauty"
							leftIcon={<SpaIcon />}
						/>
						<Menu.Item
							to="/footwear"
							primaryText="Footwear"
							leftIcon={<CurtainsIcon />}
						/>
						<Menu.Item
							to="/accessories"
							primaryText="Accessories"
							leftIcon={<ShoppingBagIcon />}
						/>
						<Menu.Item
							to="/jewelry"
							primaryText="Jewelry"
							leftIcon={<AutoAwesomeIcon />}
						/>
						<Menu.Item
							to="/others"
							primaryText="Others"
							leftIcon={<DynamicFeedIcon />}
						/>
						<Menu.Item
							to="/cart"
							primaryText="Cart"
							leftIcon={<ShoppingCartIcon />}
						/>
						<Menu.Item
							to="/orders"
							primaryText="Order History"
							leftIcon={<HistoryIcon />}
						/>
						<Menu.Item
							to="/vendors"
							primaryText="Vendors"
							leftIcon={<GroupsIcon />}
						/>
					</SubMenu>

					<SubMenu primaryText="Creator center" leftIcon={<ChevronRight />}>
						<Menu.Item
							to="/influencers"
							primaryText="Influencers"
							leftIcon={<GroupsIcon />}
						/>
						<Menu.Item
							to="/contract"
							primaryText="Affiliate marketing..."
							leftIcon={<GiNotebook size={24} />}
						/>
						<Menu.Item
							to="/contract"
							primaryText="UGC sales"
							leftIcon={<MonetizationOnIcon size={24} />}
						/>
					</SubMenu>

					<SubMenu primaryText="Skill center" leftIcon={<ChevronRight />}>
						<Menu.Item
							to="/skill-center"
							primaryText="All"
							leftIcon={<AutoAwesomeIcon />}
						/>
						<Menu.Item
							to="/makeup"
							primaryText="Makeup"
							leftIcon={<ColorLensIcon />}
						/>
						<Menu.Item
							to="/craft"
							primaryText="Cafts"
							leftIcon={<BrushIcon />}
						/>
						<Menu.Item
							to="/fashion"
							primaryText="Fashion design"
							leftIcon={<StyleIcon size={24} />}
						/>
					</SubMenu>

					{/* <Menu.Item
						to="/ads"
						primaryText="Ads"
						leftIcon={<WebStoriesIcon />}
					/> */}
					<Menu.Item
						to="/settings"
						primaryText="Settings"
						leftIcon={<SettingsIcon />}
					/>

					<label className="switch mt-[1rem] ml-[3rem]">
						<input type="checkbox" id="theme-switch" onClick={toggleTheme} />
						<span className="menuSlide round">
							<i>
								<FaMoon />
							</i>
							<i>
								<IoSunny />
							</i>
						</span>
					</label>
				</div>

				{/* {
            user && user.role === "admin" ? (
                <>
                    <SubMenu isDropdownOpen={false} primaryText="APIs" leftIcon={<Api />}>
                        <Menu.Item to="/data-apis" primaryText="Data APIs" leftIcon={<Api />}/>
                    </SubMenu>
                </>
            ) : (
                null
            )
        } */}
			</Menu>
		);
};