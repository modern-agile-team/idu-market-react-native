import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AppLoding from "expo-app-loading";
import { ProgressContext } from "../../contexts";

import Item from "./Item";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  padding-left: 20px;
`;

const ItemList = ({ hitSlop, onPress }) => {
  const [isReady, setIsReady] = useState(false);
  const [boards, setBoards] = useState([]);

  const { spinner } = useContext(ProgressContext);

  const _loadBoards = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      const response = await fetch(
        "http://13.125.55.135:9800/api/boards/book?lastNum=0",
        config
      );
      const json = await response.json();
      json.success ? setBoards(json.boards) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("로그인 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _makeItems = () => {
    const Items = boards.map((board) => {
      return (
        <Item
          key={board.num}
          hitSlop={hitSlop}
          onPress={onPress}
          imgUrl={board.thumbnail}
          itemTitle={board.title}
          studentId={board.studentId}
          commentCount={board.commentCount}
        />
      );
    });

    return Items;
  };

  useEffect(() => {
    _loadBoards();
  }, []);

  return isReady ? (
    <ScrollView>{_makeItems()}</ScrollView>
  ) : (
    <AppLoding
      startAsync={_loadBoards}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default ItemList;
