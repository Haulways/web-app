/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// import { Theme, styled } from "@mui/material/styles";
// import lodashGet from "lodash/get";
// import jsonExport from "jsonexport/dist";
// import {
//   BooleanField,
//   BulkDeleteButton,
//   BulkExportButton,
//   ChipField,
//   SelectColumnsButton,
//   CreateButton,
//   DatagridConfigurable,
//   DateField,
//   downloadCSV,
//   EditButton,
//   ExportButton,
//   FilterButton,
//   List,
//   InfiniteList,
//   NumberField,
//   ReferenceArrayField,
//   ReferenceManyCount,
//   SearchInput,
//   ShowButton,
//   SimpleList,
//   SingleFieldList,
//   TextField,
//   TextInput,
//   TopToolbar,
//   useTranslate,
// } from "react-admin";

// // import ResetViewsButton from "./ResetViewsButton";
// export const PostIcon = BookIcon;

// const QuickFilter = ({
//   label,
// }: {
//   label?: string;
//   source?: string;
//   defaultValue?: any;
// }) => {
//   const translate = useTranslate();
//   return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
// };

// const postFilter = [
//   <SearchInput source="q" alwaysOn />,
//   <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />,
//   <QuickFilter
//     label="resources.posts.fields.commentable"
//     source="commentable"
//     defaultValue
//   />,
// ];

// // const exporter = (posts) => {
// //   const data = posts.map((post) => ({
// //     ...post,
// //     backlinks: lodashGet(post, "backlinks", []).map((backlink) => backlink.url),
// //   }));
// //   return jsonExport(data, (err, csv) => downloadCSV(csv, "posts"));
// // };

// const OrderListMobileActions = () => (
//   <TopToolbar>
//     <FilterButton />
//     <CreateButton />
//     <ExportButton />
//   </TopToolbar>
// );

// // const OrderListMobile = () => (
// //   <InfiniteList
// //     filters={postFilter}
// //     sort={{ field: "published_at", order: "DESC" }}
// //     exporter={exporter}
// //     actions={<OrderListMobileActions />}
// //   >
// //     <SimpleList
// //       primaryText={(record) => record.title}
// //       secondaryText={(record) => `${record.views} views`}
// //       tertiaryText={(record) =>
// //         new Date(record.published_at).toLocaleDateString()
// //       }
// //     />
// //   </InfiniteList>
// // );

// const StyledDatagrid = styled(DatagridConfigurable)(({ theme }) => ({
//   "& .title": {
//     maxWidth: "16em",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   },
//   "& .hiddenOnSmallScreens": {
//     [theme.breakpoints.down("lg")]: {
//       display: "none",
//     },
//   },
//   "& .column-tags": {
//     minWidth: "9em",
//   },
//   "& .publishedAt": { fontStyle: "italic" },
// }));

// const OrderListBulkActions = memo(
//   ({
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     children,
//     ...props
//   }) => (
//     <Fragment>
//       {/* <ResetViewsButton {...props} /> */}
//       <BulkDeleteButton {...props} />
//       <BulkExportButton {...props} />
//     </Fragment>
//   )
// );

// const OrderListActions = () => (
//   <TopToolbar>
//     <SelectColumnsButton />
//     <FilterButton />
//     <CreateButton />
//     <ExportButton />
//   </TopToolbar>
// );

// const OrderListActionToolbar = ({ children }) => (
//   <Box sx={{ alignItems: "center", display: "flex" }}>{children}</Box>
// );

// const rowClick = (_id, _resource, record) => {
//   if (record.commentable) {
//     return "edit";
//   }

//   return "show";
// };

// const PostPanel = ({ record }) => (
//   <div dangerouslySetInnerHTML={{ __html: record.body }} />
// );

// const tagSort = { field: "name.en", order: "ASC" };

// const OrderListDesktop = () => (
//   <List
//     filters={postFilter}
//     sort={{ field: "published_at", order: "DESC" }}
//     exporter={exporter}
//     actions={<OrderListActions />}
//   >
//     <StyledDatagrid
//       bulkActionButtons={<OrderListBulkActions />}
//       rowClick={rowClick}
//       expand={PostPanel}
//       omit={["average_note"]}
//     >
//       <TextField source="id" />
//       <TextField source="title" cellClassName="title" />
//       <DateField
//         source="published_at"
//         sortByOrder="DESC"
//         cellClassName="publishedAt"
//       />
//       <ReferenceManyCount
//         label="resources.posts.fields.nb_comments"
//         reference="comments"
//         target="post_id"
//         link
//       />
//       <BooleanField
//         source="commentable"
//         label="resources.posts.fields.commentable_short"
//         sortable={false}
//       />
//       <NumberField source="views" sortByOrder="DESC" />
//       <ReferenceArrayField
//         label="Tags"
//         reference="tags"
//         source="tags"
//         sortBy="tags.name"
//         sort={tagSort}
//         cellClassName="hiddenOnSmallScreens"
//         headerClassName="hiddenOnSmallScreens"
//       >
//         <SingleFieldList sx={{ my: -2 }}>
//           <ChipField source="name.en" size="small" />
//         </SingleFieldList>
//       </ReferenceArrayField>
//       <NumberField source="average_note" />
//       <OrderListActionToolbar>
//         <EditButton />
//         <ShowButton />
//       </OrderListActionToolbar>
//     </StyledDatagrid>
//   </List>
// );

import { List, Pagination } from "react-admin";
import Container from "../../common/Container";
import OrderHeading from "../../common/OrderHeading";
import OrderListFilter from "./Filters";

import Table from "./Table";

const OrderList = () => {
  return (
    <Container>
      <div className="h-full w-[95vw] bg-white overflow-y-auto hidden-scrollbar border border-gray-200 rounded-md p-3 md:p-8">
        <OrderHeading />
        <OrderListFilter />

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
  );
};

export default OrderList;
