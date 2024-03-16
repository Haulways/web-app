import { Show } from "react-admin";
import { StoreCreateContent, StoreEditContent, StoreListContent, StoreShowContent } from "./_StoreContent";
import { ThemeContext } from "../../components/context/ThemeProvider";
import * as React from 'react';


export const StoreList = () => {

    return (

        <>
            <StoreListContent />
        </>
    )


};


export const StoreCreate = () => {
    return (
        <><StoreCreateContent/></>
    )
};

export const StoreEdit = () => (
    <>
        <StoreEditContent />
    </>
);

export const StoreShow = () => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <Show title=' ' actions={false}
            sx={{
                '& .RaLayout-content': {
                    padding: '0px !important',
                },
                '& .RaShow-card': {
                    background: theme === 'light' ? '#fff' : '#222',
                    color: theme === 'light' ? '#222' : '#fff',
                }
            }}
        >
            <StoreShowContent />
        </Show>
    );
};