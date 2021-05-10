import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import Post from "./posts/Post";
import CommentContainer from "./comments/CommentContainer";

const Container = styled.View``;

const PostContainer = ({ board, comments }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Post board={board} />
      <CommentContainer comments={comments} />
    </Container>
  );
};

export default PostContainer;
