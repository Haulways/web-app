import CheckStore from "./CheckStore";
import Store from "./Store";
import StoreCreate from "./StoreCreate";


export const StoreListContent = () => ( 
    <><CheckStore/></>
 );

export const StoreCreateContent = () => ( 
   <><StoreCreate/></>
);

export const StoreEditContent = () => (
    <></>
);


export const StoreShowContent = () => {
    return (
        
        <>
            <Store />
        </>
    )
};