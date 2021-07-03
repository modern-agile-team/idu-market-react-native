import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import { ReadyContext } from "../../contexts";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 5px 10px 15px 10px;
  flex-direction: row;
`;

const ItemContainerRead = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  background: ${({ theme }) => theme.imageBackground};
  padding: 5px 10px 15px 10px;
  flex-direction: row;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const ItemRowContainer = styled.View`
  padding-top: 5px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ItemTitle = styled.Text`
  font-size: 15px;
`;

const ItemStudent = styled.Text`
  font-size: 12px;
  padding-left: 3px;
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
  position: absolute;
  bottom: 0px;
  right: 10px;
`;

const Item = React.memo(
  // 같은내용이 리렌더링되는것을 막아준다.
  ({ item, navigation, category, boardNum }) => {
    const [isReadFlag, setIsReadFlag] = useState(item.readFlag);
    const theme = useContext(ThemeContext);

    const _handleDetailViewPress = () => {
      navigation.navigate("DetailView", {
        boardNum: `1031`,
        category: `book`,
      });
      setIsReadFlag(true);
    };

    return isReadFlag ? (
      <Container>
        <ItemContainer onPress={_handleDetailViewPress}>
          <ItemTextContainer>
            <ItemRowContainer>
              <ItemTitle>{item.boardTitle}</ItemTitle>
            </ItemRowContainer>
            <ItemRowContainer>
              <MaterialIcons name="person" size={24} color={theme.listIcon} />
              <ItemStudent>{item.senderNickname}</ItemStudent>
            </ItemRowContainer>

            <ItemTime>{item.inDate}</ItemTime>
          </ItemTextContainer>
        </ItemContainer>
      </Container>
    ) : (
      <Container>
        <ItemContainerRead onPress={_handleDetailViewPress}>
          <ItemTextContainer>
            <ItemRowContainer>
              <ItemTitle>{item.boardTitle}</ItemTitle>
            </ItemRowContainer>
            <ItemRowContainer>
              <MaterialIcons name="person" size={24} color={theme.listIcon} />
              <ItemStudent>{item.senderNickname}</ItemStudent>
            </ItemRowContainer>

            <ItemTime>{item.inDate}</ItemTime>
          </ItemTextContainer>
        </ItemContainerRead>
      </Container>
    );
  }
);

export default Item;
