import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const SaleList = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
`;

const PurchaseList = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
`;

const WritenMe = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 18px;
  margin-left: 3px;
`;

const ActionButtonContainer = ({ iconSize }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <SaleList>
        <AntDesign
          name="barcode"
          size={iconSize}
          color={theme.tabInactiveColor}
        />
        <Text style={{ position: "absolute", bottom: 5 }}>판매목록</Text>
      </SaleList>
      <PurchaseList>
        <EvilIcons
          name="cart"
          size={iconSize + 10}
          color={theme.tabInactiveColor}
        />
        <Text style={{ position: "absolute", bottom: 5 }}>구매목록</Text>
      </PurchaseList>
      <WritenMe>
        <FontAwesome
          name="pencil-square-o"
          size={iconSize}
          color={theme.tabInactiveColor}
        />
        <Text style={{ position: "absolute", bottom: 5, marginRight: 14 }}>
          내가 쓴글
        </Text>
      </WritenMe>
    </Container>
  );
};

export default ActionButtonContainer;
