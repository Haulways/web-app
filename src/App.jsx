import React, { useContext, useEffect } from "react";
import { Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AnimationContext from './components/animateContext/AnimationContext';
import { AuthContext } from "./components/context/AuthContext";
import { Home, SignIn, SignUp, Reset, ChatList, Hauls, Lookbook, DIY, GRWM, Search, Cart, OrderHistory, Vendors, Store, ResetPage, Contract, Influencers, InfluencerStore, InfluencerViewAll, SkillCenter, SkillViewAll, LoginScreen, SignupScreen, ResetScreen, ResetScreenPage, Downloads, History, AdStat, AdSetting, Accessories, Fashion, Beauty, Footwear, Jewelry, Others } from "./pages";
import { Admin, Authenticated, CustomRoutes, Resource, useGetIdentity, useStore, } from 'react-admin';
import { MyLayout } from "./components/layout/MyLayout";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/post/_Post/_Post";
import { MyDashboard } from "./pages/dashboard/Dashboard";
import customTheme from "./components/customTheme/CustomTheme";
import FileUpload from "./components/inputField/InputField";
import { HaulsCreate, HaulsEdit, HaulsList, HaulsShow } from "./pages/for_You/hauls/_hauls/_Hauls";
import { DIYCreate, DIYEdit, DIYList, DIYShow } from "./pages/for_You/diy/_diy/_DIY";
import { LookCreate, LookEdit, LookList, LookShow } from "./pages/for_You/lookbook/_lookbook/_Lookbook";
import { GrwmCreate, GrwmEdit, GrwmList, GrwmShow } from "./pages/for_You/grwm/_grwm/_GRWM";
import { UsersCreate, UsersEdit, UsersList, UsersShow } from "./pages/users/_users/_User";
import { dataProvider } from "./supabase/dataProvider";
import { authProvider } from "./supabase/authProvider";
import { QueryClient } from "@tanstack/react-query";
import { CartProvider, MedusaProvider, } from "medusa-react";
import { StoreCreate, StoreEdit, StoreList, StoreShow } from "./pages/store/_Store";
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./pages/product/_Product";
import { OrderCreate, OrderEdit, OrderList, OrderShow } from "./pages/orders/_Order";
import Settings from "./components/profile/Settings";
import { ContractCreate, ContractEdit, ContractList, ContractShow } from "./pages/contract/_Contract";
import { CreateAd, OnboardScreen } from "./components";
import Slider from "./components/slider/Slider";
import useSupabaseRealtime from "./supabase/realTime";
import { MakeupCreate, MakeupEdit, MakeupList, MakeupShow } from "./pages/skillCenter/skill/makeup/MakeupList";
import { UGCCreate, UGCEdit, UGCList, UGCShow } from "./pages/UGC/UGCList";
import { CraftCreate, CraftEdit, CraftList, CraftShow } from "./pages/skillCenter/skill/craft/CraftList";
import { FashionCreate, FashionEdit, FashionList, FashionShow } from "./pages/skillCenter/skill/fashion/FashionList";
import { CosmeticsCreate, CosmeticsEdit, CosmeticsList, CosmeticsShow } from "./pages/skillCenter/skill/cosmetics/CosmeticsList";
import { CoursesCreate, CoursesEdit, CoursesList, CoursesShow } from "./pages/skillCenter/skill/courses/CoursesList";
import { AdCreate, AdEdit, AdList, AdShow } from "./pages/ads/AdList";






function App() {
	const [isAnimationActive, setAnimationActive] = React.useState(false);
	const { currentUser } = useContext(AuthContext);
	const [g_user, setG_User] = useStore("user");
	// const { identity, isLoading: identityLoading } = useGetIdentity();
	const queryClient = new QueryClient()

	// const channelName = 'room1';

	// Use the custom hook to get real-time updates
	const realtimeData = useSupabaseRealtime();

	useEffect(() => {
		if (realtimeData) {
			console.log('Change received!', realtimeData);
			// Do something with the real-time data
		}
	}, [realtimeData]);



	const activateAnimation = () => {
		setAnimationActive(true);
	};




	return (
		<>
			<MedusaProvider
				queryClientProviderProps={{ client: queryClient }}
				baseUrl="https://ecommerce.haulway.co"
			>
				<CartProvider>
					<ToastContainer
						position="top-center"
						autoClose={3000}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover
						theme="colored"
						transition={Zoom}
					/>
					<AnimationContext.Provider
						value={{ isAnimationActive, activateAnimation }}
					>
						<BrowserRouter>
							<Admin
								dataProvider={dataProvider}
								authProvider={authProvider}
								theme={customTheme}
								title={"Haulway"}
								layout={MyLayout}
								dashboard={MyDashboard}
								loginPage={LoginScreen}
								// queryClient={queryClient}
							>
								<Resource
									name="posts"
									list={PostList}
									edit={PostEdit}
									show={PostShow}
									create={PostCreate}
								/>
								<Resource
									name="users"
									list={UsersList}
									edit={UsersEdit}
									show={UsersShow}
									create={UsersCreate}
								/>
								<Resource
									name="hauls"
									list={HaulsList}
									edit={HaulsEdit}
									show={HaulsShow}
									create={HaulsCreate}
								/>
								<Resource
									name="diy"
									list={DIYList}
									edit={DIYEdit}
									show={DIYShow}
									create={DIYCreate}
								/>
								<Resource
									name="lookbook"
									list={LookList}
									edit={LookEdit}
									show={LookShow}
									create={LookCreate}
								/>
								<Resource
									name="grwm"
									list={GrwmList}
									edit={GrwmEdit}
									show={GrwmShow}
									create={GrwmCreate}
								/>
								<Resource
									name="product"
									list={ProductList}
									edit={ProductEdit}
									show={ProductShow}
									create={ProductCreate}
								/>
								<Resource
									name="store"
									list={StoreList}
									edit={StoreEdit}
									show={StoreShow}
									create={StoreCreate}
								/>
								<Resource
									name="order"
									list={OrderList}
									edit={OrderEdit}
									show={OrderShow}
									create={OrderCreate}
								/>
								<Resource
									name="contract"
									list={ContractList}
									edit={ContractEdit}
									show={ContractShow}
									create={ContractCreate}
								/>
								<Resource
									name="ugc"
									list={UGCList}
									edit={UGCEdit}
									show={UGCShow}
									create={UGCCreate}
								/>
								<Resource
									name="courses"
									list={MakeupList}
									edit={MakeupEdit}
									show={MakeupShow}
									create={MakeupCreate}
								/>
								<Resource
									name="courses"
									list={CraftList}
									edit={CraftEdit}
									show={CraftShow}
									create={CraftCreate}
								/>
								<Resource
									name="courses"
									list={FashionList}
									edit={FashionEdit}
									show={FashionShow}
									create={FashionCreate}
								/>
								<Resource
									name="courses"
									list={CosmeticsList}
									edit={CosmeticsEdit}
									show={CosmeticsShow}
									create={CosmeticsCreate}
								/>
								<Resource
									name="courses"
									list={CoursesList}
									edit={CoursesEdit}
									show={CoursesShow}
									create={CoursesCreate}
								/>
								<Resource
									name="ads"
									list={AdList}
									edit={AdEdit}
									show={AdShow}
									create={AdCreate}
								/>

								{/* CustomRoutes  */}
								<CustomRoutes noLayout>
									{/* <Route path="/" element={<Home />} />
									<Route path="/login" element={<SignIn />} />
									<Route path="/signup" element={<SignUp />} />
									<Route path="/reset" element={<Reset />} />
									<Route path="/reset-page" element={<ResetPage />} />
									<Route path="/onboard" element={<Slider />} /> */}
									{/* mobile screens */}
									<Route path="/" element={<Home />} />
									<Route path="/onboard" element={<OnboardScreen />} />
									<Route path="/login" element={<LoginScreen />} />
									<Route path="/signup" element={<SignupScreen />} />
									<Route path="/reset" element={<ResetScreen />} />
									<Route path="/reset-page" element={<ResetScreenPage />} />
								</CustomRoutes>

								<CustomRoutes>
									<Route path="/influencers" element={<Influencers />} />
									<Route path="/settings" element={<Settings />} />
									<Route path="/feed" element={<FileUpload />} />
									<Route path="/search" element={<Search />} />
									<Route path="/cart" element={<Cart />} />
									<Route path="/orders" element={<OrderHistory />} />
									<Route path="/chats" element={<ChatList />} />
									<Route path="/hauls" element={<Hauls />} />
									<Route path="/contract" element={<Contract />} />
									<Route path="/lookbook" element={<Lookbook />} />
									<Route path="/diy" element={<DIY />} />
									<Route path="/grwm" element={<GRWM />} />
									<Route path="/vendors" element={<Vendors />} />
									{/* <Route path="/store" element={<Store />} /> */}
									<Route
										path="/influencerStore"
										element={<InfluencerStore />}
									/>
									<Route path="/catalogue" element={<InfluencerViewAll />} />
									<Route path="/skill-center" element={<SkillCenter />} />
									<Route path="/skill" element={<SkillViewAll />} />
									<Route path="/downloads" element={<Downloads />} />
									<Route path="/history" element={<History />} />
									<Route path="/makeup" element={<MakeupList />} />
									<Route path="/craft" element={<CraftList />} />
									<Route path="/courses" element={<CoursesList />} />
									<Route path="/fashion" element={<FashionList />} />
									<Route path="/cosmetics" element={<CosmeticsList />} />
									<Route path="/ads" element={<AdList />} />
									<Route path="/ad-stat" element={<AdStat />} />
									<Route path="/ad-setting" element={<AdSetting />} />
									{/* Shop pages */}
									<Route path="/accessories" element={<Accessories />} />
									<Route path="/fashions" element={<Fashion />} />
									<Route path="/beauty" element={<Beauty />} />
									<Route path="/jewelry" element={<Jewelry />} />
									<Route path="/footwear" element={<Footwear />} />
									<Route path="/others" element={<Others />} />

									<Route path="/dashboard" element={<MyDashboard />} />
									<Route path="*" element={<Navigate to="/dashboard" />} />
									{/* create post route  */}
								</CustomRoutes>
							</Admin>
						</BrowserRouter>
					</AnimationContext.Provider>
				</CartProvider>
			</MedusaProvider>
		</>
	);
}

export default App;

