import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import AppLoding from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import { Alert, Text } from "react-native";
import { REACT_NATIVE_API_KEY } from "@env";

import Item from "./Item";
import { ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.imageBackground};
  padding: 0px;
`;

const AlertContainer = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { spinner } = useContext(ProgressContext);

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const _notificationsInfo = async () => {
    try {
      spinner.start();
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": REACT_NATIVE_API_KEY,
        },
      };
      const id = await getItemFromAsync("id");
      const response = await fetch(
        `https://idu-market.shop:9800/api/notification/${id}`,
        config
      );

      const json = await response.json();
      if (json.success) {
        setNotifications([...notifications, ...json.notifications]);
        console.log(json.notifications);
      } else {
        Alert("서버에서 프로필 정보를 불러올 수 없습니다.");
      }
    } catch (e) {
    } finally {
      spinner.stop();
    }
  };

  if (isReady) {
    return (
      <Container>
        <FlatList
          data={notifications}
          keyExtractor={(item) => String(item.notificationNum)}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} />
          )}
          windowSize={3} // 렌더링 되는양을 조절
        />
      </Container>
    );
  }
  return (
    <AppLoding
      startAsync={_notificationsInfo}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default AlertContainer;
