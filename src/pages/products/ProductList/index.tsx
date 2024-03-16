import { List, Pagination } from "react-admin";
import Container from "../../common/Container";
import ProductHeading from "../../common/ProductHeading";
import ProductListFilter from "./Filters";
import Table from "./Table";
import { Fragment, useState } from "react";
import CreateProduct from "./CreateProduct";
import React from "react";

const ProductList = () => {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <Fragment>
      <Container>
        <div className="h-full w-[97vw] md:w-full bg-white overflow-y-auto hidden-scrollbar border border-gray-200 rounded-md p-3 px-4 md:p-8">
          <ProductHeading setAddProduct={setAddProduct} />
          <ProductListFilter />

          <List
            exporter={false}
            hasCreate={false}
            pagination={
              <div className="w-full flex justify-start">
                <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} />
              </div>
            }
            // actions={<OrderListActions />}
            className="overflow-auto w-full"
          >
            <Table />
          </List>
        </div>
      </Container>

      <CreateProduct show={addProduct} close={() => setAddProduct(false)} />
    </Fragment>
  );
};

export default ProductList;
