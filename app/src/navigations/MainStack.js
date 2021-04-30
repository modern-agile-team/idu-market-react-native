import React, { useContext } from "react";
import { ThemeContext, DrawerButton } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Markets, NoticeBoard , ViewDetail, PostWrite } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

function MainStack() {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitle: "IDU",
        headerTintColor: theme.headerTintColor,
        headerBackTitleVisible: false,
        headerStyle: {
          height: 80,
          borderBottomWidth: 2,
          borderBottomColor: theme.headerBottomColor,
        },
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerRight: ({ tintColor }) => (
          <MaterialIcons
            name="notifications-none"
            size={30}
            style={{ marginRight: 11 }}
            color={theme.headerIconColor}
            onPress={() => alert("준비중인 서비스입니다.")}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{
          headerTitle: "🐳 아이두",
          headerTitleStyle: {
            color: theme.headerTintColor,
            fontSize: 24,
            fontWeight: "bold",
          },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen name="ViewDetail" component={ViewDetail}/>
      <Stack.Screen name="PostWrite" component={PostWrite} />
      <Stack.Screen name="Markets" component={Markets} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
    </Stack.Navigator>
  );
}

export default MainStack;
