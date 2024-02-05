import {
  selectPeers,
  useHMSActions,
  useHMSStore,
  selectHLSState,
} from "@100mslive/react-sdk";
import React from "react";
import VideoGrid from "../videoGrid/VideoGrid";
import  '../live.css';



const Conference = () => {

  let broadcasterExists = false;
const peers = (useHMSStore(selectPeers) || []).filter(peer => {
    if (peer.roleName === 'broadcaster') {
        if (broadcasterExists) {
            return false;
        } else {
            broadcasterExists = true;
            return true;
        }
    }
    return peer.roleName === 'cohost'; 
});


  const hlsState = useHMSStore(selectHLSState);
//   console.log('is hls streaming going on - ', hlsState.running);
//   console.log('hls url - ', hlsState.variants[0]?.url);

    console.log(peers);



    return (
        <div className="conference-section">

            {hlsState?.running  ? (
                <VideoGrid videoTitles={peers}  />
                
                // <HLSView  />

            ) : (
                    <VideoGrid videoTitles={peers}  />
                    
            )}

        </div>
    );
};

export default Conference;
