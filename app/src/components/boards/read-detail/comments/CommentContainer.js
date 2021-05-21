import React, { useState, useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding: 0px 10px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.imageButtonBackground};
`;

const InputContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;

  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.headerBottomColor};
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

const CommentContainer = () => {
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);

  const theme = useContext(ThemeContext);

  const _handleCommentChange = (comment) => {
    setComment(comment);
  };

  useEffect(() => {
    setDisabled(!comment);
  }, [comment]);

  return (
    <Container>
      <Label>댓글</Label>
      <InputContainer>
        <Input
          onChangeText={_handleCommentChange}
          placeholder="댓글을 입력해주세요"
          returnKeyType="done"
        />
        <InputButton>
          <MaterialIcons name="send" size={13} color={"#fff"} />
        </InputButton>
      </InputContainer>
    </Container>
  );
};

export default CommentContainer;
