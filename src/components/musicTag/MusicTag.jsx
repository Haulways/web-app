import { CardMedia, Dialog } from "@mui/material";
import * as React from "react";
import { MusicCard, searchVideo } from "../musicSearch/MusicSearch";
import { SearchBox } from "../search/SearchBox";
import { BsFillFilterCircleFill } from 'react-icons/bs';
import { PiCaretDownBold } from "react-icons/pi";
import backIcon from "../../assets/postImg-Icons/backIcon.png";


export const MusicTag = ({ openMusicTag, closeMusicTag, theme, selectedfiles, activeFile }) => {
    const [input, setInput] = React.useState("");
    const [audios, setAudios] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 3;

    
    // React.useEffect(() => {
    //     async function fetchData() {
    //         const results = await searchVideo(input);
    //         setAudios(results);
    //         console.log(results);
    //     }
    //     fetchData();
    // }, [input]);

    const myaudios = [
        {
            "title": "Restream hôm qua.................",
            "videoId": "pXbdOLFm8g4",
            "thumbnail": {
                "url": "https://i.ytimg.com/vi/pXbdOLFm8g4/default_live.jpg",
                "width": 120,
                "height": 90
            }
        },

        {
            "title": "What Is Trevor&#39;s Favorite Accent? - Between the Scenes | The Daily Show",
            "videoId": "qp4vlSOOnY4",
            "thumbnail": {
                "url": "https://i.ytimg.com/vi/qp4vlSOOnY4/default.jpg",
                "width": 120,
                "height": 90
            }
        },

        {
            "title": "Nigeria v Ghana | FIFA World Cup Qatar 2022 Qualifier | Match Highlights",
            "videoId": "inUrmJjjA30",
            "thumbnail": {
                "url": "https://i.ytimg.com/vi/inUrmJjjA30/default.jpg",
                "width": 120,
                "height": 90
            }
        },

        {
            "title": "COOK YOUR NOODLES AND EGGS THIS WAY. SO SO GOOD👍#shorts #giveityourbestshort #ifyskitchen",
            "videoId": "3hzIoTIovuU",
            "thumbnail": {
                "url": "https://i.ytimg.com/vi/3hzIoTIovuU/default.jpg",
                "width": 120,
                "height": 90
            }
        },

        {
            "title": "Welcome the Knight | Marvel Studios’ Moon Knight | Disney+",
            "videoId": "ktD8JWqRoEc",
            "thumbnail": {
                "url": "https://i.ytimg.com/vi/ktD8JWqRoEc/default.jpg",
                "width": 120,
                "height": 90
            }
        }
    ];
    const totalPages = Math.ceil(myaudios?.length / ITEMS_PER_PAGE);

    const handleClick = (newPage) => {
        setCurrentPage(newPage);
    };
	
    return (
        <Dialog
            fullScreen
            open={openMusicTag}
            onClose={closeMusicTag}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", padding: '16px', position: 'relative' } }}
        >

            <button className='absolute top-4 left-2 h-[35px] w-[35px]  invert' onClick={closeMusicTag}>
                <img src={backIcon} alt='back' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            </button>

            <button className='bg-black text-white rounded-full  text-[14px] h-[34px] px-[1.1rem] font-[600] absolute top-4 right-4'
                onClick={closeMusicTag}
                style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
            >
                Done
            </button>

            {/* <input
                className='search--input'
                type='search'
                placeholder='Search for courses'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            /> */}
            

            <div className="flex items-center gap-x-[30px] flex-shrink-0 mt-[4rem]">
                <SearchBox placeholder='Search for song' />
                <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", fill: theme === "light" ? "#d9d9d9" : "#d9d9d9" }} />
            </div>

            {/* filter tags  */}
            <div className="mt-[25px] mb-[10px] store__card" >
                <ul className="flex gap-x-[20px] justify-end items-center overflow-x-scroll store__card">
                    <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-fit cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                       Name
                        <PiCaretDownBold className="flex-shrink-0" />
                    </li>
                    <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-fit cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                       Artist
                        <PiCaretDownBold className="flex-shrink-0" />
                    </li>
                    {/* */}
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-[2rem]">
                {myaudios && myaudios.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((song, index) => (
                    <div key={index}>

                        <MusicCard
                            theme={theme}
                            song={song}
                            selectedfiles={selectedfiles}
                            activeFile={activeFile}
                        />
                    </div>

                ))}
            </div>

            <div className="mt-[1rem] mb-[1rem] flex justify-end text-white">
                <span>
                    {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, myaudios.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, myaudios.length)} of {myaudios.length}
                </span>
                <button disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? 'transparent' : '' }} className="px-[10px]" onClick={() => handleClick(currentPage - 1)}>
                    {'<'}
                </button>
                <button disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? 'transparent' : '' }} onClick={() => handleClick(currentPage + 1)}>
                    {'>'}
                </button>
            </div>


            
        </Dialog>
    );
};
