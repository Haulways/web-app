import { Edit } from "react-admin";
import { Partnership } from "../../components/contract/PartnershipDash";



export const ContractListContent = () => {

    return (
        <>
            
        
        </>
        
    );
};
 

export const ContractCreateContent = () => ( 
    <>
    </>
);

export const ContractEditContent = () => (
    <Edit title=' ' actions={false}>
        <Partnership />
    </Edit>
);


export const ContractShowContent = () => {
    return (
        <>
            <Partnership />
        </>
    )
};
