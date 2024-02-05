import * as React from 'react'
import { Chats } from '../../components/chatListContents/ChatListComponent'
import DFooter from '../../components/dashboard/footer/DFooter'
import { InfiniteList, WithListContext } from 'react-admin'
import { ThemeContext } from '../../components/context/ThemeProvider';

const ChatList = () => {
  const { theme } = React.useContext(ThemeContext);
  const [mediaFiles, setMediaFiles] = React.useState([]);
  const [cameraFile, setCameraFile] = React.useState(null);
  const [docFile, setDocFile] = React.useState(null);
  const [audioFile, setAudioFile] = React.useState(null);
  
  return (
    <>
      <InfiniteList title='Chats' resource='chats' actions={false}
        sx={{
        '& .MuiBox-root': {
          padding: '0',
          
          },
          backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff",
      }}
      >
        <WithListContext render={({ isLoading, data }) => (
          !isLoading && (
            <>
              <Chats messages={data}  mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} cameraFile={cameraFile} setCameraFile={setCameraFile} docFile={docFile} setDocFile={setDocFile} audioFile={audioFile} setAudioFile={setAudioFile}  />
            </>
          ))}
        />
        <DFooter />
      </InfiniteList>
    </>
  );
};

export default ChatList