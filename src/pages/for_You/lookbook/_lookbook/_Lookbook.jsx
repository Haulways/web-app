import { InfiniteList, Create, Show } from 'react-admin';
import { CreatePost } from '../../../../components';
import { LookbookListActions } from './_LookbookActions';
import { LookBookListContents } from './__lookbookListContent';
import { LookShowContent } from './_LookbookContent';



// postList 
export const LookList = () => {
    return (

        <InfiniteList resource='lookbook' title='Lookbook' actions={<LookbookListActions />}
        sx={{
            '& .MuiToolbar-root': {
                minHeight: '0px !important'
            }
        }}
        >
            <LookBookListContents />
        </InfiniteList>
    )
};


export const LookCreate = () => {
    return (
        <Create >
            <CreatePost title='Lookbook' collectionName="lookbook" />
        </Create>
    )
};

export const LookEdit = () => (
    <></>
);

export const LookShow = (props) => {
    return (
        <Show title=' ' actions={false}>
            <LookShowContent />
        </Show>
    )
};