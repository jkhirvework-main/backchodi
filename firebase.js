import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyByI48DjBB8Bav_Er5DA46yooq66ivC1C8",
    authDomain: "tora-d44d8.firebaseapp.com",
    projectId: "tora-d44d8",
    storageBucket: "tora-d44d8.appspot.com",
    messagingSenderId: "948544490534",
    appId: "1:948544490534:web:221f6d364e9cc8ca382ae7",
    measurementId: "G-6YSKXF1QCQ"
};


const app = initializeApp(firebaseConfig);

export default app;