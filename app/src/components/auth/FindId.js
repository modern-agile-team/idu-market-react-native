import React, { useContext, useState, useEffect, useRef } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

function FindId() {
  return (
    <Container>
      <Text>Find Id</Text>
    </Container>
  );
}

export default FindId;
