import React from "react";
import styled from "styled-components/native";

import Topic from "./Topic";
import ItemList from "./ItemList";

const Container = styled.View`
  flex: 1;
`;

const MarketContainer = ({
  topicTitle,
  topicFontSize,
  hitSlop,
  topicOnPress,
  itemOnPress,
}) => {
  return (
    <Container>
      <Topic
        title={topicTitle}
        fontSize={topicFontSize}
        hitSlop={hitSlop}
        onPress={topicOnPress}
      />
      <ItemList hitSlop={hitSlop} onPress={itemOnPress} />
    </Container>
  );
};

export default MarketContainer;
