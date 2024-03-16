import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ConfirmationBox from '../confirmationBox/ConfirmationBox';
import PostContainer from './PostContainer';
import { BsPlusCircleFill } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import PostVideoEditor from './PostVideoEditor';
import closeIcon from "../../assets/closeIcon.png";
import backIcon from "../../assets/postImg-Icons/backIcon.png";
import deleteIcon from "../../assets/postImg-Icons/delete.png";
import editIcon from "../../assets/postImg-Icons/edit.png";
import addIcon from "../../assets/addIcon.png";
import replaceIcon from "../../assets/postImg-Icons/replace.png";
import addPage from "../../assets/postImg-Icons/addPage.png";
import { useRecordWebcam } from 'react-record-webcam'
import { CardMedia, CircularProgress, DialogContent } from '@mui/material';
import { Camera, Cameraswitch, PermMedia } from '@mui/icons-material';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SmallHorizontalRecordedCards } from '../card/ShowCard';
import { fetchFile, toBlobURL } from "@ffmpeg/util";






export const DesktopDialog = ({ shouldShowAbove640px, dragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleCloseFile, showConfirmation, handleCancelDelete, handleConfirmDelete, handleDeleteClick, handleReplaceFile, handleFileChange, selectedFiles, selectedFilesBlobs, setSelectedFilesBlobs, handleFileRemove, collectionName }) => {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [openSelectedFile, setOpenSelectedFile] = React.useState(true);
  const [openSendPost, setOpenSendPost] = React.useState(false);

  const handleSendPost = () => {
    setOpenSendPost(true);
  }
  const closeSendPost = () => {
    setOpenSendPost(false);
  }



  return (

    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={shouldShowAbove640px}
      onClose={handleCloseFile}
      PaperProps={{
        style: {
          borderRadius: '40px', padding: '30px',
          width: '95%'
        }
      }}
    >

      <div className='desktop__popup__content'>
        <button className='close__button invert w-[30px] h-[30px]'
          onClick={handleCloseFile}
        >
          <img src={closeIcon} alt='close' />
        </button>

        <div className='add__content__box'>

          {/* Add post section */}
          <label htmlFor="file" className={`shareOption ${dragging ? 'dragging' : ''}`} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>

            <span><BsPlusCircleFill className='w-[40px] h-[40px]' /></span>
            <p className='drag'>Drag and drop or click to add videos</p>

            <p className='recommended'>.mp4 recommendation not more than 10mb</p>
            <input type="file" id="file" accept="image/*,video/*" multiple style={{ display: "none" }} onChange={handleFileChange} />
          </label>


        </div>


      </div>

      {/* selected file container code */}
      {selectedFiles && selectedFiles.length > 0 && (
        <Dialog
          fullScreen
          onClose={handleCloseFile}
          open={openSelectedFile}
        >

          <div className="shareImgContainer">
            <div className='top__container'>
              <button className='close__button'
                onClick={handleCloseFile}
              >
                <img src={backIcon} alt='back' />
              </button>
              <button className='next__button'
                onClick={handleSendPost}
              >
                Next
              </button>
            </div>

            <div className='file__container'>
              {/* left side of the file container  */}
              <div className='left'>
                <div className='left__img'>
                  {selectedFiles[0] && selectedFiles.length > 0 && (
                    <video
                      src={selectedFiles[0] instanceof Blob ? URL.createObjectURL(selectedFiles[0]) : selectedFiles[0]}
                      className="shareVideo"
                      playsInline={true}
                      controls={false}
                      muted
                      controlsList="nodownload"
                    />
                  )}

                  {/* Render the ConfirmationDialog component */}
                  {showConfirmation && (
                    <div className='desktop__confirm__box'>
                      <ConfirmationBox
                        message="Are you sure you want to delete these files?"
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                      />
                    </div>
                  )}
                </div>
                <div className='bottom__part'>
                  <ul>
                    <li
                      onClick={handleDeleteClick}
                    >
                      <img src={deleteIcon} alt='delete' className='invert' />
                      <button className="delete__file" >
                        Delete All
                      </button>
                    </li>



                    <li
                      onClick={handleReplaceFile}
                    >
                      <img src={addIcon} alt='add' className='invert' />
                      <button className="delete__file" >
                        Add
                      </button>
                    </li>
                  </ul>

                </div>
              </div>

              {/* right side of the file container  */}
              <div className='right__container'>
                <div className='right'>
                  {selectedFiles.map((file, index) => (

                    <div key={index} className='image__container'>
                      <video
                        src={file instanceof Blob ? URL.createObjectURL(file) : file}
                        className="shareVideo"
                        playsInline={true}
                        controls={false}
                        muted
                        controlsList="nodownload"
                      />
                      <button className='remove-button w-[30px] h-[30px] top-[.5rem] left-2 absolute' onClick={() => handleFileRemove(file)}><img src={deleteIcon} alt='delete' /></button>

                    </div>
                  ))}
                </div>

                <div className='right1 h-fit'>
                  <ul>
                    <li onClick={handleReplaceFile} className='image__container'><img src={addPage} alt='addpage' /></li>
                    <li>Add Page</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </Dialog>

      )}

      <Dialog
        fullScreen
        open={openSendPost}
        onClose={closeSendPost}
      >
        <PostContainer selectedFiles={selectedFiles} closeSendPost={closeSendPost} collectionName={collectionName} />
      </Dialog>

    </Dialog>
  );
};




export const CreatePostDialog = ({ handleCloseFile, showConfirmation, handleCancelDelete, handleConfirmDelete, handleReplaceFile, handleDeleteClick, shouldShowDialog, handleFileChange, selectedFiles, collectionName, setSelectedFiles, selectedFilesBlobs, setSelectedFilesBlobs, theme, ffMpegLoaded, ffmpegRef }) => {
  const [openSelectedFile, setOpenSelectedFile] = React.useState(true);
  const [openEditor, setOpenEditor] = React.useState(false);
  const [activeFileIndex, setActiveFileIndex] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);
  // State to track whether a file is active
  const [isFileActive, setIsFileActive] = React.useState(false);
  const [cameraOn, setCameraOn] = React.useState(false);
  const [cameraTime, setCameraTime] = React.useState(0);
  const [cameraIntrvl, setCameraIntrvl] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [replacementFile, setReplacementFile] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { createRecording, openCamera, closeCamera, cancelRecording, startRecording, stopRecording, activeRecordings, applyOptions, applyConstraints, muteRecording, supportedAudioCodecs, supportedVideoCodecs } = useRecordWebcam({
    // options: { fileType: 'mp4' },
    // mediaRecorderOptions: { mimeType: 'video/mp4;codecs=avc1.4d002a' },
    mediaTrackConstraints: { video: true, audio: false, aspectRatio: 0.56 }
  });
  const [recording, setRecording] = React.useState(null);

  React.useEffect(() => {
    if (shouldShowDialog) {
      createRecord()
    }
    else {
      cancelRecord()
      // stopRecord()
      // setIsRecording(false)
      // setCameraTime(0)
    }

  }, [shouldShowDialog])

  React.useEffect(() => {
    console.log(openSelectedFile, activeFile)
    if (openSelectedFile) {

      // cancelRecord()
      // stopRecord()
      // setIsRecording(false)
      // setCameraTime(0)
    }
  }, [openSelectedFile, activeFile])

  React.useEffect(() => {
    if (selectedFilesBlobs) {
      console.log(selectedFilesBlobs)
    }
  }, [selectedFilesBlobs])

  React.useEffect(() => {
    if (selectedFiles) {
      console.log(selectedFiles)
    }
  }, [selectedFiles])




  React.useEffect(() => {
    let interval = null;
    if (isRecording) {
      //Implementing the setInterval method
      interval = setInterval(() => {
        setCameraTime(cameraTime => cameraTime + 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    }
    else {
      setCameraTime(0);
      return () => clearInterval(interval);
    }
  }, [isRecording]);





  // Function to activate/deactivate a file
  const toggleActiveFile = (index) => {
    if (activeFileIndex === index) {
      setActiveFileIndex(null);
      setActiveFile(null);
      setIsFileActive(false);
    } else {
      setActiveFileIndex(index);
      setActiveFile(selectedFiles[index]);
      setIsFileActive(true);
    }
  };

  // Function to handle file replacement
  const handleReplace = (e) => {
    const newFile = e.target.files[0];
    if (activeFileIndex !== null && newFile) {
      const updatedSelectedFiles = [...selectedFiles]; // Create a copy of the selectedFiles array
      updatedSelectedFiles[activeFileIndex] = newFile; // Replace the active file with the new file
      setSelectedFiles(updatedSelectedFiles); // Update the state with the new array
    }
  };

  // Function to delete active file
  const handleDeleteActiveFile = () => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(activeFileIndex, 1);
    setSelectedFiles(updatedSelectedFiles);
    setActiveFileIndex(null);
    setActiveFile(null);
  };

  const handleOpenEditor = () => {
    cancelRecord();
    setOpenEditor(true);
  }

  const handleCloseEditor = () => {
    setOpenEditor(false);
  }

  const handleCreateRecording = async () => {
    const recording = await createRecording();
    if (!recording) return null
    setRecording(recording);
    return recording
  }

  const createRecord = async () => {
    let rec = null
    if (!recording) {
      rec = await handleCreateRecording();
    }
    else {
      rec = recording
    }
    await openCamera(rec.id);
    setCameraOn(true)
    console.log('Camera Opened')
  }

  const cancelRecord = async () => {
    // const recording = await handleCreateRecording();
    if (recording) {
      await closeCamera(recording.id);
    }
    setCameraOn(false)
    console.log('Camera closed')
    stopRecord()
    setIsRecording(false)
    setCameraTime(0)

  }


  const startRecord = async () => {
    let rec = null
    if (!recording) {
      rec = await handleCreateRecording();
    }
    else {
      rec = recording
    }
    if (!cameraOn) {
      await openCamera(rec.id);
      setCameraOn(true)
    }
    if (!isRecording) {
      await startRecording(recording.id);
      setIsRecording(true)
    }




    console.log('Recording Started')


  }

  const stopRecord = async () => {
    let recc = null


    if (isRecording) {
      recc = await stopRecording(recording.id);
      setIsRecording(false)
      console.log('Recording Stopped', recc)
      let file_mp4_blob = null
      if (ffMpegLoaded) {
        setIsProcessing(true)
        let ffmpeg = ffmpegRef.current;
        let file_webm = new File(recc.blobChunks, `${recc.fileName}`, { type: recc.mimeType.split(';')[0] })
        await ffmpeg.writeFile(file_webm.name, await fetchFile(file_webm));
        await ffmpeg.exec([
          "-i",
          file_webm.name,
          "-c",
          "copy",
          `${file_webm.name}.mp4`
        ]);
        let file_mp4 = await ffmpeg.readFile(`${file_webm.name}.mp4`);
        file_mp4_blob = new Blob([file_mp4.buffer], { type: "video/mp4" });
        setIsProcessing(false)


      }
      setSelectedFiles([...selectedFiles,
      new File([file_mp4_blob], `${recc.fileName}`, { type: "video/mp4" })
      ])
      await cancelRecord();
      setSelectedFilesBlobs([...selectedFilesBlobs, recc])
      setIsFileActive(true)
    }



  }

  React.useEffect(() => {
    if (recording) {
      console.log(recording)
    }

  }, [recording])

  function calcTime(seconds, maxSeconds = 60) {
    if (seconds < 0 || seconds > maxSeconds) {
      stopRecord();
      setIsRecording(false)
      setCameraTime(0)
      // throw new Error(`Seconds must be between 0 and ${maxSeconds}`);
    }

    return parseInt((seconds / maxSeconds) * 100);
    // return seconds;
  }

  function showTimePassed(seconds) {
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substring(11, 19);
    return timeString;
  }

  React.useEffect(() => {
    if (cameraTime) {
      console.log(calcTime(cameraTime))
    }

  }, [cameraTime])





  return (
    <div>
      <Dialog
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            background: 'transparent',
          },
          // "& .MuiDialogContent-root": {
          //   background: '#fff',
          // }
        }}
        open={isProcessing}>
        <DialogContent>
          <div className='w-[200px] justify-center items-center flex flex-col h-[200px] absolute top-[35vh] left-[25vw] bg-[white] rounded-md'>
            <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            <br />
            Processing...
          </div>
        </DialogContent>


      </Dialog>
      <Dialog
        fullScreen
        open={shouldShowDialog}
      // ref={}
      >
        {activeRecordings.map(recording => (

          <div key={recording.id} className='w-[100vw] h-[100vh] top-0 absolute items-center justify-center '>
            {/* <video  /> */}
            <CardMedia
              component="video"
              ref={recording.webcamRef}
              autoPlay
              // ref={playerRef}
              // onTimeUpdate={handleProgress}
              // onEnded={onVideoEnded}
              className='react-player object-cover h-full w-full'
              controls={false}
              playsInline={true}

            />
            {/* <video ref={recording.previewRef} autoPlay loop /> */}
          </div>
        ))}
        <div className='mobile__popup__content feed--page'>




          {/* mobile view  */}

          <div className='mobile__add__content__box'>

            <button className='close__button' onClick={handleCloseFile}>
              <img src={closeIcon} alt='close' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            </button>






            <span style={{ filter: theme === "light" ? "invert(0)" : "invert(1)", width: '100vw', paddingBlock: '10px', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', left: '0', bottom: '10%', background: 'transparent', display: 'flex', flexDirection: "column", paddingInline: '10px' }}>
              <span style={{ filter: theme === "light" ? "invert(0)" : "invert(1)", width: '100vw', paddingBlock: '10px', justifyContent: 'space-between', alignItems: 'center', position: 'relative', background: 'transparent', display: 'flex', paddingInline: '10px' }}>
                <label htmlFor="file">
                  <PermMedia onClick={stopRecord} className='add__icon' sx={{ fontSize: '1.5rem', filter: theme === "light" ? "invert(0)" : "invert(1)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }} />
                  <input type="file" id="file" accept="video/*" style={{ display: "none" }} multiple onChange={handleFileChange} />
                </label>

                {isRecording ? (
                  // <Camera
                  //   className='add__icon'
                  //   onClick={stopRecord}
                  //   sx={{ fontSize: '4rem', filter: theme === "light" ? "invert(0)" : "invert(1)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }} />
                  <div className='w-[90px]' onClick={stopRecord}>
                    <CircularProgressbar
                      value={calcTime(cameraTime)}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: '#222',
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent",
                      })} />
                  </div>
                ) : (
                  <Camera className='add__icon' onClick={startRecord} sx={{ fontSize: '4rem', filter: theme === "light" ? "invert(0)" : "invert(1)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }} />

                )}
                {cameraOn ? (<Cameraswitch className='add__icon' onClick={cancelRecord} sx={{ fontSize: '1.5rem', filter: theme === "light" ? "invert(0)" : "invert(1)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }} />) : (<Cameraswitch className='add__icon' onClick={createRecord} sx={{ fontSize: '1.5rem', filter: theme === "light" ? "invert(1)" : "invert(0)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }} />)}
              </span>
              <span className='flex py-2' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }}>Status: {cameraOn ? (isRecording ? (`Recording ${showTimePassed(cameraTime)}`) : (`Not Recording`)) : ('Camera OFF')}</span>
              <span className='flex py-1' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)", color: theme === "light" ? (cameraOn ? "#fff" : "#222") : "#fff" }}>Max: 1 min</span>
              {/* <SmallHorizontalRecordedCards post={activeRecordings} /> */}






            </span>



          </div>

        </div>

        {/* selected file container code */}

        {selectedFiles && selectedFiles.length > 0 && (
          <Dialog
            fullScreen
            onClose={() => {
              handleCloseFile();
              cancelRecord()
              stopRecord()
              setIsRecording(false)
              setCameraTime(0)
            }}
            open={openSelectedFile}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}
          >
            <>
              <div className="Mobile__shareImgContainer">
                <div className='relative p-[1rem]'>
                  <div className='top__container'>
                    <button className='close__button invert' onClick={handleCloseFile}>
                      <img src={backIcon} alt='back' />
                    </button>
                    <button className='next__button'
                      onClick={handleOpenEditor}
                      style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
                    >
                      Next
                    </button>
                  </div>

                  <div className='file__container '>
                    <div className='left max-w-[90vw] mx-auto'>
                      <div className='selectedFiles--container'>
                        {selectedFiles.map((file, index) => {
                          // console.log(file instanceof Blob ? URL.createObjectURL(file) : file)
                          return <div key={index} className={`left__img ${index === activeFileIndex ? 'shadow-md drop-shadow-md' : ''}`} onClick={() => {
                            setActiveFileIndex(index);
                            setActiveFile(file);
                            toggleActiveFile(index);
                          }}>

                            <video
                              src={file instanceof Blob ? URL.createObjectURL(file) : file}
                              className="shareVideo"
                              playsInline={true}
                              controls={false}
                              muted
                              controlsList="nodownload"
                            />

                            {isFileActive && (
                              <>
                                <div className={index === activeFileIndex ? 'absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50' : ''}>
                                  <ImCheckmark className={index === activeFileIndex ? 'invert w-[40px] h-[40px] my-auto mx-auto absolute top-0 bottom-0 right-0 left-0' : ''} style={{ filter: theme === "light" ? "invert(0)" : "invert(0)" }} />
                                </div>

                              </>
                            )}
                          </div>

                        })}
                      </div>
                      <div className='bottom__part'>
                        <ul>


                          {isFileActive && (
                            <>
                              <li
                                onClick={handleDeleteActiveFile}
                              >
                                <img width='35' height='35' src={deleteIcon} alt='delete' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <button className="delete__file" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Delete
                                </button>
                              </li>
                              <li onClick={handleOpenEditor}>
                                <img width='35' height='35' src={editIcon} alt='delete' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <button className="delete__file" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Edit
                                </button>
                              </li>

                              <li>
                                <label htmlFor="replacement-file" className="flex flex-col items-center">
                                  <img width="35" height="35" src={replaceIcon} alt="delete" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                  <button className="delete__file" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                    Replace
                                  </button>
                                  <input
                                    type="file"
                                    id="replacement-file"
                                    accept="image/*,video/*"
                                    style={{ display: "none" }}
                                    onChange={handleReplace}
                                  />
                                </label>
                              </li>
                            </>
                          )}

                          {!isFileActive ? (
                            <>
                              <li
                                onClick={handleDeleteClick}
                              >
                                <img width='35' height='35' src={deleteIcon} alt='delete' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <button className="delete__file" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Delete
                                </button>
                              </li>

                              <li
                                onClick={handleReplaceFile}
                              >
                                <img width='35' height='35' src={addIcon} alt='delete' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <button className="delete__file" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Add
                                </button>
                              </li>
                            </>

                          ) : null}


                        </ul>

                      </div>


                    </div>

                  </div>

                  {showConfirmation && (
                    <>
                      <div className='Mpopup__overlay '>
                        <div className='mobile__confirm__box'>
                          <ConfirmationBox message="Are you sure you want to delete these files?"
                            onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <PostVideoEditor
                handleCloseEditor={handleCloseEditor}
                openEditor={openEditor}
                selectedfiles={selectedFiles}
                activeFile={activeFile}
                collectionName={collectionName}
                setSelectedFiles={setSelectedFiles}
                theme={theme}
                selectedFilesBlobs={selectedFilesBlobs}
                setSelectedFilesBlobs={setSelectedFilesBlobs}
              />
            </>
          </Dialog>
        )}





      </Dialog>

    </div>
  );
};




