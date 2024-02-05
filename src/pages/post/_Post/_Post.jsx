import { Create, InfiniteList, Show } from 'react-admin';
import {  PostEditContent, PostListContent, PostShowContent } from './_PostContent';
import { CreatePost } from '../../../components';
import { PostListActions } from './_PostActions';



// postList 
export const PostList = () => {

    return (

        <InfiniteList title='Feed' resource='posts' actions={<PostListActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                },
                padding: '0px !important',
                
            }}
        >
        <PostListContent />
    </InfiniteList>
    )
 

};


export const PostCreate = () => { 
    return (
        <Create >
            <CreatePost title='Post' collectionName="posts" />
        </Create>
    )
};

export const PostEdit = () => (
    <PostEditContent/>
);

export const PostShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <PostShowContent />
        </Show>
    );
};