import { useState } from "react";
import { NormalCard } from "../card/NormalCard";
import { FullScreenDialog } from "../dialog/DialogBox";

export const OpenASCE = React.createContext();

export const AsceContextProvider = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <OpenContext.Provider value={{ open, handleClickOpen, handleClose }}>
            {/* <NormalCard />
            <FullScreenDialog /> */}
        </OpenContext.Provider>
    )
}