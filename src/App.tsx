import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import Landing from "./landing";
import { Route } from "react-router";
import theme from "./theme/Theme";

export const App = () => (
  <Admin requireAuth={false} dashboard={Landing} theme={theme}>
    <CustomRoutes noLayout={true}>
      <Route path="/" element={<Landing />} />
    </CustomRoutes>
  </Admin>
);
