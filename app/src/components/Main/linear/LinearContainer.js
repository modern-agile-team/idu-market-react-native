import React from "react";
import styled from "styled-components/native";

import Topic from "../Topic";
import ItemList from "./ItemList";

const Container = styled.View`
  flex: 1;
`;

const LinearContainer = ({
  category,
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
      <ItemList category={category} hitSlop={hitSlop} onPress={itemOnPress} />
    </Container>
  );
};

export default LinearContainer;
