import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 12px;
`;

const Title = styled.Text``;

const ContentTitle = ({ title, updateDate }) => {
  return (
    <Container>
      <Title
        style={{ fontSize: 25, fontFamily: "sans-serif", fontWeight: "bold" }}
      >
        {title}
      </Title>
      <Text style={{ fontSize: 12, color: "gray" }}>
        최근 수정일 {updateDate}
      </Text>
    </Container>
  );
};

export default ContentTitle;
