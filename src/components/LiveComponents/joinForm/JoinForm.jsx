import { useHMSActions } from '@100mslive/react-sdk';
import { CircularProgress, Dialog } from '@mui/material';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from '../../../supabase/SupabaseConfig';
import { LiveScreenDialog } from '../../dialog/DialogBox';


const NewMeetingForm = ({open, handleClose, broadcaster, currentUser, pathname, isConnected, room_id}) => {
  const { theme } = useContext(ThemeContext);
    const hmsActions = useHMSActions();

    const startStream = async () => {
        const url = `https://api.100ms.live/v2/live-streams/room/${room_id}/start`;
        const data = {
            "meeting_url" : "",
            "recording": {
                "hls_vod": false,
                "single_file_per_layer": true
            },
            "transcription": {
                "enabled": true,
                "modes": ["recorded", "live"],
                "output_modes": ["txt", "srt", "json"],
                "custom_vocabulary": ["100ms", "WebSDK", "Flutter", "Sundar", "Pichai", "DALL-E"],
                "summary": {
                    "enabled": true,
                    "context": "this is a general call",
                    "sections": [
                        {
                            "title": "Agenda",
                            "format": "bullets"
                        },
                        {
                            "title": "Key Points",
                            "format": "bullets"
                        },
                        {
                            "title": "Action Items",
                            "format": "bullets"
                        },
                        {
                            "title": "Short Summary",
                            "format": "paragraph"
                        }
                    ],
                    "temperature": 0.5
                }
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    }
    
    const newMeeting = async (roomCode) => {
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        const userName = currentUser.displayName;
        try {
            await hmsActions.join({ userName, authToken });
            // await hmsActions.startHLSStreaming();
        } catch (e) {
            console.error(e);
        }
        // startStream();

    };


    const goLive = async (roomCode) => {
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        const userName = currentUser.displayName;
        try {
            await hmsActions.join({ userName, authToken });
            await hmsActions.startHLSStreaming();
            await supabase
            .from('liveStream')
            .update({ hls: true })
            .match({ created_by_id: currentUser.id, created_by_name: currentUser.displayName, URL: pathname })
            .select();
        } catch (e) {
            console.error(e);
        }
        startStream();
    
    };
    
    useEffect(() => {
        if (isConnected) {
            handleClose();
        }
      
    }, [isConnected]);

    const [rooms, setRooms] = useState([]);
    



    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#222" : "#222", color: theme === "light" ? "#fff" : "#fff", position: 'relative' } }}
        >

                <div >
                    <button
                        className="close__btn"
                        edge="start"
                        color="inherit"
                        onClick={
                            handleClose
                        }
                        aria-label="close"
                    >
                        <CloseIcon />
                    </button>
                    <div className='absolute top-[30%] flex justify-center items-center left-0 right-0 mx-auto'>
                        <div className='min-w-[310px] min-h-[150px] p-[20px] shadow-sm shadow-stone-500 rounded-sm'>
                            {/* <h2 className="text-[18px] font-[500]">Join As A:</h2> */}
                            <div className='flex my-[2rem] justify-evenly gap-x-3'>

                                <button className='bg-[rgba(68, 68, 68, 0.2)] outline rounded-sm outline-1 px-[2rem] py-[.3rem]' onClick={() => newMeeting(broadcaster)}>
                                    New Meeting
                                </button>
                                
                                <button className='bg-[#FF0000] font-[500] text-white outline outline-zinc-500 outline-1 rounded-md px-[1.5rem] py-[.3rem]' onClick={() => goLive(broadcaster)}>
                                    Go Live
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
 
        </Dialog>
    );
};

export default NewMeetingForm



export const JoinForm = ({openLive, handleCloseLive, currentUser, coHost, viewer, room_id, open, handleClose, isConnected, broadcasterImg, host}) => {
    const { theme } = useContext(ThemeContext);
      const hmsActions = useHMSActions();
 
      
      const joinAsViewer = async (roomCode) => {
          const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
          const userName = currentUser.displayName;
          try {
              await hmsActions.join({ userName, authToken });
          } catch (e) {
              console.error(e);
          }
      };
  
      const joinAsCoHost = async (roomCode) => {
          const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
          const userName = currentUser.displayName;
          try {
              await hmsActions.join({ userName, authToken });
          } catch (e) {
              console.error(e);
          }
      };
      
      const [rooms, setRooms] = useState([]);
    

    useEffect(() => {
        const fetchActiveRooms = async () => {
            const response = await fetch('https://api.100ms.live/v2/sessions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
                }
            });
              
            const data = await response.json();
            const activeRooms = data.data.filter(room => room.active === true && room.room_id === room_id);
            setRooms(activeRooms);
            return data.sessions;
        };
         
      
        fetchActiveRooms();
    }, [rooms]);
      
  
    return (
        <Dialog
            fullScreen
            open={openLive}
            onClose={handleCloseLive}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#222" : "#222", color: theme === "light" ? "#fff" : "#fff", position: 'relative' } }}
        >
  
            <div >
                <button
                    className="close__btn"
                    edge="start"
                    color="inherit"
                    onClick={
                        handleCloseLive
                    }
                    aria-label="close"
                >
                    <CloseIcon />
                </button>
                <div className='absolute top-[30%] flex justify-center items-center left-0 right-0 mx-auto'>
                    <div className='min-w-[310px] min-h-[150px] p-[20px] shadow-sm shadow-stone-500 rounded-sm'>
                        <h2 className="text-[18px] font-[500]">Join As A:</h2>
                        <div className='flex mt-[2rem] justify-evenly gap-x-3'>
  
                            <button className='bg-[rgba(68, 68, 68, 0.2)] outline outline-1 rounded-sm px-[2rem] py-[.2rem]' onClick={() => joinAsCoHost(coHost)}>
                                Co-host
                            </button>
                                  
                            <button className='bg-[rgba(68, 68, 68, 0.2)] outline outline-1 rounded-sm px-[2rem] py-[.2rem]' onClick={() => joinAsViewer(viewer)}>
                                Viewer
                            </button>
                                  
                        </div>
                    </div>
                </div>
            </div>
            {isConnected && (
                <LiveScreenDialog broadcasterImg={broadcasterImg} currentUser={currentUser} open={open} handleClose={handleClose} room_id={room_id} rooms={rooms} broadcasterData={host} />
            )}
        </Dialog>
    );
  };
  