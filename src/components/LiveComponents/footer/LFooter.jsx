import { useAVToggle } from '@100mslive/react-sdk';
import React from 'react'

const LFooter = () => {
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo
      } = useAVToggle();
    return (
        <div className="control-bar">
            <button className="btn-control" onClick={toggleAudio}>
                {isLocalAudioEnabled ? "Mute" : "Unmute"}
            </button>
            <button className="btn-control" onClick={toggleVideo}>
                {isLocalVideoEnabled ? "Hide" : "Unhide"}
            </button>
        </div>
    );
}

export default LFooter