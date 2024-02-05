import {  InfiniteList, Show } from 'react-admin';
import { CosmeticsActions } from './CosmeticsActions';
import { CosmeticsCreateContent, CosmeticsListContent, CosmeticsShowContent } from './CosmeticsContent';



export const CosmeticsList = () => {

    return (

        <InfiniteList title=' ' resource='courses' actions={<CosmeticsActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                }
            }}
        >
       <CosmeticsListContent/>
    </InfiniteList>
    )
 

};


export const CosmeticsCreate = () => { 
    return (
        <CosmeticsCreateContent/>
    )
};

export const CosmeticsEdit = () => (
    <>
    </>
);

export const CosmeticsShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <CosmeticsShowContent/>
        </Show>
    );
};