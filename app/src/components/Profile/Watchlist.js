import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AppLoding from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";

import WatchlistItem from "../Markets/WatchlistItem";
import { ProgressContext } from "../../contexts";

const WachlistItemContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.background};
  height: 120px;
  justify-content: center;
`;

const WatchlistTitle = styled.Text`
  font-size: 20px;
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
      //watchlist/202116714
      const response = await fetch(
        "http://13.125.55.135:9800/api/watchlist/202116714",
        config
      );
      const json = await response.json();
      json.success ? setWatchlist(json.boards) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  if (isReady) {
    return (
      // <WachlistItemContainer>
      //   <WatchlistTitle>  아이두 </WatchlistTitle>
      //   <WatchlistIcon><Text style={{fontSize:50}}>📚</Text></WatchlistIcon>
      //   <WatchlistContent> 아직 찜한 목록이 없어유 ~      마음에 드는 상품을 찜해 보아요.</WatchlistContent>
      // </WachlistItemContainer>

      <FlatList
        keyExtractor={(item) => `${item.num}`}
        data={watchlist}
        renderItem={({ item }) => <WatchlistItem item={item} />}
        windowSize={3} // 렌더링 되는양을 조절
      />
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
