// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/auth"
import "firebase/compat/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi66IQp9vYZ3x9YmTmFYOjbZdszkgwjjw",
    authDomain: "project-49555.firebaseapp.com",
    projectId: "project-49555",
    storageBucket: "project-49555.appspot.com",
    messagingSenderId: "248069746559",
    appId: "1:248069746559:web:9661e1b3d83fc95175744a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();