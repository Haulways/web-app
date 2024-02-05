import { InfiniteList, Show } from 'react-admin';
import { CraftActions } from './CraftActions';
import { CraftCreateContent, CraftListContent, CraftShowContent } from './CraftContent';



export const CraftList = () => {

    return (

        <InfiniteList title=' ' resource='courses' actions={<CraftActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                }
            }}
        >
       <CraftListContent/>
    </InfiniteList>
    )
 

};


export const CraftCreate = () => { 
    return (
        <CraftCreateContent/>
    )
};

export const CraftEdit = () => (
    <>
    </>
);

export const CraftShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <CraftShowContent/>
        </Show>
    );
};