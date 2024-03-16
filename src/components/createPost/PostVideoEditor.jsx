import { Dialog } from '@mui/material'
import React from 'react'
import backIcon from "../../assets/editorIcons/closeEdit.png";
import addTag from "../../assets/editorIcons/TagProduct.png";
import tag from "../../assets/editorIcons/tag.png";
import music from "../../assets/postImg-Icons/music.png";
import Frame from "../../assets/editorIcons/addFrame.png";
import Text from "../../assets/editorIcons/addText.png";
import Audio from "../../assets/editorIcons/addAudio.png";
import VideoTrimmer from '../videoEditor/VideoTrimmer';
import { AddTag } from '../productTag/AddTag';
import { useState } from 'react';
import { MusicTag } from '../musicTag/MusicTag';


const PostVideoEditor = ({ openEditor, handleCloseEditor, selectedfiles, activeFile, collectionName, setSelectedFiles, theme, selectedFilesBlobs, setSelectedFilesBlobs, }) => {
  const [openTagProduct, setOpenTagProduct] = React.useState(false);
  const [openMusicTag, setOpenMusicTag] = React.useState(false);
  const [showTagProduct, setShowTagProduct] = React.useState(true);
  const [taggedData, setTaggedData] = React.useState([]);
  const [visibleTooltip, setVisibleTooltip] = useState('');

  const handleClick = (tooltip) => {
    if (visibleTooltip === tooltip) {
      setVisibleTooltip('');
    } else {
      setVisibleTooltip(tooltip);
    }
  };

  const handleOpenTag = () => {
    setOpenTagProduct(true);
    setShowTagProduct(true);
  }

  const handleCloseTagProduct = () => {
    setOpenTagProduct(false);
  }

  const handleOpenMusicTag = () => {
    setOpenMusicTag(true);
  }

  const closeMusicTag = () => {
    setOpenMusicTag(false);
  }


  return (
    <Dialog
      open={openEditor}
      fullScreen
      onClose={handleCloseEditor}
      PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}

    >
      <button className='absolute top-4 left-2 h-[25px] w-[25px] z-[2000]' onClick={handleCloseEditor}>
        <img src={backIcon} alt='back' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
      </button>

      <div className='w-full absolute top-4 right-2 '>
        <ul className='flex items-center gap-x-[20px] justify-end edit---icons'>
          <li className='tag--icon'>
            <img src={addTag} alt='tag' className='w-[30px] h-[30px] flex-shrink-0' onClick={() => handleClick('tag')} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            {visibleTooltip === 'tag' && (
              <div className='tag--icon--text cursor-pointer' onClick={handleOpenTag}>
                <span className='flex items-center gap-x-[4px]'>
                  Tag Product
                  <img src={tag} alt='tag' />
                </span>
              </div>
            )}
          </li>

          {/* <li className='frame--icon'>
            <img src={Frame} alt='text' className='w-[30px] h-[30px] flex-shrink-0' onClick={() => handleClick('frame')} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            {visibleTooltip === 'frame' && (
              <div className='frame--icon--text cursor-pointer'>
                <span className='flex items-center gap-x-[4px] justify-center'>
                  Add Frame
                </span>
              </div>
            )}
          </li>

          <li className='text--icon'>
            <img src={Text} alt='audio' className='w-[30px] h-[30px] flex-shrink-0' onClick={() => handleClick('text')} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            {visibleTooltip === 'text' && (
              <div className='text--icon--text cursor-pointer'>
                <span className='flex items-center gap-x-[4px] justify-center'>
                  Add Text
                </span>
              </div>
            )}
          </li> */}

          <li className='music--icon'>
            <img src={Audio} alt='frame' className='w-[30px] h-[30px] flex-shrink-0' onClick={() => handleClick('music')} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            {visibleTooltip === 'music' && (
              <div className='music--icon--text  cursor-pointer' onClick={handleOpenMusicTag}>
                <span className='flex items-center gap-x-[4px]'>
                  Tag Song
                  <img src={music} alt='music' />
                </span>
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className='px-[1rem]'>
        <VideoTrimmer
          selectedfiles={selectedfiles}
          activeFile={activeFile}
          collectionName={collectionName}
          taggedData={taggedData}
          setSelectedFiles={setSelectedFiles}
          theme={theme}
          selectedFilesBlobs={selectedFilesBlobs}
          setSelectedFilesBlobs={setSelectedFilesBlobs}
        />
      </div>

      <div className='px-[1rem]'>
        <AddTag
          selectedfiles={selectedfiles}
          activeFile={activeFile}
          handleCloseTagProduct={handleCloseTagProduct}
          openTagProduct={openTagProduct}
          setShowTagProduct={setShowTagProduct}
          showTagProduct={showTagProduct}
          taggedData={taggedData}
          setTaggedData={setTaggedData}
          theme={theme}
        />
      </div>

      <MusicTag
        openMusicTag={openMusicTag}
        closeMusicTag={closeMusicTag}
        theme={theme}
        selectedfiles={selectedfiles}
        activeFile={activeFile}
      />

    </Dialog>
  )
};

export default PostVideoEditor