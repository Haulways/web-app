import {  Create,  InfiniteList, Show } from 'react-admin';
import {  HaulsListActions } from './_HaulsActions';
import { HaulsListContents } from './__haulsListContent';
import { CreatePost } from '../../../../components';
import { HaulsShowContent } from './_HaulsContent';



 
export const HaulsList = () => {
    return (
        <>
            <InfiniteList resource='hauls' title='Hauls' actions={<HaulsListActions />}
                sx={{
                    '& .MuiToolbar-root': {
                        minHeight: '0px !important'
                    }
                }}
            >
                <HaulsListContents />
            </InfiniteList>
        </>
    )
};


export const HaulsCreate = () => { 
    return (
 
        <Create >
            <CreatePost title='Hauls' collectionName="hauls"/>
        </Create>
    )
};

export const HaulsEdit = () => (
 
    <>
    </>
);

export const HaulsShow = () => {
    return (
        <Show title=' ' actions={false}>
            <HaulsShowContent />
        </Show>
    )
};