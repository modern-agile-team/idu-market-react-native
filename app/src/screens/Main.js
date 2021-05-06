import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

import MarketContainer from "../components/mains/market/MarketContainer";
import LinearContainer from "../components/mains/linear/LinearContainer";

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
          topicOnPress={() => navigation.navigate("Markets")}
          itemOnPress={() => navigation.navigate("ViewDetail")}
        />
        <MarketContainer
          category={"book"}
          topicTitle={"📚 교재"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() =>
            navigation.navigate("Markets", {
              category: "book",
            })
          }
          itemOnPress={() => navigation.navigate("ViewDetail")}
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
          itemOnPress={() => navigation.navigate("ViewDetail")}
        />
        <MarketContainer
          category={"clothes"}
          topicTitle={"🧶 의류"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() =>
            navigation.navigate("Markets", {
              category: "clothes",
            })
          }
          itemOnPress={() => navigation.navigate("ViewDetail")}
        />
      </ScrollView>
    </Container>
  );
};

export default Main;
