import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import { Loading, useAuthState, useRedirect } from "react-admin";
import { OnboardScreen } from "../../components";

const Home = () => {
  const { isLoading, authenticated, user } = useAuthState();
  const redirect = useRedirect();

  useEffect(() => {
    if (!authenticated) {
      redirect("/onboard");
    }
    if (authenticated) {
      redirect("/dashboard");
    }
  }, [authenticated]);

  if (isLoading) {
    return <Slider />;
    // return <OnboardScreen />;
  }

  // return <OnboardScreen />;
  return <Slider />;
};

export default Home;
