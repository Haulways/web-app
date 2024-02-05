import React from 'react'
import { AdTags } from '../productTag/AddTag';


const AdVideoEditor = ({ handleCloseEditor, theme, taggedData, setTaggedData, tags, collectionName}) => {

  return (
   
    <div className='px-[1rem]'>
      <AdTags
        tags={tags}
        handleCloseEditor={handleCloseEditor}
        taggedData={taggedData}
        setTaggedData={setTaggedData}
        theme={theme}
        collectionName={collectionName}
      />
    </div>
  )
};

export default AdVideoEditor