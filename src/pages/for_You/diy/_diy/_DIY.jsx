import { Create, InfiniteList, Show } from 'react-admin';
import { DIYListContents } from './__DIYListContents';
import { DIYListActions } from './_DIYActions';
import { DIYShowContent } from './_DIYContent';
import { CreatePost } from '../../../../components';



// postList 
export const DIYList = () => {
   
    return (

    <InfiniteList resource='diy' title='DIY' actions={<DIYListActions/>}
    sx={{
        '& .MuiToolbar-root': {
            minHeight: '0px !important'
        }
    }}
        >
        <DIYListContents />
    </InfiniteList>
    )
 

};


export const DIYCreate = () => { 
    return (
 
        <Create >
            <CreatePost title='DIY' collectionName="diy"/>
        </Create>
    )
};

export const DIYEdit = () => (
    <>
    </>
);

export const DIYShow = (props) => {
    return (
        <Show title=' ' actions={false}>
            <DIYShowContent />
        </Show>
    )
};