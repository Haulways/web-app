import React from "react";
import * as helpers from "../../helpers";
import { PiDotOutlineFill } from "react-icons/pi";
import seekBtn from "../../assets/seekBtn.png";

// trimmer range
export default function RangeInput({
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
    loading,
  control,
    videoMeta,
    handleTrim,
  loaded,
  theme
}) {
  let RANGE_MAX = 100;
  React.useEffect(() => {
      if (loaded) {
          handleTrim();
      }
    }, [rStart, rEnd]);
  if (thumbNails.length === 0 && !loading) {
    return null;
    }
  if (loading) {
    return (
      <center>
        <h2 className="mt-[2rem] font-[600] text-[18px] mobile:text-[14px] feed--page"> Loading be patient.....</h2>
      </center>
    );
  }

    return (
        <>
            <div className="video--duration feed--page" >
                <p data-start={helpers.toTimeString(
                    (rStart / RANGE_MAX) * videoMeta.duration,
                    false
                )}></p>
                <p><PiDotOutlineFill className="text-[15px]" /></p>
                
                <p data-end={helpers.toTimeString(
                    (rEnd / RANGE_MAX) * videoMeta.duration,
                    false
                )}></p>
            </div>
        
            <div className="range_pack">
                <div className="image_box">
                    <div className="image_box--img">
                        {thumbNails.map((imgURL, id) => (
                            <img src={imgURL} crossOrigin="anonymous" alt={`sample_video_thumbnail_${id}`} key={id} />
                        ))}
                    </div>
                    <div
                        className="clip_box"
                        style={{
                            width: `calc(${rEnd - rStart}% )`,
                            left: `${rStart}%`,
                        }}
                        
                    >
                        <span className="clip_box_des">
                        <img src={seekBtn} alt="seekbtn" />
                        </span>
                        <span className="clip_box_des">
                        <img src={seekBtn} alt="seekbtn" />
                        </span>
                    </div>

                    {/* Left overlay */}
                    <div className="overlay-left" style={{ width: `${rStart}%` }}></div>
                    {/* Right overlay */}
                    <div className="overlay-right" style={{ width: `${100 - rEnd}%` }}></div>
                    <input
                        className="range"
                        type="range"
                        min={0}
                        max={RANGE_MAX}
                        onInput={handleUpdaterStart}
                        value={rStart}
                    />
                    <input
                        className="range"
                        type="range"
                        min={0}
                        max={RANGE_MAX}
                        onInput={handleUpdaterEnd}
                        value={rEnd}
                    />
                </div>
            </div>
            {control}
        </>
    )
};


// thumbnail input range 

export const ThumbnailRangeInput = ({
  thumbNails1,
  rEnd,
  rStart,
  handleUpdaterStart,
    loading,
  control,
    videoMeta,
}) => {
  let RANGE_MAX = 100;

  if (thumbNails1.length === 0 && !loading) {
    return null;
    }
  if (loading) {
    return (
      <center>
        <h2 className="mt-[1rem] font-[600] text-[18px] mobile:text-[14px]"> Loading be patient.....</h2>
      </center>
    );
  }

    return (
        <>
            <div className="font-[700] capitalize text-[18px] text-center mb-[1rem]" >
                Select a cover photo
            </div>
        
            <div className="range_pack">
                <div className="image_box">
                    <div className="image_box--img">
                        {thumbNails1.map((imgURL, id) => (
                            <img src={imgURL} crossOrigin="anonymous" alt={`sample_video_thumbnail_${id}`} key={id} />
                        ))}
                    </div>
                    <div
                        className="clip_box"
                        style={{
                            left: `${rStart}%`,
                        }}
                        
                    >
                        <span className="clip_box_des">
                        <img src={seekBtn} alt="seekbtn" />
                        </span>
                       
                    </div>

                    {/* Right overlay */}
                    <div className="overlay-left" style={{ width: `${rStart}%` }}></div>
                    <input
                        className="range"
                        type="range"
                        min={0}
                        max={RANGE_MAX}
                        onInput={handleUpdaterStart}
                        value={rStart}
                    />

                </div>
            </div>
            {control}
        </>
    )
};