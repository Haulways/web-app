import { Show } from "react-admin";
import { ContractEditContent, ContractListContent, ContractShowContent } from "./_ContractContent";




// postList 
export const ContractList = () => {

    return (

        <>
            <ContractListContent />
        </>
            
    );
 

};


export const ContractCreate = () => { 
    return (
        <>
        
        </>
    )
};

export const ContractEdit = () => (
    <>
        <ContractEditContent/>
    </>
);

export const ContractShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <ContractShowContent/>
        </Show>
    );
};