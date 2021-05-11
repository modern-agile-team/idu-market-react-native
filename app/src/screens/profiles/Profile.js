import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { StudentContext, ProgressContext } from "../../contexts";
import { Alert, Text } from "react-native";
import AppLoading from "expo-app-loading";

import ProfileInfo from "../../components/Profile/ProfileInfo";
import Watchlist from "../../components/Profile/Watchlist";
import ProfileInformationContainer from "../../components/Profile/ProfileInfomationContainer";
import ActionButtonContainer from "../../components/Profile/ActionButtonContainer";
import { getItemFromAsync, setItemToAsync } from "../../utils/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
`;

const WatchlistContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.actionBackgroundColor};
  padding: 10px 20px 10px 20px;
`;

const LoginQuestion = styled.View`
  position: absolute;
  top: 60px;
  align-items: center;
`;

const GoLoginScreenButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  margin-top: 40px;
  padding: 10px;
  border-radius: 10px;
`;

const Profile = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [profile, setProfile] = useState({});

  const { dispatch } = useContext(StudentContext);
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
      const id = JSON.parse(await getItemFromAsync("id"));
      console.log("student id in AppLoding", id);
      if (id.length) {
        const response = await fetch(
          `http://13.125.55.135:9800/api/students/${id}`,
          config
        );

        const json = await response.json();
        console.log("json : ", json);
        console.log("profile : ", json.profile);
        if (json.success) {
          console.log("success : ", json.success);
          console.log("setedProfile : ", { ...profile, ...json.profile });
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

  const _handleGoLoginScreenBtnPress = async () => {
    navigation.navigate("Login");
  };

  const profileInfo = () => {
    console.log("profile in profileInfo() : ", profile);
    return <ProfileInfo id={profile.id} email={profile.email} />;
  };

  if (isReady) {
    return (
      <>
        {isLogined ? (
          <Container>
            <ProfileInformationContainer profileInfo={profileInfo} />
            <ActionButtonContainer iconSize={30} />
            <WatchlistContainer>
              <Text style={{ fontWeight: "bold" }}> 내가 찜한 목록 </Text>
              <Watchlist />
            </WatchlistContainer>
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
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default Profile;
