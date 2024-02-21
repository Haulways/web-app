import * as React from 'react';
import { ChatShow } from './chatDialogs';
import './chats.css'
import { AuthContext } from '../context/AuthContext';
import search from "../../assets/searchIcon.png";
import { ThemeContext } from '../context/ThemeProvider';
import { supabase } from '../../supabase/SupabaseConfig';
import { Avatar } from '@mui/material';
import { useRefresh } from 'react-admin';
import { useLocation } from 'react-router-dom';

export const Chats = ({ messages, mediaFiles, setMediaFiles, cameraFile, setCameraFile, docFile, setDocFile, audioFile, setAudioFile }) => {
    const { theme } = React.useContext(ThemeContext);
    const [openChat, setOpenChat] = React.useState(false);
    const [openChat2, setOpenChat2] = React.useState(false);
    const [conversations, setConversations] = React.useState([]);
    const { currentUser } = React.useContext(AuthContext);
    const [input, setInput] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const location = useLocation();
    const [selectedConvs, setSelectedConvs] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [selectedConv, setSelectedConv] = React.useState(null);
    const [sharedURL, setSharedURL] = React.useState(location?.state?.url);
    const bottomRef = React.useRef()

   

    const executeScroll = () => bottomRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })   
    const refresh = useRefresh();



    React.useEffect(() => {
        if (input.length > 0) {
            supabase
                .from('users')
                .select('*')
                .ilike('displayName', `%${input}%`)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching users:', error);
                    } else {
                        setUsers(data);
                    }
                });
        } else {
            setUsers([]);
        }
    }, [input]);

    console.log(selectedUser, selectedConv)

    const loggedInUserId = currentUser.id;
    const loggedInUserEmail = currentUser.email;
    const loggedInUserName = currentUser.displayName;
    const loggedInUserPhoto = currentUser.photoURL;

    const handleOpenChat = (user) => {
        setOpenChat(true);
        setSelectedUser(user);
        const selectedConversation = conversations.find(conversation => conversation.userId === user.id);
        setSelectedConvs(selectedConversation);
        setSelectedConv(selectedConversation?.conversationKey);
   
    }

    const handleOpenChat2 = (conversation) => {
        setOpenChat2(true);
        setSelectedConvs(conversation)
        setSelectedConv(conversation.conversationKey);
    }

    const closeChat = () => {
        setOpenChat(false)
        setInput('')
    }

    const closeChat2 = () => {
        setOpenChat2(false)
        setInput('')
    }

    React.useEffect(() => {
        // Function to organize messages into threaded conversations
        const organizeConversations = async () => {
          // Object to hold conversations
          const conversationsMap = {};
      
          // Loop through all messages
          messages?.forEach((message, index) => {
            // Determine the other person in the conversation
            const otherUserId = message.from_id === loggedInUserId ? message.to_id : message.from_id;
            
            // Only process messages that involve the logged-in user and the other user
            if ([loggedInUserId, otherUserId].includes(message.from_id) && [loggedInUserId, otherUserId].includes(message.to_id)) {
              const otherUserEmail = message.from_email === loggedInUserEmail ? message.to_email : message.from_email;
              const otherUserName = message.from_displayName === loggedInUserName ? message.to_displayName : message.from_displayName;
              const otherUserPhoto = message.from_photoURL === loggedInUserPhoto ? message.to_photoURL : message.from_photoURL;
      
              // Create a unique key for each conversation
              const conversationKey = `${otherUserId}_${otherUserEmail}`;
      
              const uniqueMessageId = `${message.id}_${index}`;
              // Check if the conversation already exists
              if (conversationsMap[conversationKey]) {
                // If conversation exists, add the message to the existing thread
                conversationsMap[conversationKey].messages.push({ ...message, id: uniqueMessageId });
                conversationsMap[conversationKey].lastMessageTimestamp = new Date(message.created_at);
       conversationsMap[conversationKey].messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
              } else {
                // If conversation doesn't exist, create a new one
                conversationsMap[conversationKey] = {
                  userId: otherUserId,
                  userEmail: otherUserEmail,
                  userName: otherUserName,
                  userPhoto: otherUserPhoto,
                    messages: [message],
                    lastMessageTimestamp: new Date(message.created_at),
                    conversationKey: conversationKey,
                };
              }
            }
          });
      
          // Convert conversationsMap to an array for rendering
          const organizedConversations = Object.values(conversationsMap);
          organizedConversations.sort((a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp));
          // Update the state with the organized conversations
          setConversations(organizedConversations);
        };
        refresh()
        // Call the organizeConversations function when messages or user info change
        organizeConversations();
      }, [messages, loggedInUserId, loggedInUserEmail]);
      
    
    
    React.useEffect(() => {

        if (selectedConv !== null) {
            const selectedConversation = conversations.find(conversation => conversation.conversationKey === selectedConv);
            setSelectedConvs(selectedConversation);
            if (openChat === true || openChat2 === true) {
                executeScroll();
            }
        }
        if (selectedUser && !selectedConv) {
            const selectedConversation = conversations.find(conversation => conversation.userId === selectedUser.id);
            setSelectedConvs(selectedConversation);
        }
    }, [conversations, selectedConv, selectedUser]);
    


    React.useEffect(() => {
        const chatChannel = supabase
        .channel('room1')
        .on('postgres_changes', { event: '*', schema: '*', table: 'chats' }, payload => {
            console.log('Chat change received!', payload);
            refresh()
            setConversations(prevConversations => {
                // If the change is a new message, append the new data to the existing data
                if (payload.eventType === 'INSERT') {
                    refresh()
                    return [...prevConversations, payload.new];
                }
                // If the change is a deletion, filter out the data from the existing data
                else if (payload.eventType === 'DELETE') {
                    refresh()
                    return prevConversations.filter(item => item.id !== payload.new.id); // assuming each item has a unique id
                }
                // If the change is an update, update the corresponding data
                else if (payload.eventType === 'UPDATE') {
                    refresh()
                    return prevConversations.map(item => item.id === payload.new.id ? payload.new : item);
                }
                return prevConversations;
            });
        })
            .subscribe();
            return () => {
                supabase.removeChannel(chatChannel);
             };

    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function timeDifference(current, previous) {
        if (isNaN(current) || isNaN(previous)) {
            return 'Invalid date';
        }
    
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;
        const msPerMonth = msPerDay * 30;
    
        const elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + 's';
        }
    
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + 'm';
        }
    
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + 'h';
        }
    
        else if (elapsed < msPerWeek) {
            return Math.round(elapsed / msPerDay) + 'd';
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerWeek) + 'w';
        }
    
        else {
            return Math.round(elapsed / msPerMonth) + 'M';
        }
    }

    return (
        <>
            <div className='chatShowList feed--page'>
                {/* Search box */}
                <div className='general search--box' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                    <input
                        className='search--input'
                        type='search'
                        placeholder='Search for people'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <img width='20' height='20' src={search} alt='search' />
                </div>

                {/* Search results */}
                {users.length > 0 && (
                    <div className='absolute left-0 right-0 mx-auto top-[5rem] max-h-[500px] overflow-y-scroll z-[1000] rounded-[10px] p-[1rem]'
                        style={{ backgroundColor: theme === "light" ? "#fff" : "#222", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)" }}
                
                    >
                        {users.map((user) => (
                            <div key={user.id} >
                                <div className='flex items-center gap-x-3 mb-[1rem] cursor-pointer' onClick={() => handleOpenChat(user)}>
                                    <Avatar className='drop-shadow-lg' sx={{ width: '40px', height: "40px" }}
                                        src={user.photoURL}
                                    />
                                    <p>{user.displayName}</p>
                                </div>
                                <ChatShow setSharedURL={setSharedURL} sharedURL={sharedURL} executeScroll={executeScroll} bottomRef={bottomRef} openChat={openChat} currentUser={currentUser} conversation={selectedConvs} closeChat={closeChat} user={selectedUser}  mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} cameraFile={cameraFile} setCameraFile={setCameraFile} docFile={docFile} setDocFile={setDocFile} audioFile={audioFile} setAudioFile={setAudioFile} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Chat list */}
                <div className='chatList'>
                    
                    <h2 className='heading'>Recent</h2>

                    {/* user chats container*/}
                    <div className='friends--container'>
                 
                        {conversations.map((conversation) => {
                            if (Array.isArray(conversation.messages)) {
                                const sortedMessages = [...conversation.messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                              
                                return (
                                    <div key={conversation.conversationKey}>
                                        <div className='user--friend' onClick={() => handleOpenChat2(conversation)}>
                                            {/* person's image */}
                                            <div className='friend--image'>
                                                <Avatar className='drop-shadow-lg' sx={{ width: '40px', height: "40px" }}
                                                    src={conversation.userPhoto}
                                                />
                                            </div>
                                            {/* chat info */}
                                            <div className='friend--info'>
                                                {/* name  */}
                                                <h3>{conversation.userName}</h3>
                                                {/* chat text  */}
                                                {/* Display only the last message in the conversation */}
                                                <p key={sortedMessages[0].userId} className='short--message'>{capitalizeFirstLetter(sortedMessages[0].content)}
                                                </p>
 
                                                {/* time ago*/}
                                                <p className='message--time'>
                                                    {timeDifference(new Date(), new Date(sortedMessages[0].created_at))}
                                                </p>
                                                {/* number of messages */}
                                                <p className='number--of--message'>1</p>
                                            </div>
                                        </div>
                                        <ChatShow setSharedURL={setSharedURL} sharedURL={sharedURL} executeScroll={executeScroll} bottomRef={bottomRef} openChat={openChat2} conversation={selectedConvs} closeChat={closeChat2} currentUser={currentUser} user={selectedUser?.id === conversation.userId ? selectedUser : ''}  mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} cameraFile={cameraFile} setCameraFile={setCameraFile} docFile={docFile} setDocFile={setDocFile} audioFile={audioFile} setAudioFile={setAudioFile} />

                                    
                                    </div>
                                )
                            }
                        })}
                        

                       

                    </div>
                    <div ref={bottomRef}></div>
                </div>
            </div>

        </>
    );
};