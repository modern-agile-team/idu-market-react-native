import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from "../components";
import { Alert, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../utils/images';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

const PostTitle = styled.TextInput`
  border-bottom-width: 1px;
  width:100%;
  font-size: 20px;
  margin-top: 20px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PostBtn = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.boardsButton};
    position: absolute;
    right: 20px;
    margin-top: 10px;
    padding: 5px;
    border-radius: 10px;
`;

const PostContent = styled.TextInput`
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-top: 40px;
  padding-bottom: 10px;
`;

const PostImageContainer = styled.View`
  position: absolute;
  left: 15px;
  bottom: 0px;
  align-items:flex-start;
`;


function PostWrite({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photoUrl, setPhotoUrl] = useState(images.photo);

  const contentRef = useRef();
    
  const _handlePostBtnPress = params => {
    Alert.alert(
      "", // 제목
      "등록 하시겠습니까?", // 부제목
      [  // 버튼 배열
        {
          text: "예",
          onPress: _handleAlertOkPress,
          style: "cancel",
        },
        {
          text: "아니요",
          onPress: () => Alert.alert("취소 되었습니다"),
          style: "cancel",
        },
      ],
      {
        cancelable: true, 
      }
    )
  }

  const _handleAlertOkPress = () => {
    Alert.alert("등록 되었습니다")
    navigation.navigate('ViewDetail')
  } 

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <PostBtn 
          onPress={_handlePostBtnPress}
        >
          <Text style={{ color:"#fff" }}>등록</Text>
        </PostBtn>
        <PostTitle 
          onChangeText={text => setTitle(text)}
          placeholder="제목"
          returnKeyType="next"
          onSubmitEditing={() =>  contentRef.current.focus()}
        />
        <PostContent
          multiline 
          ref={contentRef}
          onChangeText={text => setContent(text)}
          placeholder="내용을 입력해주세요"
          returnKeyType="done"
        />
        <PostImageContainer>
          <Image
            url={photoUrl}
            showButton
            onChangeImage = {url => setPhotoUrl(url)?.photoUrl ? setPhotoUrl(url) : "" }
          />
        </PostImageContainer>
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default PostWrite;