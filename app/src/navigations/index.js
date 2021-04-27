import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from "../components";
import { ProgressContext, UserContext } from "../contexts";
import MainStack from "./MainStack";

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const { user } = useContext(UserContext);
  //   user?.uid && user?.email ? (
  //     <NavigationContainer>
  //       <AuthStack />
  //       {inProgress && <Spinner />}
  //     </NavigationContainer>
  //   ) :
  return (
    <NavigationContainer>
      <AuthStack />
      {inProgress && <Spinner />}
    </NavigationContainer>
    //inporgress 가 초깃값이 false이므로 spinner컴포넌트가 초기에 나타나지 않는다.
  );
};

export default Navigation;
