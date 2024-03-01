import { Show } from "react-admin";
import { ProductEditContent, ProductListContent, ProductShowContent } from "./_ProductContent";

export const ProductList = () => {

    return (

        <>
            <ProductListContent />
        </>
    )
 

};


export const ProductCreate = () => { 
    return (
        <></>
    )
};

export const ProductEdit = () => (
    <>
        <ProductEditContent />
    </>
);

export const ProductShow = () => {
   
    return (
        <Show title=' ' actions={false}
            sx={{
                '& .RaLayout-content': {
                    padding: '0px !important'
                }
            }}
        >
            <ProductShowContent />
        </Show>
    );
};