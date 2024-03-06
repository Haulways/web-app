import ProductList from "../products/ProductList";
import SProduct from "./SProduct";
import CreateProduct from "../products/ProductList/CreateProduct";


export const ProductListContent = () => ( 
    <ProductList/>
 );

export const ProductCreateContent = () => { 
    const [addProduct, setAddProduct] = useState(true);
    return <CreateProduct show={addProduct} close={() => setAddProduct(false)} />
};

export const ProductEditContent = () => (
    <></>
);


export const ProductShowContent = () => {
    return (
        
        <>
            <SProduct />
        </>
    )
};