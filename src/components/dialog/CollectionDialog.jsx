import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import './DialogBox.css'
import { useTheme } from '@emotion/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ShowVideoBox } from '../videoPlayer/VideoPlayer';
import yellowLine from "../../assets/purchase-icons/yelloLine.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import location from "../../assets/purchase-icons/location.png";
// import wallet from "../../assets/purchase-icons/wallet.png";
import cartIcon from "../../assets/purchase-icons/oneWayCart.png";
// import visa from "../../assets/purchase-icons/visa.png";
import lorry from "../../assets/purchase-icons/lorry.png";
import processing from "../../assets/purchase-icons/Processing.png";
import thankYou from "../../assets/purchase-icons/ThankYou.png";
import share from "../../assets/socials/share.png";
import FB from "../../assets/socials/fb.png";
import IG from "../../assets/socials/ig.png";
import { Confirm, Form, FormTab, RadioButtonGroupInput, SaveButton, SelectInput, TabbedForm, TextInput, Toolbar, required, useStore } from 'react-admin';
import Medusa from '@medusajs/medusa-js';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useContext } from 'react';
import { PaystackButton } from 'react-paystack';
import sendChat from '../../assets/sendChat.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CheckSavedPost } from '../../pages/post/Post';


const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: "https://ecommerce.haulway.co",
});




export const CollectionDialog = ({ open, setOpen, col_list, col_names, theme, savePost, post }) => {
    const [currentFilter, setCurrentFilter] = React.useState(null);
    const { currentUser } = useContext(AuthContext);
    const [g_user, setG_User] = useStore("user");
    const [message, setMessage] = React.useState('');
    const { savedPost, loading, error } = CheckSavedPost(post.id, g_user);





    React.useEffect(() => {

        // console.log(col_names)

    }, [open]);


    useEffect(() => {
        // console.log(savedPost, g_user)
        if (savedPost.length) {
            if (savedPost[0].coll_name) {
                setCurrentFilter(savedPost[0].coll_name);
            }
            else {
                setCurrentFilter('general');
            }

        }

    }, [savedPost])







    return (
        <div>
            <Dialog
                // fullScreen
                open={open}
                // onClose={setOpen(false)}
                BackdropProps={{ invisible: false }}
                PaperProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}

            >


                {/* Purchase dialog */}
                {open && (
                    <Dialog
                        open={open}
                        PaperProps={{ style: { borderRadius: '20px', padding: '10px', minWidth: '340px', boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff" } }}
                        BackdropProps={{ invisible: true }}
                        onClose={() => { setOpen(false) }}
                    >
                        <div className='relative w-full flex item-center px-[15px] gap-x-[5px] justify-center mb-4 font-semibold'>
                            <h4>{savedPost.length ? ('Move') : ('Save')} to</h4>
                        </div>
                        <div className='relative w-full flex item-center px-[10px] gap-x-[5px] mb-2'>
                            <form className='chatBox w-full flex item-center justify-between'>
                                <input
                                    style={{ backgroundColor: theme === "light" ? "rgba(0 0 0 / 0.05)" : "rgba(0 0 0 / 0.05)", color: theme === "light" ? "#222" : "#fff", }}
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value); }}
                                    placeholder='New Collection'
                                    className='w-full rounded-full px-[15px] py-2 mx-2 text-black'
                                    
                                />
                                <button type='button' onClick={() => { savePost({ filter: message }); setOpen(false); }} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                    <AddCircleIcon />
                                </button>
                            </form>
                        </div>
                        <div className='relative w-full flex item-center px-[15px] gap-x-[5px] mt-3 mb-1 justify-start italic opacity-50'>
                            <h4>Choose from your collections</h4>
                        </div>
                        <div className='relative w-full h-fit py-[8px] px-[15px] rounded-[6px]  gap-y-[7px] flex flex-col capitalize items-start' style={{ backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff", }}>
                            {col_names.map(filter => (
                                <button key={filter} onClick={() => {
                                    if (savedPost.length > 0 && savedPost[0].postId === post.id) {
                                        savePost({ filter: filter })
                                    }
                                    else {
                                        savePost({ filter: filter })
                                    }
                                    setOpen(false);

                                }} className={currentFilter === filter ? 'bg-[#222] w-full px-[12px] py-[5px] rounded-[8px] text-[#fff] text-left' : 'px-[12px]'} style={{ textTransform: filter === 'grwm' || filter === 'diy' ? 'uppercase' : 'capitalize' }}>
                                    <h2>{filter}</h2>
                                </button>
                            ))}
                        </div>

                    </Dialog>
                )}



            </Dialog>
        </div>
    );
};


