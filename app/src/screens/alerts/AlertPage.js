import React from "react";
import styled, { ThemeContext } from "styled-components/native";

import AlertContainer from "../../components/alerts/AlertContainer";

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
`;

function AlertPage({ navigation }) {
  return (
    <Container>
      <AlertContainer navigation={navigation} />
    </Container>
  );
}

export default AlertPage;
