import { Create, InfiniteList, Show } from 'react-admin';
import { GrwmListContents } from './__GRWMListContents';
import { GrwmListActions } from './_GRWMActions';
import { GrwmShowContent } from './_GRWMContent';
import { CreatePost } from '../../../../components';



// postList 
export const GrwmList = () => {
    return (

        //  <ListGuesser/>
        <InfiniteList resource='grwm' title='GRWM' actions={<GrwmListActions />}
        sx={{
            '& .MuiToolbar-root': {
                minHeight: '0px !important'
            }
        }}
        >
            <GrwmListContents />
        </InfiniteList>
    )
};


export const GrwmCreate = () => { 
    return (
        <Create >
            <CreatePost title='GRWM' collectionName="grwm" />
        </Create>
    )
};

export const GrwmEdit = () => (
    <>
    </>
);

export const GrwmShow = (props) => {
    return (
        <Show title=' ' actions={false}>
            <GrwmShowContent />
        </Show>
    )
};