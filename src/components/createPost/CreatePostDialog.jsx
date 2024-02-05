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



export const DesktopDialog = ({ shouldShowAbove640px, dragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleCloseFile, showConfirmation, handleCancelDelete, handleConfirmDelete, handleDeleteClick, handleReplaceFile, handleFileChange, selectedFiles, handleFileRemove, collectionName }) => {
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



export const CreatePostDialog = ({ handleCloseFile, showConfirmation, handleCancelDelete, handleConfirmDelete, handleReplaceFile, handleDeleteClick, shouldShowDialog, handleFileChange, selectedFiles, collectionName,  setSelectedFiles, theme }) => {
  const [openSelectedFile, setOpenSelectedFile] = React.useState(true);
  const [openEditor, setOpenEditor] = React.useState(false);
  const [activeFileIndex, setActiveFileIndex] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);
  // State to track whether a file is active
  const [isFileActive, setIsFileActive] = React.useState(false);
  const [replacementFile, setReplacementFile] = React.useState(null);
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
    setOpenEditor(true);
  }

  const handleCloseEditor = () => {
    setOpenEditor(false);
  }

  

  return (
    <div>
     
      <Dialog
        fullScreen
        open={shouldShowDialog}
      >
        <div className='mobile__popup__content feed--page'>
           
          {/* mobile view  */}
           
          <div className='mobile__add__content__box'>
            <button className='close__button' onClick={handleCloseFile}>
              <img src={closeIcon} alt='close' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            </button>

            <label htmlFor="file">

              <span style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}><AddAPhotoIcon className='add__icon' sx={{ fontSize: '3rem', filter: theme === "light" ? "invert(1)" : "invert(0)" }} /></span>
              <input type="file" id="file" accept="video/*" style={{ display: "none" }} multiple onChange={handleFileChange} />
            </label>
          </div>

        </div>

        {/* selected file container code */}
        
        {selectedFiles && selectedFiles.length > 0 && (
          <Dialog
            fullScreen
            onClose={handleCloseFile}
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
                      style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}
                    >
                      Next
                    </button>
                  </div>
             
                  <div className='file__container '>
                    <div className='left max-w-[90vw] mx-auto'>
                      <div className='selectedFiles--container'>
                        {selectedFiles.map((file, index) => (
                       
                          <div key={index} className={`left__img ${index === activeFileIndex ? 'shadow-md drop-shadow-md' : ''}`} onClick={() => {
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
                                  <ImCheckmark className={index === activeFileIndex ? 'invert w-[40px] h-[40px] my-auto mx-auto absolute top-0 bottom-0 right-0 left-0' : ''}  style={{filter: theme === "light" ? "invert(0)" : "invert(0)" }}/>
                                </div>
                              
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className='bottom__part'>
                        <ul>
                         

                          {isFileActive && (
                            <>
                              <li
                                onClick={handleDeleteActiveFile}
                              >
                                <img width='35' height='35' src={deleteIcon} alt='delete' style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <button className="delete__file"  style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Delete
                                </button>
                              </li>
                              <li onClick={handleOpenEditor}>
                                <img width='35' height='35' src={editIcon} alt='delete' style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}/>
                                <button className="delete__file"  style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Edit
                                </button>
                              </li>

                              <li>
                                <label htmlFor="replacement-file" className="flex flex-col items-center">
                                  <img width="35" height="35" src={replaceIcon} alt="delete" style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                  <button className="delete__file" style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
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
                                <img width='35' height='35' src={deleteIcon} alt='delete' style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                <button className="delete__file"  style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                  Delete
                                </button>
                              </li>
                              
                              <li
                                onClick={handleReplaceFile}
                              >
                                <img width='35' height='35' src={addIcon} alt='delete' style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}/>
                                <button className="delete__file" style={{filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
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
              />
            </>
          </Dialog>
        )}

        

        
        
      </Dialog>
    </div>
  );
};