import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
// To be able to use (or travel with) the current user anywhere in the app.
// We will wrap the childern (all the app components) with the auth provide r

const AuthContext = React.createContext();

// Another function that allows us to use this auth (line 5) everywhere in the app
export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    // Signup function that takes two arguments (email & password) and use the auth module from firebase.js
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        /* This Firebase's function is a listener for any authentication status changes the onAuthStateChanged function will be fired, 
           the user parameter can be the current user or null (by default). Also, the unsubscribe will make sure to unsubscribe us from
           the listener after the user signed up (prevent this function to run over and over). */   
        const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            // console.log('CURRENT USER: ', user);
            }); 

        return unsubscribe    
    }, [])
    

    const value = {
        currentUser,
        signup
    }

    return (
        // Passing "value" that contains object with auth informantion 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
