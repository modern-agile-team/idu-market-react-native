import React, { useState, useContext } from "react";
import { ThemeContext, DrawerButton } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Markets, NoticeBoard, ViewDetail, PostWrite } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

import MainTab from "./MainTab";
// import * as Font from "../utils/font";
// 폰트
import * as Font from "expo-font";

const Stack = createStackNavigator();

const MainStack = () => {
  const [isFontReady, setIsFontReady] = useState(false);
  const theme = useContext(ThemeContext);

  async function _loadFonts() {
    await Font.loadAsync({
      BM_HANNA_PRO: require("../../assets/fonts/BMHANNAPro.ttf"),
    });
  }

  return isFontReady ? (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitle: "IDU",
        headerTitleStyle: {
          fontFamily: "BM_HANNA_PRO",
        },
        headerTintColor: theme.headerTintColor,
        headerBackTitleVisible: false,
        headerStyle: {
          height: 80,
          borderBottomWidth: 1,
          borderBottomColor: theme.headerBottomColor,
        },
        headerRight: ({ tintColor }) => (
          <MaterialIcons
            name="notifications-none"
            size={30}
            style={{ marginRight: 11 }}
            color={theme.headerIconColor}
            onPress={() => alert("준비중인 서비스입니다.")}
          />
        ),
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{
          headerTitle: "아이두",
          headerTitleStyle: {
            color: theme.headerTintColor,
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "BM_HANNA_PRO",
          },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen name="ViewDetail" component={ViewDetail} />
      <Stack.Screen name="PostWrite" component={PostWrite} />
      <Stack.Screen name="Markets" component={Markets} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
    </Stack.Navigator>
  ) : (
    <AppLoading
      startAsync={_loadFonts}
      onFinish={() => setIsFontReady(true)}
      onError={console.error}
    />
  );
};

export default MainStack;
