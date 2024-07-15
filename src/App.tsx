import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Admin,
  CustomRoutes,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import Landing from "./landing";
import theme from "./theme/Theme";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsandConditions from "./TermsandConditions";

export const App = () => (
  <BrowserRouter>
    <Admin requireAuth={false} dashboard={Landing} theme={theme}>
      <CustomRoutes noLayout={true}>
        <Route path="/" element={<Landing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsandConditions />} />
      </CustomRoutes>
    </Admin>
  </BrowserRouter>
);
