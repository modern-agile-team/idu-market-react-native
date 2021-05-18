import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, Text } from "react-native";
import AppLoading from "expo-app-loading";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProgressContext, ReadyContext } from "../../contexts";
import ProfileInfo from "../../components/profiles/ProfileInfo";
import Watchlist from "../../components/profiles/Watchlist";
import ProfileInformationContainer from "../../components/profiles/ProfileInfomationContainer";
import ActionButtonContainer from "../../components/profiles/ActionButtonContainer";
import { getItemFromAsync } from "../../utils/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
`;

const LoginQuestion = styled.View`
  position: absolute;
  top: 60px;
  align-items: center;
`;

const GoLoginScreenButton = styled.Pressable`
  background-color: ${({ theme }) => theme.boardsButton};
  margin-top: 40px;
  padding: 10px;
  border-radius: 10px;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  border: 1px;
  position: absolute;
  right: 10px;
  top: 50px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
`;

const Profile = ({ navigation }) => {
  const [isLogined, setIsLogined] = useState(false);
  const [profile, setProfile] = useState({});

  const { isReady, readyDispatch } = useContext(ReadyContext);
  const { spinner } = useContext(ProgressContext);

  const theme = useContext(ThemeContext);

  const _profileInfo = async () => {
    try {
      spinner.start();
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };
      const id = await getItemFromAsync("id");
      if (id.length) {
        const response = await fetch(
          `http://13.125.55.135:9800/api/students/${id}`,
          config
        );

        const json = await response.json();
        if (json.success) {
          setIsLogined(true);
          setProfile({ ...profile, ...json.profile });
        } else {
          setIsLogined(false);
          Alert("서버에서 프로필 정보를 불러올 수 없습니다.");
        }
      } else {
        setIsLogined(false);
      }
    } catch (e) {
      // Alert.alert("정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      spinner.stop();
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("id");
    setIsLogined(false);
  };

  const _handleGoLoginScreenBtnPress = async () => {
    navigation.navigate("Login");
  };

  const profileInfo = () => {
    console.log("profile in profileInfo() : ", profile);
    return <ProfileInfo id={profile.id} email={profile.email} />;
  };

  // const _handlePurchaseList = async () => {
  //   navigation.navigate("PurchaseList");
  // };

  if (isReady) {
    return (
      <>
        {isLogined ? (
          <Container>
            <ProfileInformationContainer profileInfo={profileInfo} />
            <LogoutButton onPress={_handleLogoutButtonPress}>
              <Text style={{ color: "#222" }}> 로그아웃 </Text>
            </LogoutButton>
            <ActionButtonContainer iconSize={30} navigation={navigation} />
            <Watchlist />
          </Container>
        ) : (
          <Container>
            <LoginQuestion>
              <Text>로그인을 하신 후에 볼 수 있습니다</Text>
              <Text>로그인 하시겠습니까?</Text>
              <GoLoginScreenButton>
                <Text
                  style={{ color: "#fff", fontWeight: "bold" }}
                  onPress={_handleGoLoginScreenBtnPress}
                >
                  로그인 하러가기
                </Text>
              </GoLoginScreenButton>
            </LoginQuestion>
          </Container>
        )}
      </>
    );
  }
  return (
    <AppLoading
      startAsync={_profileInfo}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
};

export default Profile;
