import { useState } from "react";
import * as React from 'react'
import { FFmpeg } from "@ffmpeg/ffmpeg";
import * as helpers from "../../helpers";
import RangeInput, { ThumbnailRangeInput } from "../videoEditor/RangeInput";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import './css/editor.css'
import { EditorVideoPlayer } from "../videoPlayer/VideoPlayer";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { PiDotOutlineFill } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoArrowForwardCircle } from 'react-icons/io5';
import coverIcon from '../../assets/postImg-Icons/coverPhoto.png';
import { Dialog, Slide } from "@mui/material";
import backIcon from "../../assets/editorIcons/closeEdit.png";
import PostContainer from "../createPost/PostContainer";
import { AuthContext } from "../context/AuthContext";
import tagIcon from "../../assets/editorIcons/tagbtn.png";






function VideoTrimmer({ selectedfiles, activeFile, collectionName, taggedData, setSelectedFiles, theme, selectedFilesBlobs, setSelectedFilesBlobs, }) {
    const [openSendPost, setOpenSendPost] = React.useState(false);
    const { currentUser } = React.useContext(AuthContext);
    const [inputVideoFile, setInputVideoFile] = useState(null);
    const [videoMeta, setVideoMeta] = useState(null);
    const [URL, setURL] = useState([]);
    const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
    const [trimIsProcessing, setTrimIsProcessing] = useState(false);
    const [rStart, setRstart] = React.useState(0);
    const [rEnd, setRend] = React.useState(100);
    const [thumbNails, setThumbNails] = React.useState([]);
    const [newFiles, setNewFiles] = React.useState([]);
    const [thumbnailIsProcessing, setThumbnailIsProcessing] = React.useState(false);
    const ffmpegRef = React.useRef(new FFmpeg());
    const [loaded, setLoaded] = React.useState(false);
    const [currentThumbnailIndex, setCurrentThumbnailIndex] = React.useState(0);
    const [trimmedDuration, seTrimmedDuration] = React.useState(null);
    const [trimmedSize, setTrimmedSize] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(true);
    const [coverPhoto, setCoverPhoto] = React.useState(false);
    // cover photo state variables
    const [thumbNails1, setThumbNails1] = React.useState([]); const [thumbnailIsProcessing1, setThumbnailIsProcessing1] = React.useState(false);
    const [currentThumbnailIndex1, setCurrentThumbnailIndex1] = React.useState(0);

    // thumbnail for video poster
    const currentThumbnail = thumbNails1[currentThumbnailIndex1];

    // Function to handle errors
    function errorHandler(error) {
        console.error('Error: ' + error);
    }





    // open the post send container 
    const handleSendPost = () => {
        if (trimmedVideoFile && activeFile) {
            const updatedSelectedFiles = [...selectedfiles];
            const fileIndex = updatedSelectedFiles.findIndex((file) => file === activeFile);
            if (fileIndex !== -1) {
                updatedSelectedFiles[fileIndex] = trimmedVideoFile; // Replace the active file with the trimmed video file
                setSelectedFiles(updatedSelectedFiles); // Update the state with the new array
            }
        } else if (inputVideoFile && activeFile) {
            const updatedSelectedFiles = [...selectedfiles];
            const fileIndex = updatedSelectedFiles.findIndex((file) => file === activeFile);
            if (fileIndex !== -1) {
                updatedSelectedFiles[fileIndex] = inputVideoFile; // Replace the active file with the inputVideoFile video file
                setSelectedFiles(updatedSelectedFiles); // Update the state with the new array
            }
        } else if (trimmedVideoFile && selectedfiles[0]) {
            const updatedSelectedFiles = [...selectedfiles];
            const fileIndex = updatedSelectedFiles.findIndex((file) => file === selectedfiles[0]);
            if (fileIndex !== -1) {
                updatedSelectedFiles[fileIndex] = trimmedVideoFile; // Replace the active file with the trimmed video file
                setSelectedFiles(updatedSelectedFiles); // Update the state with the new array
            }
        } else if (inputVideoFile && selectedfiles[0]) {
            const updatedSelectedFiles = [...selectedfiles];
            const fileIndex = updatedSelectedFiles.findIndex((file) => file === selectedfiles[0]);
            if (fileIndex !== -1) {
                updatedSelectedFiles[fileIndex] = inputVideoFile; // Replace the active file with the inputVideoFile video file
                setSelectedFiles(updatedSelectedFiles); // Update the state with the new array
            }
        }
        setOpenSendPost(true)
    };


    const closeSendPost = () => { setOpenSendPost(false) };

    const togglePlay = () => { setIsPlaying(!isPlaying) };
    const toggleMute = () => { setIsMuted(!isMuted) };


    // open cover photo tab 
    const openCoverPhoto = () => { setCoverPhoto(true) };
    const closeCoverPhoto = () => { setCoverPhoto(false) };


    const load = async () => {
        // Check if FFmpeg is already available in the window
        // if (!window.ffmpeg) {
        //     // ffmpegRef.current = window.ffmpeg;
        //     setLoaded(true);
        //     handleChange();
        //     handleTrim();
        //     return;
        // }

        const baseURL = '/dist/esm';

        const ffmpeg = ffmpegRef.current;
        // const ffmpeg = createFFmpeg({ log: true, corePath: "/dist/esm/ffmpeg-core.js" });
        ffmpeg.on('log', ({ message }) => {
            // messageRef.current.innerHTML = message;
            // console.log(message);
        });

        try {
            // toBlobURL is used to bypass CORS issue, urls with the same
            // domain can be used directly.
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });


            // Store FFmpeg instance in the window to reuse it later
            ffmpegRef.current = ffmpeg;
            // console.log(ffmpeg);
            // window.ffmpeg = ffmpeg;
            setLoaded(true);
            handleChange();
            handleTrim();
        } catch (error) {
            console.error('Failed to load FFmpeg:', error);
        }
    };


    React.useEffect(() => { load() }, []);

    


    const handleChange = async () => {
        if (activeFile) {
            setInputVideoFile(activeFile);
            setURL(await helpers.readFileAsBase64(activeFile));
        } else if (selectedfiles && selectedfiles.length > 0) {
            setInputVideoFile(selectedfiles[0]);
            setURL(await helpers.readFileAsBase64(selectedfiles[0]));
        }
    };


    const handleLoadedData = async (e) => {
        const el = e.target;

        const meta = {
            name: inputVideoFile.name,
            duration: el.duration,
            videoWidth: el.videoWidth,
            videoHeight: el.videoHeight
        };
        // console.log({ meta }, el);
        setVideoMeta(meta);
        const thumbNails = await getThumbnails(meta);
        setThumbNails(thumbNails);
    };



    const getThumbnails = async ({ duration }) => {
        // if (!window.ffmpeg) {
        //     await load();
        // }
        const ffmpeg = ffmpegRef.current;
        setThumbnailIsProcessing(true);
        let MAX_NUMBER_OF_IMAGES = 15;
        let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
        let offset =
            duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;

        const arrayOfImageURIs = [];

        await ffmpeg.writeFile(inputVideoFile.name, await fetchFile(inputVideoFile));


        for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
            let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));
            // console.log(startTimeInSecs, inputVideoFile)
            try {
                await ffmpeg.exec([
                    "-ss",
                    startTimeInSecs,
                    "-i",
                    inputVideoFile.name,
                    "-t",
                    "00:00:1.000",
                    "-vf",
                    `scale=150:-1`,
                    `img${i}.png`]
                );
                let data = null
                data = await ffmpeg.readFile(`img${i}.png`);
                // console.log(data);
                let blob = new Blob([data.buffer], { type: "image/png" });
                let dataURI = await helpers.readFileAsBase64(blob);

                // ffmpeg.unlink(`img${i}.png`);
                arrayOfImageURIs.push(dataURI);
            } catch (error) {
                console.log({ message: error });
            }
        }
        setThumbnailIsProcessing(false);

        return arrayOfImageURIs;
    };

    const handleTrim = async () => {
        // if (!window.ffmpeg) {
        //     await load();
        // }
        // console.log('start')
        if (loaded) {
            // console.log('started')
            const ffmpeg = ffmpegRef.current;
            setTrimIsProcessing(true);

            let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
            let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);

            try {
                await ffmpeg.writeFile(inputVideoFile.name, await fetchFile(inputVideoFile));
                // await FF.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');
                await ffmpeg.exec([
                    "-ss",
                    helpers.toTimeString(startTime),
                    "-i",
                    inputVideoFile.name,
                    "-t",
                    helpers.toTimeString(offset),
                    "-c",
                    "copy",
                    "ping.mp4"
                ]);

                let data = null
                data = await ffmpeg.readFile("ping.mp4");

                //   console.log(data);
                const dataURL = await helpers.readFileAsBase64(
                    new Blob([data.buffer], { type: "video/mp4" })
                );

                setTrimmedVideoFile(dataURL);

                // Calculate the file size
                const fileSizeInBytes = data.buffer.byteLength;
                const formattedFileSize = helpers.formatFileSize(fileSizeInBytes);
                setTrimmedSize(formattedFileSize);


                // Calculate and format the duration as "MM:SS"
                const trimmedVideo = document.createElement("video");
                trimmedVideo.src = dataURL;
                trimmedVideo.onloadedmetadata = () => {
                    const formattedDuration = helpers.formatDuration(trimmedVideo.duration);
                    seTrimmedDuration(formattedDuration);
                };


            } catch (error) {
                console.log(error);
            } finally {
                setTrimIsProcessing(false);
            }

        }
    };


    const handleUpdateRange = (func) => {
        return ({ target: { value } }) => {
            func(value);

            const newIndex = Math.round((value / 100) * thumbNails.length);
            setCurrentThumbnailIndex(newIndex);
        };
    };



    return (
        <main className="App">



            {
                <>
                    <RangeInput
                        rEnd={rEnd}
                        rStart={rStart}
                        handleUpdaterStart={handleUpdateRange(setRstart)}
                        handleUpdaterEnd={handleUpdateRange(setRend)}
                        loading={thumbnailIsProcessing}
                        videoMeta={videoMeta}
                        handleTrim={handleTrim}
                        loaded={loaded}
                        thumbNails={thumbNails}
                        theme={theme}
                    />
                </>
            }

            <section className="deck hidden">
                <article className="grid_txt_2 hidden">
                    <div className="bord_g_2 p_2">
                        <video
                            src={inputVideoFile ? URL : null}
                            muted
                            onLoadedMetadata={handleLoadedData}
                            width="450"
                        ></video>
                    </div>
                </article>
            </section>


            {trimmedVideoFile ? (
                <div className=" flex items-center gap-x-[4px] text-[#000] text-[12px] font-[600] feed--page">
                    <span className="pr-[15px]" onClick={toggleMute}>
                        {isMuted ?
                            <VolumeOffIcon />
                            :
                            <VolumeUpIcon />
                        }
                    </span>
                    <p>{trimmedDuration}</p>
                    <p><PiDotOutlineFill className="text-[15px] " /></p>
                    <p>{trimmedSize}</p>
                </div>
            ) : null}

            <div className="editor--video--container feed--page">
                {trimmedVideoFile ? (
                    <>
                        <EditorVideoPlayer url={trimmedVideoFile} isMuted={isMuted} isPlaying={isPlaying} />
                        <div onClick={openCoverPhoto} className="absolute top-[1rem] left-[1rem] bg-[#000] rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                            <img className=" w-[30px] h-[30px] invert" src={coverIcon} alt="cover" />

                        </div>
                        <button className="absolute top-0 bottom-0 left-0 right-0 text-[#fff] mx-auto my-auto invert w-[50px] h-[50px]" onClick={togglePlay} >
                            {isPlaying ?
                                <FaPause style={{ fontSize: 50 }} />
                                :
                                <FaPlay style={{ fontSize: 50 }} />
                            }

                        </button>
                    </>

                ) : (
                    <>
                        {inputVideoFile && (
                            <>
                                <EditorVideoPlayer url={inputVideoFile ? URL : null} isMuted={isMuted} isPlaying={isPlaying} />
                                <div onClick={openCoverPhoto} className="absolute top-[1rem] left-[1rem] bg-[#000] rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                                    <img className=" w-[30px] h-[30px] invert" src={coverIcon} alt="cover" />

                                </div>
                                <button className="absolute top-0 bottom-0 left-0 right-0  mx-auto my-auto text-[#fff] w-[50px] h-[50px]" onClick={togglePlay} >

                                    {isPlaying ?
                                        <FaPause style={{ fontSize: 50 }} />
                                        :
                                        <FaPlay style={{ fontSize: 50 }} />
                                    }

                                </button>
                            </>
                        )}
                    </>
                )}

            </div>

            <div className="w-full mb-[2rem]" onClick={handleSendPost}>
                <IoArrowForwardCircle className="ml-auto w-[50px] h-[50px] cursor-pointer" />
            </div>
            
            {/* <div className="flex flex-col items-center justify-center gap-y-[15px] feed--page">
                <p className="font-[500] text-[16px] ">Tag Product</p>
                <div className="flex flex-wrap items-center justify-center gap-[10px]">
                    <div className="flex flex-wrap gap-[10px]">
                        {taggedData && taggedData.map((product) => {
                            
                            return (
                                <React.Fragment key={product.id}>
                                    <div className='w-[50px] h-[50px] overflow-hidden rounded-[6px]'>
                                       
                                            <img src={product.images[0].url} alt={product.title}  className="w-full h-full object-cover"/>
                                       
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>

                    <button >
                        <img className="w-[50px] h-[50px]" src={tagIcon} alt="tag"  />
                    </button>
                </div>
            </div> */}


            {/* post send container  */}
            <Dialog
                fullScreen
                open={openSendPost}
                onClose={closeSendPost}
            >
                <PostContainer
                    selectedFiles={selectedfiles}
                    closeSendPost={closeSendPost}
                    collectionName={collectionName}
                    trimmedVideoFile={trimmedVideoFile}
                    inputVideoFile={inputVideoFile}
                    URL={URL}
                    taggedData={taggedData}
                    currentThumbnail={currentThumbnail}
                    theme={theme}
                />
            </Dialog>

            {/* Cover photo/ poster  */}
            <CoverPhoto
                closeCoverPhoto={closeCoverPhoto}
                coverPhoto={coverPhoto}
                selectedfiles={selectedfiles}
                activeFile={activeFile}
                thumbNails1={thumbNails1}
                setThumbNails1={setThumbNails1}
                setThumbnailIsProcessing1={setThumbnailIsProcessing1}
                thumbnailIsProcessing1={thumbnailIsProcessing1}
                currentThumbnailIndex1={currentThumbnailIndex1}
                setCurrentThumbnailIndex1={setCurrentThumbnailIndex1}
                theme={theme}
                selectedFilesBlobs={selectedFilesBlobs}
                setSelectedFilesBlobs={setSelectedFilesBlobs}
            />
        </main>
    );
};

export default VideoTrimmer;




// CoverPhoto 
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CoverPhoto = ({ coverPhoto, closeCoverPhoto, selectedfiles, activeFile, thumbNails1, setThumbNails1, thumbnailIsProcessing1, setThumbnailIsProcessing1, currentThumbnailIndex1, setCurrentThumbnailIndex1, theme, selectedFilesBlobs, setSelectedFilesBlobs, }) => {
    const [inputVideoFile, setInputVideoFile] = useState(null);
    const [videoMeta, setVideoMeta] = useState(null);
    const [URL, setURL] = useState([]);
    const [rStart, setRstart] = React.useState(0);
    const ffmpegRef = React.useRef(new FFmpeg());
    const [loaded, setLoaded] = React.useState(false);





    const load = async () => {
        // Check if FFmpeg is already available in the window
        // if (!window.ffmpeg) {
        //     // ffmpegRef.current = window.ffmpeg;
        //     setLoaded(true);
        //     handleChange();
        //     handleTrim();
        //     return;
        // }

        const baseURL = '/dist/esm';

        const ffmpeg = ffmpegRef.current;
        // const ffmpeg = createFFmpeg({ log: true, corePath: "/dist/esm/ffmpeg-core.js" });
        ffmpeg.on('log', ({ message }) => {
            // messageRef.current.innerHTML = message;
            // console.log(message);
        });

        try {
            // toBlobURL is used to bypass CORS issue, urls with the same
            // domain can be used directly.
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });


            // Store FFmpeg instance in the window to reuse it later
            ffmpegRef.current = ffmpeg;
            // console.log(ffmpeg);
            // window.ffmpeg = ffmpeg;
            setLoaded(true);
            handleChange();
            // handleTrim();
        } catch (error) {
            console.error('Failed to load FFmpeg:', error);
        }
    };




    React.useEffect(() => {
        load();
    }, [])


    const handleChange = async () => {
        if (activeFile) {
            setInputVideoFile(activeFile);
            setURL(await helpers.readFileAsBase64(activeFile));
        } else if (selectedfiles && selectedfiles.length > 0) {
            setInputVideoFile(selectedfiles[0]);
            setURL(await helpers.readFileAsBase64(selectedfiles[0]));
        }
    };


    const handleLoadedData = async (e) => {
        // console.dir(ref.current);

        const el = e.target;

        // console.log(e.target)

        const meta = {
            name: inputVideoFile.name,
            duration: el.duration,
            videoWidth: el.videoWidth,
            videoHeight: el.videoHeight
        };
        // console.log({ meta }, el);
        setVideoMeta(meta);
        const thumbNails = await getThumbnails1(meta);
        setThumbNails1(thumbNails);
    };

    const getThumbnails1 = async ({ duration }) => {
        const ffmpeg = ffmpegRef.current;
        setThumbnailIsProcessing1(true);
        let MAX_NUMBER_OF_IMAGES = 15;
        let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
        let offset =
            duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;

        const arrayOfImageURIs = [];
        await ffmpeg.writeFile(inputVideoFile.name, await fetchFile(inputVideoFile));

        for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
            let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));

            try {
                await ffmpeg.exec([
                    "-ss",
                    startTimeInSecs,
                    "-i",
                    inputVideoFile.name,
                    "-t",
                    "00:00:1.000",
                    `img${i}.png`]
                );
                let data = null
                data = await ffmpeg.readFile(`img${i}.png`);

                // console.log(data);
                let blob = new Blob([data.buffer], { type: "image/png" });
                let dataURI = await helpers.readFileAsBase64(blob);

                // ffmpeg.unlink(`img${i}.png`);
                arrayOfImageURIs.push(dataURI);
            } catch (error) {
                console.log({ message: error });
            }
        }
        setThumbnailIsProcessing1(false);

        return arrayOfImageURIs;
    };


    const handleUpdateRange = (func) => {
        return ({ target: { value } }) => {
            func(value);

            const newIndex = Math.round((value / 100) * thumbNails1.length);
            setCurrentThumbnailIndex1(newIndex);
        };
    };


    return (
        <Dialog
            open={coverPhoto}
            onClose={closeCoverPhoto}
            TransitionComponent={Transition}
            fullScreen
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", padding: '10px' } }}
        >
            <button className='absolute top-4 left-2 h-[25px] w-[25px] z-[2000]' onClick={closeCoverPhoto}>
                <img src={backIcon} alt='back' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            </button>

            <main className="App mt-[2rem]">
                {
                    <>
                        <ThumbnailRangeInput
                            rStart={rStart}
                            handleUpdaterStart={handleUpdateRange(setRstart)}
                            loading={thumbnailIsProcessing1}
                            videoMeta={videoMeta}
                            loaded={loaded}
                            thumbNails1={thumbNails1}
                        />
                    </>
                }
                <section className="deck hidden">
                    <article className="grid_txt_2 hidden">
                        <div className="bord_g_2 p_2">
                            <video
                                src={inputVideoFile ? URL : null}
                                muted
                                onLoadedMetadata={handleLoadedData}
                                width="450"
                            ></video>
                        </div>
                    </article>
                </section>
                <div className="editor--video--container">
                    {/* Display the current thumbnail */}
                    {thumbNails1.length > 0 && (
                        <div className="thumbnail-container h-[390px] w-[340px] ">
                            <img
                                src={thumbNails1[currentThumbnailIndex1]}
                                alt="Cover-photo"
                                className="w-full h-full object-cover"
                            />

                        </div>
                    )}
                </div>

                <div onClick={closeCoverPhoto} className="mt-[1rem] flex flex-col items-center justify-center">
                    <button className="bg-[#222] text-white text-center py-[.4rem] px-[2rem] rounded-[8px] shadow-light_black_75 shadow-md drop-shadow-md font-[600]" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                        Done
                    </button>
                </div>
            </main>

        </Dialog>

    )
};