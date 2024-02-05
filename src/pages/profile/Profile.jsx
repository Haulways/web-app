import React, { useContext, useEffect, useState } from 'react'
import './profile.css';
import { AuthContext } from '../../components/context/AuthContext';
import { DFooter, MakePost, SavedPost } from '../../components';
import {  Avatar, CircularProgress, Grid,  Skeleton,  useTheme } from '@mui/material';
import { useDataProvider, useGetList, useRecordContext } from 'react-admin';
import divider from "../../assets/profileIcons/divider.png";
import post from "../../assets/profileIcons/post.png";
import AccountType from "../../assets/profileIcons/AccType.png";
import stat from "../../assets/profileIcons/statIcon.png";
import star from "../../assets/profileIcons/star.png";
import influencerIcon from "../../assets/profileIcons/influenceIcon.png";
import saved from "../../assets/profileIcons/saved.png";
import camera from "../../assets/profileIcons/cameraAlt.png";
import product from "../../assets/profileIcons/product.png";
import request from "../../assets/profileIcons/requestIcon.png";
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { RequestCard } from '../../components/card/RequestCard';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/SupabaseConfig';
import { InfluencerProducts, VendorProducts } from '../../components/profile/SavedPost';
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import { ThemeContext } from '../../components/context/ThemeProvider';
import useSupabaseRealtime from '../../supabase/realTime';





const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const userData = useRecordContext();
    const [followed, setFollowed] = useState(false);
    const [userContract, setUserContract] = useState([]);
    const [senderContract, setSenderContract] = useState([]);
    const [collections, setCollections] = useState({});
    const [senderInfo, setSenderInfo] = useState({});
    const { theme } = useContext(ThemeContext);
    const realtimeData = useSupabaseRealtime();
    const { data: users } = useGetList('users');
    const { data: followers, total: totalFollowers, isLoading } = useGetList(
        'followers', { filter: { followed_id: userData?.uid } }
    );
    const { data: following, total: totalFollowing } = useGetList(
        'following', { filter: { follower_id: userData?.uid } }
    );

    const useFetchMultipleLists = (resources) => {
        const dataProvider = useDataProvider();
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchResources = async () => {
            try {
              const dataPromises = resources.map((resource) =>
                dataProvider.getList(resource, {
                  pagination: { page: 1, perPage: 10 },
                  sort: { field: 'id', order: 'ASC' },
                  filter: {},
                })
              );
      
              const results = await Promise.all(dataPromises);
              const combinedData = results.reduce((acc, { data }) => [...acc, ...data], []);
              setData(combinedData);
            } catch (e) {
              setError(e);
            } finally {
              setLoading(false);
            }
          };
      
          fetchResources();
        }, [dataProvider]);
      
        return { data, loading, error };
      };
    
      const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
      const { data: posts, loading: postLoading } = useFetchMultipleLists(tables);
    
    const useSavedPosts = (userId) => {
        const [savedPosts, setSavedPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchSavedPosts = async () => {
                try {
                    setLoading(true);
                    // Fetch the saved posts
                    let { data: savedData, error: savedError } = await supabase
                        .from('saved_post')
                        .select("*")
                        .match({ user_id: userId });
                    if (savedError) throw savedError;
    

                    let allPosts = [];


                    let allCollections = {general: []};

                    for (let item of savedData) {
                        if (item.coll_name === null) {
                            allCollections.general.push(item)
                        } else {
                            if (Object.keys(allCollections).includes(item.coll_name)) {
                                allCollections[item.coll_name].push(item)
                                
                            } else {
                                allCollections[item.coll_name] = []
                                allCollections[item.coll_name].push(item)
                                
                            }
                        }
                    }

                    // for (let coll of Object.keys(allCollections)) {
                    //     for (let item of savedData) {
                    //         const tables = ['posts', 'hauls', 'lookbook', 'diy', 'grwm'];
                    //         const fetchedData = await Promise.all(tables.map(table =>
                    //             supabase
                    //                 .from(table)
                    //                 .select("*")
                    //                 .eq("postId", item.postId)
                    //         ));
    
                    //         // Check for errors in the fetched data
                    //         fetchedData.forEach(({ error }) => {
                    //             if (error) throw error;
                    //         });
    
                    //         // Combine the data from all tables
                    //         const combinedData = fetchedData.reduce((acc, { data }) => [...acc, ...data], []);
                    //         allPosts.push(...combinedData);
                    //     }
                    // }

    
                    // Fetch related data for each saved post
                    for (let item of savedData) {
                        const tables = ['posts', 'hauls', 'lookbook', 'diy', 'grwm'];
                        const fetchedData = await Promise.all(tables.map(table =>
                            supabase
                                .from(table)
                                .select("*")
                                .eq("postId", item.postId)
                        ));
    
                        // Check for errors in the fetched data
                        fetchedData.forEach(({ error }) => {
                            if (error) throw error;
                        });
    
                        // Combine the data from all tables
                        const combinedData = fetchedData.reduce((acc, { data }) => [...acc, ...data], []);
                        allPosts.push(...combinedData);
                    }
    
                    setSavedPosts(allPosts);
                } catch (e) {
                    setError(e);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchSavedPosts();
        }, [userId]);
    
        return { savedPosts, loading, error };
    };

    const { savedPosts, loading, error } = useSavedPosts(currentUser.uid);

    
    
    useEffect(() => {
        getContractDoc();
        getSenderContract();
    }, [userData]);
    

    const follow = async () => {
        try {
            const { error } = await supabase
                .from('followers')
                .insert({
                    followed_id: userData.uid,
                    follower_id: currentUser.uid,
                });
    
            const { error: Error } = await supabase
                .from('following')
                .insert({
                    followed_id: userData.uid,
                    follower_id: currentUser.uid,
                });
    
            if (error) throw error;
    
            setFollowed(true);
        } catch (error) {
            console.log(error.message);
    
        }
    };
    
    const unfollow = async () => {
        try {
            const { error } = await supabase
                .from('followers')
                .delete()
                .eq('follower_id', currentUser.uid)
                .eq('followed_id', userData.uid);
    
            const { error: Error } = await supabase
                .from('following')
                .delete()
                .eq('follower_id', currentUser.uid)
                .eq('followed_id', userData.uid);
            
            
            if (error) throw error;
    
            setFollowed(false);
        } catch (error) {
            console.log(error.message);
        }
    };

 
    const getContractDoc = async () => {
        if (currentUser && currentUser.role === 'vendor') {
            const { data, error } = await supabase
                .from('contract')
                .select("*")
                .match({ vendor_id: currentUser.uid })
                .neq('created_by', currentUser.uid);
    
            
            if (error) throw error;
            setUserContract(data);


            for (let item of data) {
                // Fetch from posts
                let { data: postData, error: postError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", item.created_by);
    
                if (postError && status !== 406) throw postError;
                if (postData && postData.length > 0) {
                    // Take the first record from the array
                    let user = postData[0];
                    setSenderInfo(user);
                    // console.log(user);
                } else {
                    console.log('No user found');
                }
            }
            
           

        } else if (currentUser && currentUser.role === 'influencer') {
            const { data, error } = await supabase
                .from('contract')
                .select("*")
                .match({ influencer_id: currentUser.uid })
                .neq('created_by', currentUser.uid);
            
            setUserContract(data);
            if (error) throw error;


            for (let item of data) {
                // Fetch from posts
                let { data: postData, error: postError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", item.created_by);
    
                if (postError && status !== 406) throw postError;
                if (postData && postData.length > 0) {
                    // Take the first record from the array
                    let user = postData[0];
                    setSenderInfo(user);
                    // console.log(user);
                } else {
                    console.log('No user found');
                }
            }
            
                
        };
    };

    const getSenderContract = async () => {
        if (currentUser && currentUser.role === 'vendor') {
            const { data, error } = await supabase
                .from('contract')
                .select("*")
                .match({ created_by: currentUser.uid });

            setSenderContract(data);
            if (error) throw error;
           

        } else if (currentUser && currentUser.role === 'influencer') {
            const { data, error } = await supabase
                .from('contract')
                .select("*")
                .match({ created_by: currentUser.uid });
            
            setSenderContract(data);
            if (error) throw error;
                            
        };
    };

    const userPost = posts && posts.filter(pst => pst.uid === userData?.uid);
    

    
  
    // formatting the number of followers
    const formatFollowers = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K+';
        } else if (count >= 100 && count <= 999) {
            return (count / 100).toFixed(1) + 'H';
        } else {
            return count;
        }
    }

    const mytheme = useTheme(); // Get the theme

    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (userData) {
            // Define your condition here
            if (userData.role === "admin" || userData.role === "vendor" || userData.role === "influencer") {
                setTabValue(0);
            } else {
                setTabValue(1); // Or any other default value you prefer
            }
        }
    }, [userData]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
      
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
      
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const tabStyles = {
        '&.Mui-selected': {
            // Add your custom styles here
            boxShadow: '0px 0px 0px 0px #E1E1E1, 0px 2px 5px 0px #E1E1E1',
            borderRadius: '9999px',
            fontWeight: '600',
            backgroundColor: theme === 'dark' && 'rgba(68, 68, 68, 0.2)',
            color: '#333'
        },
    };

    const handleSendRequest = async () => {
        const uuid = uuidv4();
        const vendor_id = (userData && currentUser && (currentUser.role === 'vendor' && currentUser.id) || (userData.role === 'vendor' && userData.id));
        const influencer_id = (userData && currentUser && (currentUser.role === 'influencer' && currentUser.id) || (userData.role === 'influencer' && userData.id));
    
        // Check if a contract already exists between the vendor and the influencer
        const { data: existingContract, error: existingContractError } = await supabase
            .from("contract")
            .select("*")
            .eq('vendor_id', vendor_id)
            .eq('influencer_id', influencer_id);
    
        if (existingContractError) throw existingContractError;
    
        if (existingContract.length > 0) {
            toast.error("A contract already exists between this vendor and influencer!");
            return;
        }
    
        // If no existing contract, proceed to create a new one
        const { data, error } = await supabase
            .from("contract")
            .insert({
                id: uuid,
                created_at: new Date(),
                created_by: (currentUser && (currentUser.role === 'vendor' && currentUser.id) || (currentUser.role === 'influencer' && currentUser.id)),
                created_for: (userData && (userData.role === 'vendor' && userData.id) || (userData.role === 'influencer' && userData.id)),
                products: [],
                vendor_id: vendor_id,
                influencer_id: influencer_id,
                agreed_at: null,
                influencer_time_frame: null,
                vendor_time_frame: null,
                vendor_unit: null,
                influencer_unit: null,
                influencer_last_viewed: null,
                vendor_last_viewed: null,
                influencer_last_updated: null,
                vendor_last_updated: null,
                influencer_name: (userData && currentUser && (currentUser.role === 'influencer' && currentUser.displayName) || (userData.role === 'influencer' && userData.displayName)),
                vendor_name: (userData && currentUser && (currentUser.role === 'vendor' && currentUser.displayName) || (userData.role === 'vendor' && userData.displayName)),
                influencer_address: null,
                vendor_address: null,
                influencer_phone: null,
                vendor_phone: null,
                vendor_email: (userData && currentUser && (currentUser.role === 'vendor' && currentUser.email) || (userData.role === 'vendor' && userData.email)),
                influencer_email: (userData && currentUser && (currentUser.role === 'influencer' && currentUser.email) || (userData.role === 'influencer' && userData.email))
            })
            .select();
    
        if (error) throw error;
    
        toast.success("Contract Request sent!");
    }
    

    const handleDeleteContract = async () => {
        const vendor_id = (userData && currentUser && (currentUser.role === 'vendor' && currentUser.id) || (userData.role === 'vendor' && userData.id));
        const influencer_id = (userData && currentUser && (currentUser.role === 'influencer' && currentUser.id) || (userData.role === 'influencer' && userData.id));
    
        // Check if a contract exists between the vendor and the influencer
        const { data: existingContract, error: existingContractError } = await supabase
            .from("contract")
            .select("*")
            .eq('vendor_id', vendor_id)
            .eq('influencer_id', influencer_id);
    
        if (existingContractError) throw existingContractError;
    
        if (existingContract.length === 0) {
            toast.error("No contract exists between this vendor and influencer!");
            return;
        }
    
        // If a contract exists, proceed to delete it
        const { data, error } = await supabase
            .from("contract")
            .delete()
            .eq('vendor_id', vendor_id)
            .eq('influencer_id', influencer_id);
    
        if (error) throw error;
    
        toast.success("Contract deleted successfully!");
    }
    
 
      
      
    return (
        <>
            {userData ? (
                <>
                    

                    {/* user profile section */}

                    <div className='profile__body feed--page'>
                        {/* <DHeader /> */}
                        
                        {/* User information */}
                        <div className='user__info'>
                            {/* user image */}
                            <div className='uImage--container'>
                                <div className='user__image drop-shadow-lg'>
                                   
                                    <Avatar sx={{ width: '120px', height: "120px" }}
                                        src={userData.photoURL}
                                    />
                                </div>
                                <Link to={`/users/${userData.id}/edit`}>
                                    <img className='profile--editBtn' src={camera} alt='camera' />
                                </Link>
                            </div>
                            {/* user display name */}
                            <p className='display__name'>{userData.displayName}</p>
                            
                            <div className='username flex items-center justify-center'>
                                <span className="mr-[10px]">
                                    {userData.role === "vendor" ? (
                                        <img src={AccountType} alt='account' />
                                    ) : userData.role === "influencer" ? (
                                    
                                        <img src={influencerIcon} alt='account' />
                                   
                                    ) : <img src={AccountType} alt='account' />}
                                    
                                </span>
                                @{currentUser && userData.username ? userData.username.toLowerCase() : 'username'}
                                {userData.role === "vendor" ? (
                                    <span className='ml-[5px]'>- vendor</span>
                                ) : userData.role === "influencer" ? (
                                    <span className='ml-[5px]'>
                                        <img src={star} alt='account' />
                                    </span>
                                ) : null}
                            </div>
                            <ul className='user__followers'>
                                <li className='flex flex-col gap-y-0 items-center justify-center'>
                                    <span className='font-[700] text-[16px]'>
                                        {formatFollowers(totalFollowers)}
                                    </span>
                                    <span className='text-[14px] font-[500]'>
                                        Followers
                                    </span>
                                </li>

                                <li className='flex-shrink-0'>
                                    <img src={divider} alt='divider' style={{ filter: theme === "dark" && "invert(1)" }} className='flex-shrink-0' />
                                </li>

                                    
                                <li className='flex flex-col gap-y-0 items-center justify-center'>
                                    <span className='font-[700] text-[16px]'>
                                        {formatFollowers(userPost && userPost.length || 0)}
                                    </span>
                                    <span className='text-[14px] font-[500]'>
                                        Posts
                                    </span>
                                </li>

                                <li className='flex-shrink-0'>
                                    <img src={divider} alt='divider' style={{ filter: theme === "dark" && "invert(1)" }} className='flex-shrink-0' />
                                </li>

                                <li className='flex flex-col gap-y-0 items-center justify-center'>
                                    <span className='font-[700] text-[16px]'>
                                        {formatFollowers(totalFollowing)}
                                    </span>
                                    <span className='text-[14px] font-[500]'>
                                        Following
                                    </span>
                                </li>
                            </ul>
                            {currentUser.uid === userData.uid ? null : (


                                <div className='mt-[20px] flex items-center gap-x-[30px] justify-center'>
                                    <div className="min-w-[150px] h-[36px] text-[15px] font-[500] flex items-center justify-center bg-[#222] text-white rounded-[6px] cursor-pointer" onClick={followed ? unfollow : follow} style={{ backgroundColor: theme === 'light' ? '#222' : '#fff', color: theme === 'light' ? '#fff' : '#222', }}>
                                        {followed ? 'Followed' : 'Follow'}
                                    </div>
                                    

                                    {(currentUser.role === "vendor" || currentUser.role === "influencer") && (userData.role === "vendor" || userData.role === "influencer") && (
                                        <>
                                            <button
                                                className="min-w-[150px] flex items-center justify-center h-[36px] text-[15px] font-[500] rounded-[6px] cursor-pointer"
                                                onClick={senderContract && senderContract.some(contract => contract.created_by === currentUser.uid && contract.created_for === userData.uid) ? handleDeleteContract : handleSendRequest}
                                                style={{
                                                    backgroundColor: theme === 'light' ? '#222' : '#fff',
                                                    color: theme === 'light' ? '#fff' : '#222',
                                                }}
                                            >
                                                {senderContract && senderContract.some(contract => contract.created_by === currentUser.uid && contract.created_for === userData.uid) ? 'Cancel request' : 'Send request'}
                                            </button>

                                        </>
                                    )}
                                </div>
                            )}
                                
                        </div>


                            

                        {/* User nested routes  */}
                        <div className='mt-[1.5rem]'>
                                
                            <Grid container justifyContent='center' direction='column' sx={{
                                width: '100% !important', justifyContent: 'center', padding: '0',
                                '& .MuiBox-root': {
                                    padding: '0'
                                },
                                backgroundColor: theme === 'light' ? '#fff' : '#222',
                                color: theme === 'light' ? '#222' : '#fff',
                            }}>
                                <AppBar className='mx-auto' position="static"
                                    sx={{
                                        maxWidth: { xs: '90vw', sm: '90vw', md: '500px',  },
                                        backgroundColor: 'unset',
                                        color: '#333',
                                        boxShadow: 'none',
                                        padding: '0 .5rem',
                                        fontWeight: '700',
                                        textTransform: 'capitalize',
                                        marginBottom: '25px',
                                        '& .MuiTabs-flexContainer': {
                                            justifyContent: userData?.uid === currentUser?.uid ? "" : "center"
                                        },
                                        '@media (min-width:1024px)': {
                                            '& .MuiTabs-flexContainer': {
                                                justifyContent: userData?.uid === currentUser?.uid ? "" : "space-between"
                                            },
                                        },
                                        filter: theme === "dark" && "invert(1)"

                                    }}
                                    
                                >
                                    <Tabs
                                        sx={{
                                            
                                            justifyContent: 'center',
                                            '& .MuiTab-root': {
                                                minHeight: '20px',
                                                margin: '5px 3px 10px',
                                                fontWeight: '700',
                                                color: '#333',
                                                fontSize: '12px',
                                                padding: '5px 9px',
                                                textTransform: 'capitalize'

                                            }, '& .MuiBox-root': {
                                                padding: '0'
                                            },
                                            
                                                
                                        }}
                                            
                                        value={tabValue}
                                        onChange={handleChange}
                                        indicatorColor="none"
                                            
                                        variant="scrollable"
                                        aria-label="full width tabs example"
                                        
                                    >
                                    
                                        <Tab
                                            value={0}
                                            icon={<img src={post} alt='post' />}
                                            iconPosition='end'
                                            label="Post"
                                            sx={tabStyles}
                                        />
                                        {(userData?.uid === currentUser?.uid) && (
                                            <Tab
                                                value={1}
                                                icon={<img src={saved} alt='saved' />}
                                                iconPosition='end'
                                                label="Saved"
                                                sx={tabStyles}
                                            />
                                        )}
                                        {(userData.role === "admin" || userData.role === "vendor" || userData.role === "influencer") && (
                                            <Tab
                                                value={userData.role === "admin" ? 2 : userData.role === "vendor" ? 2 : userData.role === "influencer" ? 2 : false}
                                                icon={<img src={product} alt='product' />}
                                                iconPosition='end'
                                                label="Products"
                                                sx={tabStyles}
                                            />
                                        )}
                                        {(userData?.uid === currentUser?.uid) && (userData.role === "admin" || userData.role === "vendor" || userData.role === "influencer") && (
                                            <Tab
                                                value={3}
                                                icon={<img src={request} alt='request' />}
                                                iconPosition='end'
                                                label="Request"
                                                sx={tabStyles}
                                            />
                                        )}
                                    </Tabs>
                                </AppBar>
                                
                                <SwipeableViews className=" mx-auto"
                                    axis={mytheme.direction === 'rtl' ? 'x-reverse' : 'x'} // Use theme.direction
                                    index={tabValue}
                                    onChangeIndex={setTabValue}
                                >
                                   
                                   
                                    <TabPanel className="mb-[4rem] mobile:min-w-[90vw] "
                                        value={tabValue} index={0}>
                                        <MakePost
                                            currentUser={currentUser}
                                            userData={userData}
                                            userPost={userPost}
                                            postLoading={postLoading}
                                        />
                                    </TabPanel>

                                    {userData?.uid === currentUser?.uid && (
                                        <TabPanel
                                            className="mb-[2rem] mobile:min-w-[90vw]"
                                            value={tabValue}
                                            index={1}
                                        >
                                            <SavedPost userPost={savedPosts} loading={loading} />
                                        </TabPanel>
                                    )}

                                    {(userData.role === "admin" || userData.role === "vendor" || userData.role === "influencer") && (
                                        <TabPanel className="mb-[4rem]"
                                            value={tabValue} index={2}>
                                            {userData.role === "vendor" ? 
                                            <VendorProducts theme={theme} />
                                                : 
                                                <InfluencerProducts theme={theme} />
                                            }
                                        </TabPanel>
                                    )}

                                    {(userData?.uid === currentUser?.uid) && (userData.role === "admin" || userData.role === "vendor" || userData.role === "influencer") && (
                                        <TabPanel
                                            className="mb-[4rem]"
                                            value={tabValue}
                                            index={3}
                                            sx={{
                                                '& .MuiBox-root': {
                                                    padding: '0'
                                                }
                                            }}
                                        >
                                            <RequestCard theme={theme} senderInfo={senderInfo} currentUser={currentUser} contracts={userContract}
                                                senderContract={senderContract}
                                                users={users}
                                            />
                                            
                                        </TabPanel>
                                    )}
                                </SwipeableViews>
                            </Grid>
        
                        </div>

                    </div>
                            
                  

                    {/* Settings Container */}

                    
                    {/* <Settings settings={settings} closeSettings={closeSettings} userData={userData} formatFollowers={formatFollowers} /> */}
                    

                </>
            
            ) : (
                <div className='spinner'>

                    <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                </div>
            )}
            <DFooter />
        </>
    );
};

export default Profile