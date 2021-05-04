import React, { useContext } from "react";
import { ThemeContext, DrawerButton } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Markets, NoticeBoard , ViewDetail, PostWrite } from "../screens";
import { Login, Signup, FindPw, FindId } from "../screens";
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
      <Stack.Screen
        name="FindId"
        component={FindId}
        options={{ title: "아이디 찾기" }}
      />
      <Stack.Screen
        name="FindPw"
        component={FindPw}
        options={{ title: "비밀번호 찾기" }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
