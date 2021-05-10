import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import InputContainer from "../../../../components/boards/read-detail/comments/InputContainer";
import CommentList from "../../../../components/boards/read-detail/comments/CommentList";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding: 12px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.imageButtonBackground};
`;

const CommentContainer = ({ comments }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Label>댓글</Label>
      <InputContainer isReply={false} placeholder={"댓글을 입력해주세요."} />
      <CommentList comments={comments} />
    </Container>
  );
};

export default CommentContainer;
