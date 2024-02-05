import { Create, InfiniteList, Show } from 'react-admin';
import { MakeupActions } from './MakeupActions';
import { MakeupCreateContent, MakeupListContent, MakeupShowContent } from './MakeupContent';



export const MakeupList = () => {

    return (

        <InfiniteList title=' ' resource='courses' actions={<MakeupActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                }
            }}
        >
       <MakeupListContent/>
    </InfiniteList>
    )
 

};


export const MakeupCreate = () => { 
    return (
        <MakeupCreateContent/>
    )
};

export const MakeupEdit = () => (
    <>
    </>
);

export const MakeupShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <MakeupShowContent/>
        </Show>
    );
};