import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ConfirmationBox from '../confirmationBox/ConfirmationBox';
import PostContainer from './AdContainer';
import { BsPlusCircleFill } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import closeIcon from "../../assets/closeIcon.png";
import backIcon from "../../assets/postImg-Icons/backIcon.png";
import deleteIcon from "../../assets/postImg-Icons/delete.png";
import editIcon from "../../assets/postImg-Icons/edit.png";
import addIcon from "../../assets/addIcon.png";
import replaceIcon from "../../assets/postImg-Icons/replace.png";
import addPage from "../../assets/postImg-Icons/addPage.png";
import AdVideoEditor from './AdVideoEditor';



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



export const CreateAdDialog = ({ collectionName,  theme, taggedData, setTaggedData, tags, setTags, handleCloseEditor }) => {


  

  return (
    <div>
      <AdVideoEditor
        handleCloseEditor={handleCloseEditor}
        collectionName={collectionName}
        taggedData={taggedData}
        setTaggedData={setTaggedData}
        theme={theme}
        tags={tags}
      />
      
    </div>
  );
};