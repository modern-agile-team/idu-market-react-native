import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

import MarketContainer from "../components/Main/MarketContainer";

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
        <MarketContainer
          topicTitle={"📚 교재"}
          topicFontSize={26}
          hitSlop={10}
          topicOnPress={() => navigation.navigate("Market")}
          itemOnPress={() => navigation.navigate("Market")}
        />
      </ScrollView>
    </Container>
  );
};

export default Main;
