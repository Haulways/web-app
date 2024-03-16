import { Create, InfiniteList, Show } from 'react-admin';
import { UGCActions } from './UGCActions';
import { UGCCreateContent, UGCListContent, UGCShowContent } from './UGCContent';



export const UGCList = () => {

    return (

        <InfiniteList title=' ' resource='courses' actions={<UGCActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                }
            }}
        >
       <UGCListContent/>
    </InfiniteList>
    )
 

};


export const UGCCreate = () => { 
    return (
        <UGCCreateContent/>
    )
};

export const UGCEdit = () => (
    <>
    </>
);

export const UGCShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <UGCShowContent/>
        </Show>
    );
};