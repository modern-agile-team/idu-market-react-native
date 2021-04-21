import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: { email: null, uid: null },
    dispatch: () => {},
});

// 이메일과 uid를 가진 객체(user)를 수정 가능한 dispatch함수를 value로 전달하는 컴포넌트
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ email, uid }) => {
        setUser({ email, uid });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
    
}

export { UserContext, UserProvider };