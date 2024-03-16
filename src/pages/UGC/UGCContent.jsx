import { CardMedia, CircularProgress, IconButton, Skeleton } from "@mui/material";
import { Create, EditGuesser, Form, NumberInput, SelectInput, SimpleForm, WithListContext, useGetIdentity, useGetList, } from "react-admin";
import { ThemeContext } from "../../components/context/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import backIcon from "../../assets/hauls/backIcon.png";
import { CreatePost, SFooter } from "../../components";
import { Link, useNavigate } from "react-router-dom";
// import SkillCenterShow from "../../SkillCenterShow";
import InfluencerStore from "../store/influencerStore/InfluencerStore";
import Union from "../../assets/postImg-Icons/Union.webp";
import { useWatch } from 'react-hook-form';
import { SmallHorizontalMediaCards } from "../../components/card/ShowCard";






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



export const UGCCreateContent = () => {
    const { theme } = useContext(ThemeContext);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();


    const types = [{ id: 'hauls', name: 'Hauls' }, { id: 'lookbook', name: 'Lookbook' }, { id: 'diy', name: 'DIY' }, { id: 'grwm', name: 'GRWM' }];
    const [post, setPost] = useState(null);
    const UGCInput = () => {
        const type = useWatch({ name: 'type' });
        const { data, total, isLoading, error } = useGetList(type)
        


        useEffect(() => {
            if (data) {
                console.log(data)
            }
        }, [data])

        useEffect(() => {
            if (type) {
                console.log(type)
            }
        }, [type])

        useEffect(() => {
            if (post) {
                console.log(post)
            }
        }, [post])

        return (
            <>
                {
                    data && data.length ? (<SmallHorizontalMediaCards post={data} setPost={setPost} />) : (null)
                }

                {
                    post ? (
                        <div className="flex flex-col items-center justify-start mt-5">
                            <h5 className="text-bold">Set Your Price</h5>
                            <div className="flex items-center justify-start mt-3">
                                <div className='w-[60.16px] h-[63.16px] rounded-[8px] mr-3 overflow-hidden'>
                                    <video src={post.media[0]} alt={post.id} muted controls={false} playsInline={true} controlsList="nodownload" />
                                </div>
                                <NumberInput source="price" />
                            </div>
                        </div>

                    ) : (null)
                }

            </>
        );
    };

    return <Create>
        <SimpleForm>
            <SelectInput
                choices={types ? types : []}
                source="type"
            // defaultValue={}
            />

            <UGCInput />

        </SimpleForm>

    </Create>
};


export const UGCEditContent = () => (<>
    {/* <EditGuesser /> */}
</>
);




export const UGCShowContent = () => {
    return (

        <>
            {/* <SkillCenterShow /> */}
        </>
    )
};
