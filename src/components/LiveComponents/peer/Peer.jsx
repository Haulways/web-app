import { selectHLSState, selectIsPeerAudioEnabled, selectLocalPeerID, selectPeerNameByID, selectPeers, selectVideoTrackByPeerID, useHMSStore, useVideo } from '@100mslive/react-sdk';
import { Avatar, StyledVideoTile } from '@100mslive/roomkit-react';
import React from 'react'
import MicOffIcon from '@mui/icons-material/MicOff';


const Peer = ({ peer, peerId }) => {
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });
    const hlsState = useHMSStore(selectHLSState);
    const trackSelector = selectVideoTrackByPeerID(peerId);
    const track = useHMSStore(trackSelector);
    const isVideoMuted = !track?.enabled;
    const isAudioMuted = !useHMSStore(selectIsPeerAudioEnabled(peerId));
    const isVideoDegraded = track?.degraded;
    const peerName = useHMSStore(selectPeerNameByID(peer.id));

    // console.log(peer)
    return (
        <>
            <div className="peer-container">
                <video
                    ref={videoRef}
                    className={`peer-video ${peer.isLocal ? "local" : "h-full w-full"}`}
                    autoPlay
                    muted
                    playsInline
                />

               
            </div>
            

            

            {(isVideoMuted) ? (
                <div className="">
                    <Avatar
                        // sx={{outerWidth: '40px'}}
                        name={peerName || ""}
                        data-testid="participant_avatar_icon"
                        size='550'
                        className='absolute my-auto mx-auto left-0 right-0 top-0 bottom-0 w-[70px] h-[70px]'
                    />
                    {(hlsState.running && peer.isLocal) ? null : (
                        <div className="peer-name">
                            {peer.name} {peer.isLocal ? "(You)" : ""}{(!peer.isLocal) && (peer.roleName === "broadcaster") ? "(Host)" : ""}
                        </div>
                    )}
                </div>
            ) : null}

            {(isAudioMuted) ? (
                <StyledVideoTile.AudioIndicator
                    data-testid="participant_audio_mute_icon"
                    
                >
                    <MicOffIcon />
                </StyledVideoTile.AudioIndicator>
            ) : null}
        </>
    );
};

export default Peer