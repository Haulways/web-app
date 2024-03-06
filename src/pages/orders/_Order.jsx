import { Show } from "react-admin";

import { ThemeContext } from "../../components/context/ThemeProvider";
import * as React from 'react';
import { OrderShowContent, OrderListContent, OrderEditContent } from "./_OrderContent";


export const OrderList = () => {

    return (

        <>
            <OrderListContent />
        </>
    )


};


export const OrderCreate = () => {

    return (
        <></>
    )
};

export const OrderEdit = () => (
    <>

    </>
);

export const OrderShow = () => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <Show title=' ' actions={false}
            sx={{
                '& .RaLayout-content': {
                    padding: '0px !important'
                },
                '& .RaShow-card': {
                    background: theme === 'light' ? '#fff' : '#222',
                    color: theme === 'light' ? '#222' : '#fff',
                }
            }}
        >
            <OrderShowContent />
        </Show>
    );
};