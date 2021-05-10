import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme, isReply }) =>
    isReply ? theme.greyBottomLine : theme.headerBottomColor};
`;

const Input = styled.TextInput`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 36px;
  padding-left: 10px;
`;

const InputButton = styled.Pressable.attrs({
  hitSlop: 10,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.boardsButton};
  border-radius: 30px;
`;

const InputContainer = ({ isReply, placeholder }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container isReply={isReply}>
      <Input
        onChangeText={(text) => setComment(text)}
        placeholder={placeholder}
        returnKeyType="done"
      />
      <InputButton>
        <MaterialIcons name="send" size={20} color={"#fff"} />
      </InputButton>
    </Container>
  );
};

export default InputContainer;
