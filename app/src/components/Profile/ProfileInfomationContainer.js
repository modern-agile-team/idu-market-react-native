import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

import { logout } from "../../utils/firebase";

const Container = styled.View`
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const StudentSetting = styled.View`
  position: absolute;
  right: 20px;
  top: 5px;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  border: 1px;
  position: absolute;
  right: 10px;
  top: 30px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
`;

const ProfileInformationContainer = ({ profileInfo }) => {
  const theme = useContext(ThemeContext);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };

  return (
    <Container>
      <MaterialIcons name="person" size={80} color={theme.listIcon} />
      <>{profileInfo()}</>
      <StudentSetting>
        <Ionicons name="settings-outline" size={24} color={theme.listIcon} />
      </StudentSetting>
      <LogoutButton onPress={_handleLogoutButtonPress}>
        <Text style={{ color: "#222" }}> 로그아웃 </Text>
      </LogoutButton>
    </Container>
  );
};

export default ProfileInformationContainer;
