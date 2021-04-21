import React from 'react'
import styled from 'styled-components/native';
import { Image, Text, Linking, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    margin: 0;
    padding: 0;
`;
const Actions = styled.SafeAreaView`
    flex-direction: row;
    justify-content:center;
    align-items: center;
    width: 100%;
    height: 160px;
    background-color: ${({ theme }) => theme.actionsbgc};
`;

const ActionsCircle = styled.TouchableOpacity`
    width: 25%;
    height: 100px;
    margin: 10px;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.actionscircle};
`;

function Main({ navigation }) {
    return (
            <Container>
                <Image
                    style={{height: '65%', width: '100%' , resizeMode: 'contain',}}
                    source={require('./idu2.jpg')}
                />
                <Actions>
                    <ActionsCircle 
                        onPress={() => navigation.navigate('Markets')}
                    >
                        <MaterialIcons
                            name="local-grocery-store"
                            size={70}
                            style={{ marginLeft: 18, marginTop: 14}}
                            color= {"#ffffff"}
                        />
                        <Text style={{ fontSize:15, marginLeft: 35, marginTop: 16, fontWeight:'bold'}}>장터</Text>
                    </ActionsCircle>

                    <ActionsCircle 
                        onPress={() => navigation.navigate('Boards')}
                    >
                        <MaterialIcons
                            name="group"
                            size={80}
                            style={{ marginLeft: 11, marginTop: 7}}
                            color= {"#ffffff"}
                        />
                        <Text style={{ fontSize:15, marginLeft: 33, marginTop: 16, fontWeight:'bold'}}>게시판</Text>
                    </ActionsCircle>

                    <ActionsCircle
                    onPress={() => Linking.openURL('https://portal.induk.ac.kr/')}
                    >
                        <MaterialIcons
                            name="school"
                            size={80}
                            style={{ marginLeft: 11, marginTop: 7}}
                            color= {"#ffffff"}
                        />
                        <Text style={{ fontSize:15, marginLeft: 25, marginTop: 16, fontWeight:'bold'}}>학교정보</Text>
                    </ActionsCircle>
                </Actions>
            </Container>
    )
}

export default Main
