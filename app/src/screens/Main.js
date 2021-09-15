import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, Text } from "react-native";

import Schedule from "./alerts/schedulePushNotification";
import { MarketContainer } from "../components";
import { LinearContainer } from "../components";
import { ReadyContext } from "../contexts";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;
const GoLoginScreenButton = styled.Pressable`
  background-color: ${({ theme }) => theme.boardsButton};
  margin-top: 40px;
  padding: 10px;
  border-radius: 10px;
`;

const Main = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  const _handleNoticeBoard = () => {
    readyDispatch.notReady();
    navigation.navigate("NoticeBoard");
  };
  const _handleBookMarket = () => {
    readyDispatch.notReady();
    navigation.navigate("Market", {
      category: "book",
    });
  };

  const _handleDeviceMarket = () => {
    readyDispatch.notReady();
    navigation.navigate("Market", {
      category: "device",
    });
  };

  const _handleClothesMarket = () => {
    readyDispatch.notReady();
    navigation.navigate("Market", {
      category: "clothes",
    });
  };
  const _handleChat = () => {
    navigation.navigate("Chat");
  };

  return (
    <Container>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <LinearContainer
          category={"notice"}
          topicTitle={"📌 공지"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={_handleNoticeBoard}
          itemOnPress={() => {
            navigation.navigate("DetailView"), Schedule.pushNotification();
          }}
        />
        <GoLoginScreenButton>
          <Text
            style={{ color: "#fff", fontWeight: "bold" }}
            onPress={_handleChat}
          >
            챗 하러가기
          </Text>
        </GoLoginScreenButton>
        <MarketContainer
          category={"book"}
          topicTitle={"📚 교재"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={_handleBookMarket}
          itemOnPress={() => navigation.navigate("DetailView")}
        />
        <MarketContainer
          category={"device"}
          topicTitle={"💻 IT기기"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={_handleDeviceMarket}
          itemOnPress={() => navigation.navigate("DetailView")}
        />
        <MarketContainer
          category={"clothes"}
          topicTitle={"🧶 의류"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={_handleClothesMarket}
          itemOnPress={() => navigation.navigate("DetailView")}
        />
      </ScrollView>
    </Container>
  );
};

export default Main;
