import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext()
const auth =  getAuth(app)

const AuthProvider = ({children}) => {
    const[loading, setLoading] = useState(true)
    const[user, setUser] =useState(null)


    const createUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser =(userInfo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    const googleSignIn = (provider)=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const userLogIn =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userSignOut =()=>{
        setLoading(true)
        return signOut(auth)
    
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log('user observe');
            setUser(currentUser)
            setLoading(false)
        })

        return()=>unsubscribe()
    },[])

    const{data: allUser =[], refetch} = useQuery({
        queryKey:['allUser'],
        queryFn: async()=>{
            const res  = await fetch('https://pushpali-server-iesratadhara.vercel.app/users')
            const data = await res.json()
            return data
        }
    })

    const authInfo = {
        user,
        loading,
        createUser,
        googleSignIn,
        updateUser,
        userLogIn,
        userSignOut,
        allUser,
        refetch,
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;