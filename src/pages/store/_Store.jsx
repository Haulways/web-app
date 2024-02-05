import { Show } from "react-admin";
import { StoreEditContent, StoreListContent, StoreShowContent } from "./_StoreContent";

export const StoreList = () => {

    return (

        <>
            <StoreListContent />
        </>
    )
 

};


export const StoreCreate = () => { 
    return (
        <></>
    )
};

export const StoreEdit = () => (
    <>
        <StoreEditContent />
    </>
);

export const StoreShow = () => {
   
    return (
        <Show title=' ' actions={false}
            sx={{
                '& .RaLayout-content': {
                    padding: '0px !important'
                }
            }}
        >
            <StoreShowContent />
        </Show>
    );
};