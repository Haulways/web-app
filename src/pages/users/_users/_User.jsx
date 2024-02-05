import { InfiniteList, Show } from 'react-admin';
import { UserEditContent, UserListContent, UserShowContent } from './_UsersContent';





// postList 
export const UsersList = () => {
    return (
        <InfiniteList title='Vendors' resource='users' actions={false}>
            <UserListContent />
        </InfiniteList>
    )
};


export const UsersCreate = () => {
    return (
        <>
        
        </>
    )
};

export const UsersEdit = () => (
    <>
        <UserEditContent />
    </>
);



export const UsersShow = () => {
    return (
        
            <Show title=' ' actions={false} >
                <UserShowContent />
            </Show>
        
    );
};