import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

function FindPW() {
    return (
        <Container>
            <Text>Find PW</Text>
        </Container>
    )
}

export default FindPW
