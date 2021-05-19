import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import AppLoding from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import { Alert, Text } from "react-native";

import Item from "../markets/Item";
import { ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.actionBackgroundColor};
  padding: 10px 20px 10px 20px;
`;

const WachlistItem = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.background};
  height: 120px;
  justify-content: center;
`;

const WatchlistTitle = styled.Text`
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const WatchlistIcon = styled.View`
  position: absolute;
  right: 40px;
  top: 20px;
`;

const WatchlistContent = styled.Text`
  width: 50%;
  margin-left: 15px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const { spinner } = useContext(ProgressContext);

  const theme = useContext(ThemeContext);

  const _watchlist = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      const id = await getItemFromAsync("id");
      const response = await fetch(
        `https://idu-market.shop:9800/api/watchlist/${id}`,
        config
      );
      const json = await response.json();
      json.success ? setWatchlist(json.watchLists) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  if (isReady) {
    return !watchlist.length ? (
      <Container>
        <WachlistItem>
          <WatchlistTitle> 아이두 </WatchlistTitle>
          <WatchlistIcon>
            <Text style={{ fontSize: 50 }}>📚</Text>
          </WatchlistIcon>
          <WatchlistContent>아직 찜한 목록이 없어유 ~</WatchlistContent>
          <WatchlistContent>마음에 드는 상품을 찜해 봐요.</WatchlistContent>
        </WachlistItem>
      </Container>
    ) : (
      <Container>
        <Text style={{ fontWeight: "bold" }}> 내가 찜한 목록 </Text>
        <FlatList
          keyExtractor={(item) => `${item.num}`}
          data={watchlist}
          renderItem={({ item }) => <Item item={item} />}
          windowSize={3} // 렌더링 되는양을 조절
        />
      </Container>
    );
  }
  return (
    <AppLoding
      startAsync={_watchlist}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default Watchlist;
