import React, { useMemo } from 'react';
import './VideoGrid.css'; // You can style your grid in a separate CSS file
import Peer from '../peer/Peer';
import { selectDominantSpeaker, selectHLSState, selectLocalPeer,  selectPeerAudioByID, selectSpeakers, useHMSStore } from '@100mslive/react-sdk';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';



const VideoGrid = ({ videoTitles }) => {
    
    const hlsState = useHMSStore(selectHLSState);

    let gridTemplateRows;
    let gridTemplateColumns;

    if (videoTitles.length === 1) {
        gridTemplateRows = '1fr';
        gridTemplateColumns = '1fr';// Full height for a single tile
    } else if (videoTitles.length === 2) {
        gridTemplateRows = '1fr'; // Split screen into two rows for two tiles
        gridTemplateColumns = '1fr';
    } else if (videoTitles.length > 6) {
        gridTemplateColumns = 'repeat(2, 1fr)'; // Two columns of equal width
        gridTemplateRows = 'repeat(3, 1fr)'; // Three rows of equal height
    } else {
        gridTemplateRows = `repeat(${Math.ceil(videoTitles.length / 2)}, 1fr)`; // Default configuration
    }


    /** get localpeer from store */
    const localpeer = useHMSStore(selectLocalPeer);
    /** get a given peer's audio level. */
    const peerAudioLevel = useHMSStore(selectPeerAudioByID(localpeer.id));
    // console.log(`audio level for peer - ${localpeer.id} is ${peerAudioLevel}`);
 
    /** get all speakers. Gives back a list of all peers who are not muted. */
    const allSpeakers = useHMSStore(selectSpeakers);
    // console.log('all speakers', allSpeakers);
 
    /** gets the active speaker */
    const dominantSpeaker = useHMSStore(selectDominantSpeaker);
    // console.log(dominantSpeaker);
   

    const chunks = useMemo(() => {
        const result = [];
        for (let i = 0; i < videoTitles.length; i += 6) {
            result.push(videoTitles.slice(i, i + 6));
        }
        return result;
    }, [videoTitles]);

    return (
        <>
            {videoTitles.length > 6 ? (
                <Splide
                style={{ backgroundColor: '#222' }}
                    options={{
                        type: "slide",
                        pagination: false,
                        arrows: false,
                      
                    }}
                >
                    {chunks.map((chunk, index) => (
                        <SplideSlide key={index} >
                            <div className="video-grid" style={{ gridTemplateRows, gridTemplateColumns }}>
                                {chunk.map((title, index) => (
                                    <div key={index} className={dominantSpeaker?.id === title.id ? "active-video-tile video-tile" : "video-tile"}>
                                        <Peer key={title.id} peer={title} peerId={title.id} />
                                    </div>
                                ))}
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            ) : (
                <div className="video-grid" style={{ gridTemplateRows, gridTemplateColumns }}>
                    {videoTitles.map((title, index) => (
                        <div key={index} className={(dominantSpeaker?.id === title.id) && (hlsState.running === false) ? "active-video-tile video-tile" : "video-tile"}>
                            <Peer key={title.id} peer={title} peerId={title.id} />
                        </div>
                    ))}
                </div>
            )}
        </>

    );
};

export default VideoGrid;

