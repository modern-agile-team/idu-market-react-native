import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const Container = styled.Pressable`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  font-family: BM_HANNA_PRO;
`;

const Topic = ({ title, fontSize, hitSlop, onPress }) => {
  return (
    <Container hitSlop={hitSlop} onPress={onPress}>
      <Title fontSize={fontSize}>{title}</Title>
      <AntDesign name="right" size={fontSize} color="black" />
    </Container>
  );
};

export default Topic;
