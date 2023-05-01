import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.currentUser))
    },[state.currentUser])
    return(
        <AuthContext.Provider value={{currentUser: state.currentUser, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

// const AuthAccess = () => {
//     const firestore = firebase.firestore;
//     const auth = firebase.auth;

//     const [user, setUser] = useState(null) // This user
//     const [users, setUsers] = useState([]) // Other Users

//     useEffect(() => {
//         firestore().collection("users").doc(auth().currentUser.uid).get()
//             .then(user => {
//                 setUser(user.data())
//             })
//     }, [])

//     useEffect(() => {
//         if (user)
//             firestore().collection("users").where("role", "==", (user?.role === "Student" ? "Teacher" : "Student"))
//                 .onSnapshot(users => {
//                     if (!users.empty) {
//                         const USERS = []

//                         users.forEach(user => {
//                             USERS.push(user.data())
//                         })

//                         setUsers(USERS)
//                     }
//                 })
//     }, [user])

//   }