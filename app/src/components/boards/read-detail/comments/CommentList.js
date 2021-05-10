import React from "react";
import { FlatList } from "react-native-gesture-handler";

import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <Comment comment={item} />}
      keyExtractor={(item) => item.num}
      windowSize={3} //렌더링 되는양을 조절
    />
  );
};

export default CommentList;
