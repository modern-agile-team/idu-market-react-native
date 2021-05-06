<<<<<<< HEAD:app/src/screens/Profile.js
import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { logout } from '../utils/firebase';
import { AntDesign, MaterialIcons, Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { UserContext, ProgressContext } from '../contexts';
import { Alert, Text } from 'react-native';
// import ProfileComponent from '../components/Profile/ProfileComponent'
=======
import React, { useContext } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { UserContext, ProgressContext } from "../../contexts";
import { Input } from "../../components";
import { logout } from "../../utils/firebase";
>>>>>>> develop:app/src/screens/profiles/Profile.js

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: flex-start;
  align-items: center;
  padding:0px;
`;

<<<<<<< HEAD:app/src/screens/Profile.js
const UserInformationContainer = styled.View`
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  flex-direction:row;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const UserInfoText = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;


const UserStudentId = styled.View`
`;

const UserEmail = styled.View`

`;

const UserSetting = styled.View`
  position: absolute;
  right: 20px;
  top: 5px;
`;
=======
const LoginQuestion = styled.View``;
>>>>>>> develop:app/src/screens/profiles/Profile.js

const LogoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  border:1px;
  position: absolute;
  right: 10px;
  top: 30px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
`;

const ActionButtonContainer = styled.View`
  width:100%;
  flex-direction: row;
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const SaleList = styled.TouchableOpacity`
  width:33%;
  justify-content:flex-start;
  align-items:center;
  margin-top: 15px;
`;

const PurchaseList = styled.TouchableOpacity`
  width:33%;
  justify-content:flex-start;
  align-items:center;
  margin-top: 15px;
`;

const WrtienMe = styled.TouchableOpacity`
  width:33%;
  justify-content:flex-start;
  align-items:center;
  margin-top: 18px;
`;

const WatchlistContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.actionBackgroundColor};
  padding: 10px;
`;

const WachlistItemContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.background};
  height: 120px;
  justify-content: center;
`;

const WatchlistTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const WatchlistIcon = styled.View`
  position: absolute;
  right: 40px;
  top: 20px;
`;

const WatchlistContent = styled.Text`
  width: 50%;
  margin-left: 15px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const LoginQuestion = styled.View`
  position: absolute;
  top:60px;
  align-items:center;
`;


const GoLoginScreenButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  margin-top: 40px;
  padding: 10px;
  border-radius: 10px;
`;

const Profile = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const theme = useContext(ThemeContext);
  const { user } = useContext(UserContext);


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

<<<<<<< HEAD:app/src/screens/Profile.js
  const _handleGoLoginScreenBtnPress = async () => {
    try{
      spinner.start();
      navigation.navigate("Login")
    } catch (e) {
      console.log(e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  }

  // 추후 프로필 컴포넌트 작성 후 사용.
  // const userInfo = () => {
  //   const Users = users.map((user) => {
  //     return (
  //       <ProfileComponent
  //         // key={board.num}
  //         studentId={user.studentId}
  //         Email={user.Email}
  //       />
  //     );
  //   });
  //   return Users;
  // };

=======
>>>>>>> develop:app/src/screens/profiles/Profile.js
  return (
    <>
      {user?.user ? (
        <Container>
          <UserInformationContainer>
            <MaterialIcons
                name="person"
                size={80}
                color={theme.listIcon}
            />
            <UserInfoText>
              <UserStudentId><Text style={{fontWeight:'bold', fontSize: 18}}>202012123</Text></UserStudentId>
              <UserEmail><Text style={{ fontSize: 12 , color:"#7f8c8d"}}>202012123@naver.com</Text></UserEmail>
            </UserInfoText>
            <UserSetting>
              <Ionicons 
                name="settings-outline" 
                size={24} 
                color={theme.listIcon}
              />
            </UserSetting>
            <LogoutButton
                onPress={_handleLogoutButtonPress}
            >
              <Text style={{ color:"#222" }}> 로그아웃 </Text>
            </LogoutButton>
          </UserInformationContainer>
          <ActionButtonContainer>
            <SaleList>
              <AntDesign name="barcode" size={30} color={theme.tabInactiveColor} />
              <Text style={{position:'absolute', bottom:5 }}>판매목록</Text>
            </SaleList>
            <PurchaseList>
              <EvilIcons name="cart" size={40} color={theme.tabInactiveColor}  />
              <Text style={{position:'absolute', bottom:5 }}>구매목록</Text>
            </PurchaseList>
            <WrtienMe>
              <FontAwesome name="pencil-square-o" size={30} color={theme.tabInactiveColor}  />
              <Text style={{position:'absolute', bottom:5, marginRight:14}}>내가 쓴글</Text>
            </WrtienMe>
          </ActionButtonContainer>
          <WatchlistContainer>
            <Text style={{fontWeight:'bold'}}> 내가 찜한 목록 </Text>
            <WachlistItemContainer>
              <WatchlistTitle>  아이두 </WatchlistTitle>
              <WatchlistIcon><Text style={{fontSize:50}}>📚</Text></WatchlistIcon>
              <WatchlistContent> 아직 찜한 목록이 없어유 ~      마음에 드는 상품을 찜해 보아요.</WatchlistContent>
            </WachlistItemContainer>
          </WatchlistContainer>
        </Container>
      ) : (
        <Container>
          <LoginQuestion>
            <Text>로그인을 하신 후에 볼 수 있습니다</Text>
            <Text>로그인 하시겠습니까?</Text>
<<<<<<< HEAD:app/src/screens/Profile.js
            <GoLoginScreenButton >
              <Text 
                style={{ color:"#fff", fontWeight:'bold' }}
                onPress={_handleGoLoginScreenBtnPress}
=======
          </LoginQuestion>
          <LoginQuestionBtnContainer>
            <GoLoginScreenButton>
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Login")}
>>>>>>> develop:app/src/screens/profiles/Profile.js
              >
                로그인 하러가기
              </Text>
            </GoLoginScreenButton>
<<<<<<< HEAD:app/src/screens/Profile.js
          </LoginQuestion>
        </Container> )}
=======
          </LoginQuestionBtnContainer>
        </Container>
      )}
>>>>>>> develop:app/src/screens/profiles/Profile.js
    </>
  );
};

export default Profile;
