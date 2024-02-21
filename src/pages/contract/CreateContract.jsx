import React, { useContext } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from '@mui/material';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { useRedirect } from 'react-admin';

const CreateContract = ({ open, handleClose, }) => {
    const { theme } = useContext(ThemeContext);
    const redirect = useRedirect()

    const goToVendor = () => {
        redirect("/vendors")
    }

    const goToInfluencer = () => {
        redirect("/influencers")
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#222" : "#222", color: theme === "light" ? "#fff" : "#fff", position: 'relative' } }}
        >

            <div >
                <button
                    className="close__btn"
                    edge="start"
                    color="inherit"
                    onClick={
                        handleClose
                    }
                    aria-label="close"
                >
                    <CloseIcon />
                </button>
                <div className='absolute top-[30%] flex justify-center items-center left-0 right-0 mx-auto'>
                    <div className='min-w-[310px] min-h-[150px] p-[20px] shadow-sm shadow-stone-500 rounded-sm'>
                        <h2 className="text-[18px] font-[500]">Enter new contract with</h2>
                        <div className='flex my-[2rem] justify-evenly gap-x-3'>

                            <button className='bg-[rgba(68, 68, 68, 0.2)] outline rounded-sm outline-1 px-[2rem] py-[.3rem]' onClick={goToVendor}>
                                Vendor
                            </button>

                            <button className='bg-[rgba(68, 68, 68, 0.2)] font-[500] text-white outline outline-zinc-500 outline-1 rounded-md px-[1.5rem] py-[.3rem]' onClick={goToInfluencer}>
                                Influencer
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default CreateContract