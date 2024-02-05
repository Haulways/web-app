import { Grid, IconButton } from '@mui/material';
import { LiveCard } from '../../../../components/card/LiveCard';
import { SearchBox } from '../../../../components/search/SearchBox';
import { WithListContext } from 'react-admin';
import { NormalCard } from '../../../../components/card/NormalCard';
import { GrwmDialog } from './_GRWMContent';
import * as React from 'react';
import { DFooter } from '../../../../components';
import { ThemeContext } from '../../../../components/context/ThemeProvider';
import { useEffect } from 'react';
import { supabase } from '../../../../supabase/SupabaseConfig';
import { v4 as uuidv4 } from "uuid";
import { selectIsConnectedToRoom, selectPeers, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../components/context/AuthContext';
import { LiveScreenDialog } from '../../../../components/dialog/DialogBox';
import NewMeetingForm from '../../../../components/LiveComponents/joinForm/JoinForm';


export const GrwmListContents = () => {
    const [open, setOpen] = React.useState(true);
    const { theme } = React.useContext(ThemeContext);
    const [openLive, setOpenLive] = React.useState(false);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const { currentUser } = React.useContext(AuthContext)
    const [openAsce, setOpenAsce] = React.useState(false);
    const [room, setRoom] = React.useState(null);
    const [roomCodes, setRoomCodes] = React.useState(null);
    const [broadcaster, setBroadcaster] = React.useState(null);
    const [broadcasterImg, setBroadcasterImg] = React.useState(null);
    const [broadcasterData, setBroadcasterData] = React.useState(null);
    const [viewer, setViewer] = React.useState(null);
    const [cohost, setCohost] = React.useState(null);
    const [liveData, setLiveData] = React.useState([]);
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];
    const uuid = uuidv4();
    const [input, setInput] = React.useState('');
    const [result, setResult] = React.useState([]);
    
    React.useEffect(() => {
        if (input.length > 0 && input.trim() !== '') {
            supabase
                .from('grwm')
                .select('*')
                .or(`body.ilike.%${input}%,name.ilike.%${input}%`)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching data:', error);
                    } else {
                        setResult(data);
                    }
                });
        } else {
            setResult([]);
        }
    }, [input]);

    const peers = (useHMSStore(selectPeers) || []).filter(
        peer =>
            peer.roleName === 'broadcaster'
    );

    
    async function stopLiveStream() {
        const url = `https://api.100ms.live/v2/live-streams/room/${room?.id}/stop`;
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
            }
        };
    
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    const CloseAcseLive = async () => {
        setOpenLive(false);
        setOpenAsce(false);
        hmsActions.leave();
        if (peers[0]?.isLocal) {
            await supabase
                .from('liveStream')
                .update({ hls: false })
                .match({ created_by_id: currentUser.id, created_by_name: currentUser.displayName, URL: pathname })
                .select();
            try {
                const lock = false; // set to true to disallow rejoins
                const reason = 'party is over';
                await hmsActions.endRoom(lock, reason);
            } catch (err) {
                console.error("failed to stop hls", err);
            }
        }
    };
    


    const handleOpenLive = () => {
        setOpenLive(true);
    };
        
    const handleCloseLive = () => {
        setOpenLive(false);
    };
    

    const handleClickOpen = () => {
        setOpen(false);
    };



    const createRoomCode = async () => {
        if (room) {
            try {
                const response = await fetch(`https://api.100ms.live/v2/room-codes/room/${room.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                setRoomCodes(data)
                console.log(roomCodes);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
    useEffect(() => {
        peers.forEach(peer => {
            const matchingData = liveData.find(data => data.created_by_name === peer.name);
            if (matchingData) {
                setBroadcasterImg(matchingData.created_by_photoURL)
                setBroadcasterData(matchingData)
                console.log(matchingData.created_by_photoURL);
            }
        });
    }, [liveData, peers, broadcasterData])


    const createRoom = async () => {
        if (currentUser) {

  
            const url = "https://api.100ms.live/v2/rooms";
            const headers = {
                Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                "Content-Type": "application/json",
            };
      
            // Define the request body
            const body = JSON.stringify({
							"name": `${currentUser?.id}`,
							"description": "Live Streaming and conferencing",
							"template_id": `65b50d50cd666ed1654e2184`,
						});
      
            // Make the POST request using fetch
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers,
                    body,
                });
      
                // Check if the response is ok
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
      
                // Parse the response as JSON
                const data = await response.json();
      
                // Set the response data to the state variable
                setRoom(data);
            } catch (error) {
                // Handle the error
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (room === null || roomCodes === null) {
                    await createRoomCode();
                    await createRoom();
                }
    
                if (roomCodes && typeof roomCodes === 'object' && roomCodes.hasOwnProperty('data')) {
                    // Assuming the data property is an array in the response
                    let broadcaster = roomCodes.data.find(item => item.role === 'broadcaster');
                    let viewer = roomCodes.data.find(item => item.role === 'viewer');
                    let cohost = roomCodes.data.find(item => item.role === 'cohost');
                    setBroadcaster(broadcaster)
                    setViewer(viewer)
                    setCohost(cohost)

                    // console.log(broadcaster.code, viewer.code, cohost.code);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, [roomCodes, room]);

    const [rooms, setRooms] = React.useState([]);
    


    
    const createStream = async () => {
        if (!currentUser) {
            console.error('currentUser is not defined');
            return;
        }
    
        if (room && roomCodes && cohost && broadcaster && cohost) {
            const { data, error: existingStream } = await supabase
                .from("liveStream")
                .select("*")
                .eq('created_by_id', currentUser.id)
                .eq('created_by_name', currentUser.displayName)
                .eq('URL', pathname);
    
            if (existingStream) throw existingStream;
    
            if (data.length > 0) {
                return;
            }
    
            try {
                const { error: streamError } = await supabase
                    .from("liveStream")
                    .insert({
                        id: uuid,
                        URL: pathname,
                        created_at: new Date(),
                        app_id: room.app_id,
                        customer_id: room.customer_id,
                        room_name: room.name,
                        template: room.template,
                        template_id: room.template_id,
                        updated_at: room.updated_at,
                        host_code: broadcaster?.code,
                        cohost_code: cohost.code,
                        viewer_code: viewer.code,
                        room_id: room.id,
                        created_by_id: currentUser.id,
                        created_by_photoURL: currentUser.photoURL,
                        created_by_name: currentUser.displayName,
                    });
    
                if (streamError) throw streamError;
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
    function itemExists(item, array) {
        return array.some(existingItem => existingItem.id === item.id);
    }

    useEffect(() => {
        // Fetch initial data
        const fetchInitialData = async () => {
            let { data: initialData, error } = await supabase
                .from('liveStream')
                .select('*');
        
            if (error) console.log('Error fetching initial data: ', error);
            else setLiveData(initialData.filter(item => item.hls === true));
        };

        fetchInitialData();

        // Subscribe to changes
        const allChannels = supabase
            .channel('room1')
            .on('postgres_changes', { event: '*', schema: '*', table: 'liveStream' }, payload => {
                console.log('Change received!', payload);
                setLiveData(prevData => {
                    // If hls is true, append the new data to the existing data only if it doesn't already exist
                    if (payload.new.hls === true && !itemExists(payload.new, prevData)) {
                        return [...prevData, payload.new];
                    }
                    // If hls is false, filter out the data from the existing data
                    else {
                        return prevData.filter(item => item.id !== payload.new.id); // assuming each item has a unique id
                    }
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(allChannels);
        };
    }, [liveData]);

      
    console.log(room, broadcasterData);

    useEffect(() => {
        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
    }, [hmsActions, isConnected]);
    
    React.useEffect(() => {
        if (isConnected) {
            setOpenAsce(true);
            
        }
      
    }, [isConnected]);
    
    const liveIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="25" fill="#FF0000" />
            <path d="M15.6332 12.9924C15.7894 13.1485 15.9133 13.3338 15.9979 13.5378C16.0825 13.7418 16.126 13.9605 16.126 14.1813C16.126 14.4021 16.0825 14.6208 15.9979 14.8248C15.9133 15.0288 15.7894 15.2141 15.6332 15.3701C13.1117 17.892 11.6952 21.3122 11.6952 24.8784C11.6952 28.4446 13.1117 31.8648 15.6332 34.3867C15.7937 34.5417 15.9217 34.7271 16.0097 34.9321C16.0978 35.1371 16.1442 35.3576 16.1461 35.5807C16.148 35.8038 16.1055 36.0251 16.021 36.2316C15.9365 36.4381 15.8118 36.6257 15.654 36.7835C15.4962 36.9413 15.3086 37.066 15.1021 37.1505C14.8956 37.235 14.6743 37.2775 14.4512 37.2756C14.2281 37.2737 14.0076 37.2273 13.8026 37.1392C13.5976 37.0512 13.4122 36.9232 13.2572 36.7627C6.69203 30.1992 6.69203 19.5559 13.2572 12.9924C13.5723 12.6774 13.9996 12.5005 14.4452 12.5005C14.8907 12.5005 15.3181 12.6774 15.6332 12.9924ZM37.0274 12.9924C43.5908 19.5576 43.5908 30.1992 37.0274 36.7627C36.7123 37.078 36.2849 37.2552 35.8391 37.2554C35.3934 37.2555 34.9658 37.0786 34.6505 36.7635C34.3352 36.4484 34.158 36.021 34.1579 35.5753C34.1577 35.1295 34.3346 34.702 34.6497 34.3867C37.1712 31.8648 38.5877 28.4446 38.5877 24.8784C38.5877 21.3122 37.1712 17.892 34.6497 15.3701C34.3344 15.0548 34.1573 14.6272 34.1573 14.1813C34.1573 13.7354 34.3344 13.3077 34.6497 12.9924C34.965 12.6771 35.3926 12.5 35.8385 12.5C36.2845 12.5 36.7121 12.6771 37.0274 12.9924ZM20.6188 17.8218C20.9338 18.1369 21.1108 18.5642 21.1108 19.0098C21.1108 19.4553 20.9338 19.8827 20.6188 20.1978C20.007 20.8094 19.5218 21.5356 19.1907 22.3348C18.8597 23.134 18.6893 23.9906 18.6893 24.8557C18.6893 25.7208 18.8597 26.5774 19.1907 27.3766C19.5218 28.1758 20.007 28.902 20.6188 29.5136C20.7748 29.6698 20.8985 29.8551 20.9829 30.059C21.0673 30.263 21.1107 30.4815 21.1106 30.7022C21.1105 30.923 21.067 31.1415 20.9825 31.3454C20.8979 31.5492 20.7741 31.7345 20.6179 31.8905C20.4618 32.0465 20.2765 32.1702 20.0725 32.2546C19.8686 32.339 19.65 32.3824 19.4293 32.3823C19.2086 32.3823 18.9901 32.3387 18.7862 32.2542C18.5823 32.1696 18.3971 32.0458 18.2411 31.8897C16.3756 30.0241 15.3276 27.4939 15.3276 24.8557C15.3276 22.2175 16.3756 19.6873 18.2411 17.8218C18.3971 17.6655 18.5825 17.5416 18.7865 17.457C18.9904 17.3725 19.2091 17.3289 19.4299 17.3289C19.6508 17.3289 19.8694 17.3725 20.0734 17.457C20.2774 17.5416 20.4627 17.6655 20.6188 17.8218ZM32.3107 17.8218C34.1761 19.6873 35.2241 22.2175 35.2241 24.8557C35.2241 27.4939 34.1761 30.0241 32.3107 31.8897C31.9937 32.1957 31.5693 32.3651 31.1287 32.3613C30.6881 32.3575 30.2667 32.1807 29.9551 31.8692C29.6436 31.5576 29.4668 31.1362 29.463 30.6956C29.4592 30.255 29.6285 29.8306 29.9346 29.5136C30.5464 28.902 31.0316 28.1758 31.3627 27.3766C31.6938 26.5774 31.8642 25.7208 31.8642 24.8557C31.8642 23.9906 31.6938 23.134 31.3627 22.3348C31.0316 21.5356 30.5464 20.8094 29.9346 20.1978C29.6285 19.8809 29.4592 19.4564 29.463 19.0158C29.4668 18.5752 29.6436 18.1538 29.9551 17.8422C30.2667 17.5307 30.6881 17.354 31.1287 17.3501C31.5693 17.3463 31.9937 17.5157 32.3107 17.8218ZM25.2767 22.4763C25.6077 22.4763 25.9355 22.5415 26.2413 22.6682C26.5471 22.7949 26.8249 22.9805 27.059 23.2146C27.293 23.4486 27.4787 23.7265 27.6054 24.0323C27.732 24.3381 27.7972 24.6659 27.7972 24.9969C27.7972 25.3279 27.732 25.6556 27.6054 25.9614C27.4787 26.2672 27.293 26.5451 27.059 26.7791C26.8249 27.0132 26.5471 27.1989 26.2413 27.3255C25.9355 27.4522 25.6077 27.5174 25.2767 27.5174C24.6082 27.5174 23.9671 27.2518 23.4944 26.7791C23.0217 26.3064 22.7562 25.6653 22.7562 24.9969C22.7562 24.3284 23.0217 23.6873 23.4944 23.2146C23.9671 22.7419 24.6082 22.4763 25.2767 22.4763Z" fill="white" />
        </svg>
    );

    const search = (
        <svg className="absolute w-[17px] h-[20px] top-[50%] left-[1rem] translate-y-[-50%]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.579 6.31004e-07C8.07976 0.000801964 6.60162 0.353313 5.26339 1.0292C3.92515 1.70509 2.76414 2.6855 1.87367 3.89164C0.9832 5.09778 0.38811 6.496 0.13623 7.97393C-0.115651 9.45185 -0.0172969 10.9683 0.423386 12.4013C0.86407 13.8343 1.63479 15.1439 2.6736 16.2249C3.71242 17.3059 4.99035 18.1281 6.40468 18.6255C7.81902 19.1229 9.33031 19.2815 10.8171 19.0886C12.3039 18.8957 13.7247 18.3567 14.9653 17.515L20.8883 23.4332C21.0528 23.6097 21.2512 23.7513 21.4716 23.8496C21.692 23.9478 21.93 24.0006 22.1713 24.0048C22.4126 24.0091 22.6522 23.9647 22.876 23.8743C23.0998 23.784 23.303 23.6494 23.4737 23.4788C23.6443 23.3081 23.7788 23.1049 23.8692 22.8811C23.9596 22.6574 24.004 22.4177 23.9997 22.1764C23.9955 21.9351 23.9426 21.6972 23.8444 21.4767C23.7462 21.2563 23.6046 21.0579 23.428 20.8934L17.5099 14.9704C18.489 13.5294 19.0568 11.8487 19.1522 10.1092C19.2476 8.36962 18.8671 6.63695 18.0515 5.09746C17.236 3.55798 16.0162 2.26991 14.5234 1.37177C13.0306 0.473622 11.3212 -0.000631453 9.579 6.31004e-07ZM3.58892 9.58412C3.58892 7.99545 4.22002 6.47185 5.34337 5.3485C6.46673 4.22514 7.99033 3.59404 9.579 3.59404C11.1677 3.59404 12.6913 4.22514 13.8146 5.3485C14.938 6.47185 15.5691 7.99545 15.5691 9.58412C15.5691 11.1728 14.938 12.6964 13.8146 13.8197C12.6913 14.9431 11.1677 15.5742 9.579 15.5742C7.99033 15.5742 6.46673 14.9431 5.34337 13.8197C4.22002 12.6964 3.58892 11.1728 3.58892 9.58412Z" fill="#7A7A7A" />
        </svg>
    );

    return (
        <>
            <GrwmDialog handleClickOpen={handleClickOpen} open={open} />
            <div className="feed--page">
                <div className="relative">
        
                    <div className="pb-[10px] px-[14px] laptop:pt-[3rem]">

                        {/* Search box */}
                        <div className='general search--box ' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                            <input
                                className='search--input'
                                type='search'
                                placeholder='Search for GRWM'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            {search}
                        </div>
                    </div>
                </div>

                <>
                    {liveData.length > 0 && (
                        <div className='mb-[1rem] laptop:max-w-md tablet:max-w-md mx-auto'>
                            <LiveCard data={liveData} url="diy" openLive={openLive} coHost={cohost} viewer={viewer} isConnected={isConnected} open={openAsce} handleClose={CloseAcseLive} broadcasterImg={broadcasterImg} />
                        </div>
                    )}
                </>

                <WithListContext render={({ isLoading, data }) => (
                    !isLoading && (
                        <>
                            <Grid container spacing='10px' rowGap={{ xs: 2 }} className='pb-[4rem] pt-[.5rem]'>

                                {result && result.length > 0 ? (
                                    <>
                                        {result.map((post) => {
                                            const mediaUrl = post.media[0]; // Get the URL of the single media file
                                            const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                            return (
                                                <Grid key={post.id} item xs={6} sm={6} md={4}>
                                                    <NormalCard mediaUrl={mediaUrl} post={post} isImage={isImage} url="hauls" />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        {data && data.map((post) => {
                                            const mediaUrl = post.media[0]; // Get the URL of the single media file
                                            const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                            return (
                                                <Grid key={post.id} item xs={6} sm={6} md={4}>
                                                    <NormalCard mediaUrl={mediaUrl} post={post} isImage={isImage} url="hauls" />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                )}
                            </Grid>
                        </>
                    ))}
                />
                <button className="fixed right-[10px] bottom-[135px] w- rounded-full z-[2000]" onClick={() => {
                    handleOpenLive();
                    createStream();
                }}>
                    {liveIcon}
                </button>

                <DFooter />
                {isConnected ? (
                    <LiveScreenDialog currentUser={currentUser} open={openAsce} broadcasterImg={broadcasterImg} broadcasterData={broadcasterData} handleClose={CloseAcseLive} room_id={room?.id} rooms={rooms} />
                ) : (
                        
                    <NewMeetingForm open={openLive} isConnected={isConnected} currentUser={currentUser} broadcaster={broadcaster?.code} room_id={room?.id} handleClose={handleCloseLive} pathname={pathname} />
                )}
            </div>
        </>
    );
};