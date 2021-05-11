import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProgressContext } from "../../contexts";

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

// const LogoutButton = styled.TouchableOpacity`
//   background-color: ${({ theme }) => theme.background};
//   border: 1px;
//   position: absolute;
//   right: 10px;
//   top: 30px;
//   margin-top: 10px;
//   padding: 5px;
//   border-radius: 10px;
// `;

const ProfileInformationContainer = ({ profileInfo }) => {
  const theme = useContext(ThemeContext);

  const { spinner } = useContext(ProgressContext);

  // const _handleLogoutButtonPress = async () => {
  //   try {
  //     spinner.start();
  //     console.log(logout());
  //     logout();
  //   } catch (e) {
  //     console.log("[Profile] logout: ", e.message);
  //   } finally {
  //     spinner.stop();
  //   }
  // };

  // const logout = () => {
  //   AsyncStorage.removeItem("id");
  // };

  return (
    <Container>
      <MaterialIcons name="person" size={80} color={theme.listIcon} />
      <>{profileInfo()}</>
      {/* <LogoutButton onPress={_handleLogoutButtonPress}>
        <Text style={{ color: "#222" }}> 로그아웃 </Text>
      </LogoutButton> */}
      <StudentSetting>
        <Ionicons name="settings-outline" size={24} color={theme.listIcon} />
      </StudentSetting>
    </Container>
  );
};

export default ProfileInformationContainer;
