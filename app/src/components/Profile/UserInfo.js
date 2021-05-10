import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

const UserInfoText = styled.View`
  align-items: flex-start;
  width: 100%;
`;

const UserStudentId = styled.Text`
  font-weight: bold;
  font-size: 18;
`;

const UserEmail = styled.Text`
  font-size: 12;
  color: ${({ theme }) => theme.inputPlaceholder};
`;

const UserInfo = ({ studentId, email }) => {
  const theme = useContext(ThemeContext);

  return (
    <UserInfoText>
      <UserStudentId>{studentId}</UserStudentId>
      <UserEmail>{email}</UserEmail>
    </UserInfoText>
  );
};

export default UserInfo;
