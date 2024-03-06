// import {
//   ArrayField,
//   BooleanField,
//   CloneButton,
//   ChipField,
//   Datagrid,
//   DateField,
//   EditButton,
//   NumberField,
//   ReferenceArrayField,
//   ReferenceManyField,
//   ReferenceManyCount,
//   RichTextField,
//   SelectField,
//   ShowContextProvider,
//   ShowView,
//   SingleFieldList,
//   TabbedShowLayout,
//   TextField,
//   UrlField,
//   useShowController,
//   useLocaleState,
//   useRecordContext,
// } from "react-admin";
// // import PostTitle from "./PostTitle";

import { Order } from "@medusajs/medusa";
import { ShowProps, useRedirect } from "react-admin";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import Customer from "./Customer";
import Fulfillment from "./Fulfillment";
import Payment from "./Payment";
import RawOrder from "./RawOrder";
import Summary from "./Summary";
import Timeline from "./Timeline";
import TopDetail from "./TopDetail";

// const CreateRelatedComment = () => {
//   const record = useRecordContext();
//   return (
//     <CloneButton
//       resource="comments"
//       label="Add comment"
//       record={{ post_id: record.id }}
//     />
//   );
// };

//   const controllerProps = useShowController();
//   const [locale] = useLocaleState();
//   return (
//     <ShowContextProvider value={controllerProps}>
//       <ShowView title={'<PostTitle />'}>
//         <TabbedShowLayout>
//           <TabbedShowLayout.Tab label="post.form.summary">
//             <TextField source="id" />
//             <TextField source="title" />
//             {controllerProps.record &&
//               controllerProps.record.title ===
//                 "Fusce massa lorem, pulvinar a posuere ut, accumsan ac nisi" && (
//                 <TextField source="teaser" />
//               )}
//             <ArrayField source="backlinks">
//               <Datagrid bulkActionButtons={false}>
//                 <DateField source="date" />
//                 <UrlField source="url" />
//               </Datagrid>
//             </ArrayField>
//           </TabbedShowLayout.Tab>
//           <TabbedShowLayout.Tab label="post.form.body">
//             <RichTextField source="body" stripTags={false} label={false} />
//           </TabbedShowLayout.Tab>
//           <TabbedShowLayout.Tab label="post.form.miscellaneous">
//             <ReferenceArrayField
//               reference="tags"
//               source="tags"
//               sort={{ field: `name.${locale}`, order: "ASC" }}
//             >
//               <SingleFieldList>
//                 <ChipField source={`name.${locale}`} size="small" />
//               </SingleFieldList>
//             </ReferenceArrayField>
//             <DateField source="published_at" />
//             <SelectField
//               source="category"
//               choices={[
//                 { name: "Tech", id: "tech" },
//                 { name: "Lifestyle", id: "lifestyle" },
//               ]}
//             />
//             <NumberField source="average_note" />
//             <BooleanField source="commentable" />
//             <TextField source="views" />
//             <CloneButton />
//           </TabbedShowLayout.Tab>
//           <TabbedShowLayout.Tab
//             label="post.form.comments"
//             count={
//               <ReferenceManyCount
//                 reference="comments"
//                 target="post_id"
//                 sx={{ lineHeight: "inherit" }}
//               />
//             }
//           >
//             <ReferenceManyField
//               reference="comments"
//               target="post_id"
//               sort={{ field: "created_at", order: "DESC" }}
//             >
//               <Datagrid>
//                 <DateField source="created_at" />
//                 <TextField source="author.name" />
//                 <TextField source="body" />
//                 <EditButton />
//               </Datagrid>
//             </ReferenceManyField>
//             <CreateRelatedComment />
//           </TabbedShowLayout.Tab>
//         </TabbedShowLayout>
//       </ShowView>
//     </ShowContextProvider>
//   );

const OrderShow = ({}: ShowProps) => {
  const redirect = useRedirect();
  const { state } = useLocation();
  const order = state?.order as Order | undefined;

  if (!order) return null;

  return (
    <div className="flex w-[98vw] flex-col space-y-4">
      {/* <div
        onClick={() => redirect("list", "order")}
        className="flex space-x-2 items-center text-gray-500 font-medium hover:cursor-pointer px-3 pt-1.5"
      >
        <BsArrowLeft className="w-5 h-5" />
        <p className="text-sm">Back to Orders</p>
      </div> */}

      <div className="flex flex-col md:flex-row-reverse md:justify-end gap-3 p-3">
        <Timeline order={order} />

        <section className="flex-grow md:max-w-[60%] flex flex-col space-y-3">
          <TopDetail order={order} />

          <Summary order={order} />

          <Payment order={order} />

          <Fulfillment order={order} />

          <Customer order={order} />

          <RawOrder order={order} />
        </section>
      </div>
    </div>
  );
};

export default OrderShow;
