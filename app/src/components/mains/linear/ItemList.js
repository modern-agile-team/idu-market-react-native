import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";
import { ProgressContext, ReadyContext } from "../../../contexts";
import { REACT_NATIVE_API_KEY } from "@env";

import Item from "./Item";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))`
  padding: 0 20px 0 20px;
`;

const ItemList = ({ category, hitSlop, onPress }) => {
  const [boards, setBoards] = useState([]);

  const { spinner } = useContext(ProgressContext);
  const { isReady, readyDispatch } = useContext(ReadyContext);

  const _loadBoards = async () => {
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

      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}?lastNum=0`,
        config
      );
      const json = await response.json();
      json.success ? setBoards(json.boards) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
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
          itemTitle={board.title}
          nickname={board.nickname}
          commentCount={board.commentCount}
          hit={board.hit}
        />
      );
    });

    return Items;
  };

  return isReady ? (
    <ScrollView>{_makeItems()}</ScrollView>
  ) : (
    <AppLoading
      startAsync={_loadBoards}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
};

export default ItemList;
