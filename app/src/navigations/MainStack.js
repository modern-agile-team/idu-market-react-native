import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import MainTab from "./MainTab";
import {
  Main,
  Market,
  NoticeBoard,
  DetailView,
  PostWrite,
  Login,
  Signup,
  Find,
  PurchaseList,
  SaleList,
  ProfileUpdate,
  Inquiry,
  DetailComment,
  PostUpdate,
  Chat,
} from "../screens";

const Stack = createStackNavigator();

const AlertContainer = styled.TouchableOpacity`
  width: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 2px;
  border-color: ${({ theme }) => theme.headerIconColor};
  border-radius: 30px;
`;

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
          borderBottomColor: theme.boardsButton,
        },

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
      <Stack.Screen
        name="DetailView"
        component={DetailView}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
      <Stack.Screen name="PostWrite" component={PostWrite} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
      <Stack.Screen name="PurchaseList" component={PurchaseList} />
      <Stack.Screen name="SaleList" component={SaleList} />
      <Stack.Screen name="PostUpdate" component={PostUpdate} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      <Stack.Screen name="Inquiry" component={Inquiry} />
      <Stack.Screen name="DetailComment" component={DetailComment} />
      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        // 회원가입화면 뒤로가기 버튼 제거
        options={{ headerBackTitleVisible: false, title: "회원가입" }}
      />
      <Stack.Screen name="Find" component={Find} />
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
