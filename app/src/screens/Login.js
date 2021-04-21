import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Input, Btn } from '../components';
import { checkStudent, removeWhitespace, validateEmail } from '../utils/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, Text } from 'react-native';
import { login } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

const IdPasswordBtn = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.background};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

function Login({ navigation }) {
    const { spinner } = useContext(ProgressContext);
    const { dispatch } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);
    
    // password input focus
    const passwordRef = useRef();
    
    // const _handleStudentChange = student => {
    //     //공백제거 형식체크
    //     const changedStudent = removeWhitespace(student);
    //     setStudent(changedStudent);
    //     setErrorMessage(
    //         checkStudent(changedStudent) ? '' : '학번 형식을 지켜주세요'
    //     )
    // }

    const _handleStudentChange = email => {
        //공백제거 형식체크
        const changedStudent = removeWhitespace(email);
        setEmail(changedStudent);
        setErrorMessage(
            validateEmail(changedStudent) ? '' : '학번 형식을 지켜주세요'
        )
    }

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = async () => {
        try {
          spinner.start();
          const user = await login({ email, password });
        // 유저 이메일,패스워드를 스토어에전달
          dispatch(user);
          Alert.alert('로그인 성공')
        } catch (e) {
          Alert.alert('로그인 실패', e.message);
        } finally {
          spinner.stop();
        }
    };

    return (
        //키보드 감추기 (인풋 클릭시 키보드가 가리는걸방지)
        <KeyboardAwareScrollView 
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
            <Container>
                {/* 320p */}
                <Text style={{fontSize: 30}}>Idu Market</Text>
                <Input
                    label="학번"
                    value={email}
                    onChangeText={_handleStudentChange}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="학번"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="비밀번호"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={() => {}}
                    placeholder="비밀번호"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="Login"
                    onPress={_handleLoginButtonPress}
                    disabled={disabled}
                />
                <Button
                    title="회원가입"
                    //navigate함수로 원하는 화면의 이름을 전달하여 이동한다.
                    onPress={() => navigation.navigate('Signup')}
                />
                <IdPasswordBtn>
                    <Btn
                        title="아이디찾기"
                        isFilled={false}
                        onPress={() => navigation.navigate('FindId')}
                    />
                    <Btn
                        title="비밀번호찾기"
                        isFilled={false}
                        onPress={() => navigation.navigate('FindPw')}
                    />
                </IdPasswordBtn>
                
    
                
            </Container>
        </KeyboardAwareScrollView>
    )
}


export default Login
