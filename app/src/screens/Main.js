import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

import { MarketContainer } from "../components";
import { LinearContainer } from "../components";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Main = ({ navigation }) => {
  return (
    <Container>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <LinearContainer
          category={"notice"}
          topicTitle={"📌 공지"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() => navigation.navigate("Market")}
          itemOnPress={() => navigation.navigate("DetailView")}
        />
        <MarketContainer
          category={"book"}
          topicTitle={"📚 교재"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() =>
            navigation.navigate("Market", {
              category: "book",
            })
          }
          itemOnPress={() => navigation.navigate("DetailView")}
        />
        <MarketContainer
          category={"device"}
          topicTitle={"💻 IT기기"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() =>
            navigation.navigate("Markets", {
              category: "device",
            })
          }
          itemOnPress={() => navigation.navigate("DetailView")}
        />
        <MarketContainer
          category={"clothes"}
          topicTitle={"🧶 의류"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() =>
            navigation.navigate("Market", {
              category: "clothes",
            })
          }
          itemOnPress={() => navigation.navigate("DetailView")}
        />
      </ScrollView>
    </Container>
  );
};

export default Main;
