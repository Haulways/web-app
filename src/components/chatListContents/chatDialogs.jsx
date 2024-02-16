import * as React from 'react';
import { Avatar, CircularProgress, Dialog, Slide } from '@mui/material';
import './chats.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import closeIcon from "../../assets/closeIcon.png";
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import sendChat from "../../assets/sendChat.png";
import { ThemeContext } from '../context/ThemeProvider';
import { supabase } from '../../supabase/SupabaseConfig';
import { useRefresh } from 'react-admin';
import { toast } from 'react-toastify';
import PostCard from '../postCard/PostCard';







  
export const ChatShow = ({ closeChat, openChat, currentUser, user, conversation, bottomRef, executeScroll, mediaFiles, setMediaFiles, cameraFile, setCameraFile, docFile, setDocFile, audioFile, setAudioFile }) => {
    const { theme } = React.useContext(ThemeContext);
    const [message, setMessage] = React.useState('');
    const [sentMessage, setSentMessage] = React.useState('');
    const refresh = useRefresh();
    const loggedInUserId = currentUser.id;
    const [isOpen, setIsOpen] = React.useState({});
    const [isButtonVisible, setIsButtonVisible] = React.useState({});
    const isOpenRef = React.useRef(null);
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);


    const [inputValue, setInputValue] = React.useState('');
    const [extractedUrls, setExtractedUrls] = React.useState([]);

    function extractUrls(input, site) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = input.match(urlRegex);

        if (!urls) return [];

        const filteredUrls = urls.filter(url => url.includes(site)
            && url.split('/')[2] === site);

        const parsedUrls = filteredUrls.map(url => {
            const urlParts = url.split('/');
            const _table = urlParts[3];
            const _id = urlParts[4];
            return `${_table}:${_id}`;
        });

        return parsedUrls;
    }


    const handleInputChange = (message) => {
       
        setInputValue(message);
        const urls = extractUrls(message, "haulway-demo-project.web.app");
        setExtractedUrls(urls);
    };

    React.useEffect(() => {

        if (message) {
            
            handleInputChange(message)
        }

    }, [message])

    React.useEffect(() => {

        if (extractedUrls) {
            console.log(extractedUrls);
        }

    }, [extractedUrls])

    

    let gridClass = mediaFiles?.length > 1 ? "grid-cols-2" : "grid-cols-1";

    console.log(user, message, conversation);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let filesToUpload = [];
        if (mediaFiles.length > 0) {
            filesToUpload = [...mediaFiles];
        }
        if (docFile) {
            filesToUpload.push(docFile);
        }
        if (cameraFile) {
            filesToUpload.push(cameraFile);
        }
        if (audioFile) {
            filesToUpload.push(audioFile);
        }

        setLoading(true)

        if (message.trim() !== '' || filesToUpload.length > 0) {
            const { error } = await supabase
                .from('chats')
                .insert([
                    {
                        content: message,
                        from_id: currentUser.id,
                        to_id: user?.id || conversation?.userId,
                        created_at: new Date(),
                        to_email: user?.email || conversation?.userEmail,
                        from_email: currentUser.email,
                        to_photoURL: user?.photoURL || conversation?.userPhoto,
                        from_photoURL: currentUser.photoURL,
                        from_displayName: currentUser.displayName,
                        to_displayName: user?.displayName || conversation?.userName,
                        attached_post_id: extractedUrls?.length > 0 ? extractedUrls[0] : null
                    }
                ]); // replace with the actual user IDs
      
            if (error) {
                console.error('Error inserting message:', error);
            } else {
                setMessage('');
                refresh()
                executeScroll();
            }
    
        }
        
        const uploadedFiles = [];

        for (let i = 0; i < filesToUpload.length; i++) {
            const file = filesToUpload[i];
            const filePath = file.name;
 
            const { data, error } = await supabase.storage.from('chats').upload(filePath, file, {
                resumable: true,
                onProgress: (bytesUploaded, bytesTotal) => {
                    const progress = (bytesUploaded / bytesTotal) * 100;
                    console.log(progress);
                    document.getElementById('progress-bar').style.width = progress + '%';
                },
            });

 
            if (error) {
                console.error('Error uploading file:', error);
                toast.error(error.message);
                setLoading(false);
                return
            } else {
                console.log('File uploaded successfully:', data);
                
                // Retrieve the public URL of the uploaded file
                const { data: urlData, error: urlError } = supabase.storage.from('chats').getPublicUrl(filePath);

                if (urlError) {
                    console.error('Error retrieving public URL:', urlError);
                } else {
                    uploadedFiles.push({
                        file_type: file.type,
                        file_URL: urlData.publicUrl, // Public URL of the uploaded file
                    });
                }
            }
        }
     

        if (uploadedFiles.length > 0) {
            const { error } = await supabase
                .from('chats')
                .update({ attached_media: uploadedFiles })
                .eq('content', sentMessage)
                .eq('from_id', currentUser.id)
                .eq('to_id', user?.id || conversation?.userId)
      
            if (error) {
                console.error('Error inserting message:', error);
                setLoading(false)
            } else {
                setLoading(false)
                setMediaFiles([])
                setSentMessage('')
                setCameraFile(null)
                setDocFile(null)
                setAudioFile(null)
                refresh()
                executeScroll();
            }
    
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const handleAudioFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setAudioFile(selectedFile);
    };

    const handleDocFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setDocFile(selectedFile);
    };
    

    const handleCameraFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setCameraFile(selectedFile);
    };

    const handleMediaFileChange = (e) => {
        const selectedFiles = e.target.files;
        const filesArray = Array.from(selectedFiles);
        setMediaFiles(filesArray);
    };

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpenRef.current && !isOpenRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    


    function timeFuntion(current, previous) {
        let options = { hour: '2-digit', minute: '2-digit', hour12: true };
        let timeString = previous.toLocaleTimeString('en-US', options);
        let dateString = previous.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
        return `${timeString} ${dateString}`;
    }

    
    
    return (
        <>
            <Dialog
                open={openChat}
                onClose={closeChat}
                fullScreen
                PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}
            // TransitionComponent={Transition}
            >
                <div className='p-[20px]'>
                    <div className='fixed top-0 h-[70px] w-full left-0 right-0 z-[2000] py-[1rem]' style={{ backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", }} >
                        <ArrowBackIosIcon fontSize='18' className='absolute top-[2rem] left-[.9rem]' onClick={closeChat} />
                        {/* friend header  */}
                        <div className='friend--online pl-[2.2rem]'>
                            <div className='friend--avatar'>
                                <Avatar className='drop-shadow-lg' sx={{ width: '40px', height: "40px" }}
                                    src={conversation?.userPhoto || user?.photoURL}
                                />
                            </div>
                            <div className='friend--name'>
                                <h2>{conversation?.userName || user?.displayName}</h2>
                                <p>Online</p>
                                <div className='w-[10px] h-[10px] rounded-full bg-green-500 inline-block'></div>
                            </div>
                        </div>
                    </div>
                    {/* messages */}
                    <div className='messages--container' >

                        {conversation?.messages?.map((message) => (
                            <div key={message.id}>
                                {message.from_id === loggedInUserId ?
                                    (
                                        
                                        <div className='user--message relative' ref={isOpenRef}
                                            onMouseEnter={() => setIsButtonVisible(prevState => ({ ...prevState, [message.id]: true }))}
                                            onMouseLeave={() => setIsButtonVisible(prevState => ({ ...prevState, [message.id]: false }))}
                                        >
                                            <RenderButton message={message} isButtonVisible={isButtonVisible} setIsOpen={setIsOpen} />

                                            <RenderDropdown message={message} isOpen={isOpen} theme={theme} />

                                            {/* message from user  */}
                                            <div className='user--message--body' style={{ backgroundColor: theme === "light" ? "#e6e6e6" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff", }}>

                                                {message?.attached_post_id ?
                                                    <PostCard postId={message?.attached_post_id} /> : null}
                                                
                                                <p>
                                                    {capitalizeFirstLetter(message?.content)}
                                                </p>
                                                <RenderSingleMedia message={message} />

                                                <RenderMedia message={message} />
                                                
                                                <span className='text-[9px] float-right pt-[3px]'>
                                                    {timeFuntion(new Date(), new Date(message?.created_at))}
                                                </span>
                                            </div>
                                            <div className='user--message--image'>
                                                <Avatar className='drop-shadow-lg' sx={{ width: '40px', height: "40px" }}
                                                    src={message?.from_photoURL}
                                                />
                                            </div>
                                        
                                        </div>
                                    ) : (
                                        <div ref={isOpenRef} className='friend--message relative'
                                            onMouseEnter={() => setIsButtonVisible(prevState => ({ ...prevState, [message.id]: true }))}
                                            onMouseLeave={() => setIsButtonVisible(prevState => ({ ...prevState, [message.id]: false }))}
                                        >
                                            <div className='friend--message--image'>
                                                <Avatar className='drop-shadow-lg' sx={{ width: '40px', height: "40px" }}
                                                    src={conversation?.userPhoto}
                                                />
                                            </div>

                                            {/* message from friend  */}
                                            <div className='message--body' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#fff" : "#fff", }}>

                                                {message?.attached_post_id ? 
                                                    <PostCard postId={message?.attached_post_id} /> : null}

                                                <p>
                                                    {capitalizeFirstLetter(message?.content)}
                                                </p>
                                                <RenderSingleMedia message={message} />

                                                <RenderMedia message={message} />

                                                <span className='text-[9px] float-right pt-[3px]'>
                                                    {timeFuntion(new Date(), new Date(message?.created_at))}
                                                </span>
                                            </div>

                                            <RenderButton message={message} isButtonVisible={isButtonVisible} setIsOpen={setIsOpen} />
                                            <RenderDropdown message={message} isOpen={isOpen} theme={theme} />
                                        </div>
                                    )}
                                
                            </div>
                        ))}
                        <div className='h-[70px] w-full bg-transparent' ref={bottomRef}></div>
                    </div>

                    {!conversation &&
                        <div className='flex flex-col items-center justify-center my-auto mx-auto text-[16px]'>
                            Start a new chat
                        </div>
                    }

                    <div className={((mediaFiles?.length > 0) || cameraFile || docFile || audioFile) && ` grid gap-2 ${gridClass} bg-[#fff] p-[.5rem] rounded-[10px] max-h-[500px] max-w-[305px] mx-auto overflow-y-scroll live--card fixed bottom-[6rem]  z-[1000]`} style={{ backgroundColor: theme === "light" ? "rgba(68, 68, 68, 1)" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#fff" : "#fff", }}>
                        {mediaFiles?.length > 0 &&
                            <img src={closeIcon} onClick={() => setMediaFiles([])} className='absolute w-[30px] h-[30px] z-[2000]' alt='close' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                        }

                        {mediaFiles?.length > 0 && mediaFiles?.map((media, index) => (
                            <>
                                <MediaItem key={index} media={media} />
                            </>
                        ))}
                        {cameraFile && (
                            <>
                                <img src={closeIcon} onClick={() => setCameraFile(null)} className='absolute w-[30px] h-[30px] z-[2000]' alt='close' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <MediaItem media={cameraFile} />
                            </>
                        )}
                        
                        {/* {docFile && (
                            <>
                               
                                <div className="max-h-[80px] rounded-[10px] overflow-hidden">
                                
                                    <FileViewer
                                    
                                        fileType={docFile.type}
                                        filePath={docFile}
                                    />
                                </div>
                                <p>{docFile.name}</p>
                            </>
                        )} */}

                        {audioFile && (
                            <>
                                <img src={closeIcon} onClick={() => setAudioFile(null)} className='absolute w-[30px] h-[30px] z-[2000]' alt='close' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <audio src={URL.createObjectURL(audioFile)} controls />
                            </>
                        )}

                        {loading && ((mediaFiles?.length > 0) || cameraFile || docFile || audioFile) && (

                            <div className="upload-progress-bar">
                                <CircularProgress sx={{ filter: theme === "light" ? "invert(1)" : "invert(1)", width: '50px', height: '50px' }} />
                            </div>
                        )}
                    </div>

                    

                    <div className={`p-[1rem] rounded-[10px] z-[1500] fixed bottom-[6rem] min-w-[220px] ${show ? 'visible' : 'hidden'}`} style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#fff" : "#fff", transition: 'all 3s ease-in-out' }}>
                        <ul className='share_files'>
                            <li onClick={() => setShow(false)}>
                                <label htmlFor='mediafile' >
                                    <InsertPhotoOutlinedIcon className='mr-[3px]' /> Photos & Videos
                                    <input
                                        type="file"
                                        id="mediafile"
                                        multiple
                                        onChange={handleMediaFileChange}
                                        accept="video/*,image/*"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </li>
                            <li onClick={() => setShow(false)}>
                                <label htmlFor='camerafile' >
                                    <CameraAltOutlinedIcon className='mr-[3px]' /> Camera
                                    <input
                                        type="file"
                                        id="camerafile"
                                        capture='camera'
                                        onChange={handleCameraFileChange}
                                        accept="video/*,image/*"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </li>
                            <li onClick={() => setShow(false)}>
                                <label htmlFor='docfile' >
                                    <InsertDriveFileOutlinedIcon className='mr-[3px]' /> Document
                                    <input
                                        type="file"
                                        id="docfile"
                                        onChange={handleDocFileChange}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </li>
                            <li onClick={() => setShow(false)}>
                                <label htmlFor='audiofile' >
                                    <AudioFileOutlinedIcon className='mr-[3px]' /> Audio
                                    <input
                                        type="file"
                                        id="audiofile"
                                        onChange={handleAudioFileChange}
                                        accept="audio/*"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </li>
                        </ul>
                    </div>

                    
                    
                </div>
                {/* message box  */}
                <div className='create--chat--box' style={{ backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", }}>
                    <form className='chatBox' onSubmit={handleSubmit}>
                        <AttachFileIcon onClick={() => setShow(!show)} />
                        <textarea rows={1} style={{ resize: "none" }} value={message}
                            onChange={(e) => { setMessage(e.target.value); setSentMessage(e.target.value) }} placeholder='Write a message' />
                        <button type='submit'>
                            <img width='36' height='36' src={sendChat} className='cursor-pointer' />
                        </button>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

function MediaItem({ media }) {
    // Create a ref to store the media element
    const mediaRef = React.useRef(null);
  
    // Create a blob URL from the media object
    const blobURL = URL.createObjectURL(media);
  
    // Revoke the blob URL when the media is loaded or when the component is unmounted
    React.useEffect(() => {
      const media = mediaRef.current;
      if (media) {
        media.addEventListener("load", () => {
          URL.revokeObjectURL(blobURL);
        });
      }
      return () => {
        URL.revokeObjectURL(blobURL);
      };
    }, [blobURL]);
  
    // Render the media item component
    return (
        <div className="media-item">
            {media.type.startsWith("image/") ? (
                // If the media is an image, render an img element
                <img
                    ref={mediaRef}
                    src={blobURL}
                    alt=""
                    width="100"
                    height="100"
                    style={{ objectFit: "cover" }}
                />
            ) : media.type.startsWith("video/") ? (
                // If the media is a video, render a video element
                <video
                    ref={mediaRef}
                    src={blobURL}
                    width="100"
                    height="100"
                    controls={false}
                    playsInline={true}
                    style={{ objectFit: "cover" }}
                />
            ) : null}
        </div>
    );
};

function RenderMedia({ message }) {
    if (message?.attached_media?.length > 1) {
        return (
            <div className="grid gap-2 grid-cols-2 mt-2.5">
                {message?.attached_media?.slice(0, 4).map((media, index) => (
                    <div key={index} className="group relative">
                        <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <button data-tooltip-target="download-image-1" className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                    <path stroke="currentColor" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                </svg>
                            </button>
                            <div id="download-image-1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Download image
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <img src={media.file_URL} className="rounded-lg " />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}

function RenderSingleMedia({ message }) {
    if (message?.attached_media?.length === 1) {
        return (
            <div className="group relative mt-2.5 ">
                <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button data-tooltip-target="download-image" className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                        <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                        </svg>
                    </button>
                    <div id="download-image" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Download image
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <img src={message?.attached_media[0]?.file_URL} className="rounded-lg h-[200px]" />
            </div>
        );
    } else {
        return null;
    }
}

function RenderButton({ message, isButtonVisible, setIsOpen }) {
    if (isButtonVisible[message.id]) {
        return (
            <button onClick={() => setIsOpen(prevState => ({ ...prevState, [message.id]: !prevState[message.id] }))} className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 mr-[-1rem] bg-transparent rounded-lg  focus:outline-none dark:text-white  " type="button">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>
        );
    } else {
        return null;
    }
}

function RenderDropdown({ message, isOpen, theme }) {
    if (isOpen[message.id]) {
        return (
            <div className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-40  dark:divide-gray-600 absolute top-[0rem]" style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 1)" }}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                </ul>
            </div>
        );
    } else {
        return null;
    }
}