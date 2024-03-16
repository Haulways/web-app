import { CardMedia, CircularProgress, IconButton, Skeleton } from "@mui/material";
import { Create, EditGuesser, WithListContext, } from "react-admin";
import { ThemeContext } from "../../components/context/ThemeProvider";
import { useContext, useState } from "react";
import backIcon from "../../assets/hauls/backIcon.png";
import { CreatePost, SFooter } from "../../components";
import { Link, useNavigate } from "react-router-dom";
// import SkillCenterShow from "../../SkillCenterShow";
import InfluencerStore from "../store/influencerStore/InfluencerStore";





export const UGCListContent = () => {
    const { theme } = useContext(ThemeContext);
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();
    const goToStore = () => {
        navigate('/skill-center', { state: { open: false } });
    };



    const handleCanPlay = () => {
        setIsReady(true);
    };

    return (
        <>
            <InfluencerStore />
        </>

    );
};


export const UGCCreateContent = () => (
    <Create>
        <CreatePost title='Course' collectionName="courses" />
    </Create>
);

export const UGCEditContent = () => (
    <EditGuesser />
);


export const UGCShowContent = () => {
    return (

        <>
            {/* <SkillCenterShow /> */}
        </>
    )
};
