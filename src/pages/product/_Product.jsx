import { Show } from "react-admin";
import { ProductEditContent, ProductCreateContent, ProductListContent, ProductShowContent } from "./_ProductContent";
import { ThemeContext } from "../../components/context/ThemeProvider";
import * as React from 'react';
import CreateProduct from "../products/ProductList/CreateProduct";


export const ProductList = () => {

    return (

        <>
            <ProductListContent />
        </>
    )
 

};


export const ProductCreate = () => { 
    <>
        <ProductCreateContent />
    </>
};

export const ProductEdit = () => (
    <>
        <ProductEditContent />
    </>
);

export const ProductShow = () => {
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
            <ProductShowContent />
        </Show>
    );
};