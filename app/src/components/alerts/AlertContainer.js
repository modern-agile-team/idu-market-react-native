import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import AppLoding from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import { Alert, Text } from "react-native";

import Item from "./Item";
import { ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.imageBackground};
  padding: 0px;
`;

const Watchlist = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { spinner } = useContext(ProgressContext);

  const _notificationsInfo = async () => {
    try {
      spinner.start();
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export default Watchlist;
