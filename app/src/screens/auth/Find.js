import React, { useContext, useState, useEffect, useRef } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { Input } from "../../components";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const FindItemContainer = styled.Pressable``;

function Find() {
  return (
    <Container>
      <FindItemContainer>
        <Text>아이디 찾기</Text>
        <Text>아이디 찾기</Text>
      </FindItemContainer>
    </Container>
  );
}

export default Find;
