import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            setCurrentUser(userAuth);
            setLoading(false);
            if (userAuth) history.push('/chats');

        })
    }, [currentUser, history])

    const value = { currentUser };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}