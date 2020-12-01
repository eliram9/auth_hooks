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
    const [loading, setLoading] = useState(true); // If we have already a signed up user (from firebase local storage)

    // Signup function that takes two arguments (email & password) and use the auth module from firebase.js
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    // Login function same as the signup func.
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);  
    }

    // Logout function
    function logout() {
        return auth.signOut();
    }

    // Reset password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // Update Profile //
    // update email
    function updateEmail(email) {
        return auth.currentUser.updateEmail(email);
    }

    // update password
    function updatePassword(password) {
        return auth.currentUser.updatePassword(password);
    }


    useEffect(() => {
        /* This Firebase's function is a listener for any authentication status changes the onAuthStateChanged function will be fired, 
           the user parameter can be the current user or null (by default). Also, the unsubscribe will make sure to unsubscribe us from
           the listener after the user signed up (prevent this function to run over and over). */   
        const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false); // When we are done loading the signup page turn it to false without the inital user in firebase local storage. 
            // console.log('CURRENT USER: ', user);
            }); 

        return unsubscribe 
    }, [])
    

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        // Passing "value" that contains object with auth informantion 
        <AuthContext.Provider value={value}>
            {/* Simple check, if it's loading don't render children yet */}
            {!loading && children}
        </AuthContext.Provider>
    );
}
