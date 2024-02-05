import {  InfiniteList, Show } from 'react-admin';
import { FashionActions } from './FashionActions';
import { FashionCreateContent, FashionListContent, FashionShowContent } from './FashionContent';



export const FashionList = () => {

    return (

        <InfiniteList title=' ' resource='courses' actions={<FashionActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                }
            }}
        >
       <FashionListContent/>
    </InfiniteList>
    )
 

};


export const FashionCreate = () => { 
    return (
        <FashionCreateContent/>
    )
};

export const FashionEdit = () => (
    <>
    </>
);

export const FashionShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <FashionShowContent/>
        </Show>
    );
};