import React, { useContext, useState } from 'react';
import './createPost.css'
import { Link, useNavigate } from 'react-router-dom';
import DFooter from '../dashboard/footer/DFooter';
import { CreatePostDialog, DesktopDialog } from './CreatePostDialog';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import backIcon from "../../assets/hauls/backIcon.png";
import Union from "../../assets/postImg-Icons/Union.webp";
import { ThemeContext } from '../context/ThemeProvider';




const CreatePost = ({ title, collectionName }) => {
  const { theme } = useContext(ThemeContext);
  const [showPopup, setShowPopup] = useState(false);
  const [createPost, setCreatePost] = useState(true);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openFile, setOpenFile] = React.useState(false);
  const isScreenBelow640px = useMediaQuery('(max-width:640px)');
  const isScreenAbove640px = useMediaQuery('(min-width:640px)');
  const shouldShowAbove640px = isScreenAbove640px && showPopup;
  const shouldShowDialog = isScreenBelow640px && openFile;
  const [selectedFiles, setSelectedFiles] = React.useState([]);
 let navigate = useNavigate();

    const handleFileChange = event => {
        const newFiles = Array.from(event.target.files);
        if (selectedFiles.length + newFiles.length <= 5) {
            setSelectedFiles([...selectedFiles, ...newFiles]);
        } else {
            toast.warning("You can only upload 5 files");
        }
    };

    const handleFileRemove = fileToRemove => {
        setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove));
    };


  const handleSelectFile = () => {
    setOpenFile(true);
    setShowPopup(true);
  };

  
  const handleCloseFile = () => {
    setOpenFile(false);
    setShowPopup(false);

  };

  // confirmation logic 
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setSelectedFiles([]);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const editFile = (fileIndex, newFile) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[fileIndex] = newFile;
    setSelectedFiles(updatedFiles);
};

  // drag and drop file logic
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const newFiles = Array.from(e.dataTransfer.files);

    if (selectedFiles.length + newFiles.length <= 5) {
        setSelectedFiles([...selectedFiles, ...newFiles]);
    } else {
        toast.warning("You can only upload 5 files");
    }
};


  

  // Logic to replace file 
  const handleReplaceFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = e => {
        const newFile = (e.target.files[0]);
        if (selectedFiles.length < 5) {
            setSelectedFiles([...selectedFiles, newFile]);
        } else {
          toast.warning("You can only upload 5 files");

        }
    };
    input.click();
};



  return (
		<>
			<div className="createPost__body feed--page">
				{/* <DHeader /> */}

				{createPost && (
					<div className="create__post">
						<Link onClick={() => navigate(-1)}>
							<img
								className="back"
								src={backIcon}
								alt="back"
								style={{
									filter: theme === "light" ? "invert(1)" : "invert(0)",
								}}
							/>
						</Link>
						<div className="union">
							<img src={Union} alt="union" />
							<button
								style={{
									backgroundColor: theme === "light" ? "#000" : "#fff",
									color: theme === "light" ? "#fff" : "#222",
								}}
								onClick={handleSelectFile}
							>
								Create {title}
							</button>
						</div>

          
            
					</div>
        )}
			</div>

			{/* desktop pop content */}
			<DesktopDialog
				shouldShowAbove640px={shouldShowAbove640px}
				handleCloseFile={handleCloseFile}
				file={file}
				dragging={dragging}
				handleDragEnter={handleDragEnter}
				handleDragLeave={handleDragLeave}
				handleDragOver={handleDragOver}
				handleDrop={handleDrop}
				setFile={setFile}
				showConfirmation={showConfirmation}
				handleCancelDelete={handleCancelDelete}
				handleConfirmDelete={handleConfirmDelete}
				editFile={editFile}
				handleDeleteClick={handleDeleteClick}
				handleReplaceFile={handleReplaceFile}
				handleFileRemove={handleFileRemove}
				selectedFiles={selectedFiles}
				handleFileChange={handleFileChange}
				collectionName={collectionName}
				theme={theme}
			/>

			{/* mobile view of the popup__content  */}

			<CreatePostDialog
				handleCloseFile={handleCloseFile}
				openFile={openFile}
				setFile={setFile}
				file={file}
				showConfirmation={showConfirmation}
				handleCancelDelete={handleCancelDelete}
				handleConfirmDelete={handleConfirmDelete}
				handleDeleteClick={handleDeleteClick}
				editFile={editFile}
				handleReplaceFile={handleReplaceFile}
				shouldShowDialog={shouldShowDialog}
				handleFileRemove={handleFileRemove}
				selectedFiles={selectedFiles}
				handleFileChange={handleFileChange}
				collectionName={collectionName}
				setSelectedFiles={setSelectedFiles}
				theme={theme}
			/>
			{/* selected file container code ends here */}

			<DFooter />
		</>
	);
};

export default CreatePost;
