import React, { useContext, useState, useEffect } from "react";
import FAB from "react-native-fab";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";

import AppLoding from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";

import { ProgressContext } from "../../../contexts";
import Item from "../../../components/markets/Item";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

function Board({ route, navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [boards, setBoards] = useState([]);

  const { spinner } = useContext(ProgressContext);
  const _loadBoards = async () => {
    try {
      spinner.start();

      const { category } = route.params;
      const { num } = route.params;

      console.log(category);
      console.log(num);
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}`,
        config
      );
      const json = await response.json();
      console.log(json);
      json.success ? setBoards(json.boards) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    _loadBoards();
  }, []);

  const _handleItemPress = (params) => {
    navigation.navigate("ViewDetail", params);
  };
  const _handleWritePress = (params) => {
    navigation.navigate("PostWrite", params);
  };

  return isReady ? (
    <Container>
      <FlatList
        keyExtractor={(item) => `${item.num}`}
        data={boards}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3} // 렌더링 되는양을 조절
      />
      <FAB
        buttonColor="#e84118"
        iconTextColor="#ffffff"
        onClickAction={_handleWritePress}
        visible={true}
        iconTextComponent={<MaterialIcons name="edit" />}
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loadBoards}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default Board;
