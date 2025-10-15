// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjuDk8LSQ-6OOsFDUPDhimBB6fYcrWGi4",
    authDomain: "cc-images-f072c.firebaseapp.com",
    projectId: "cc-images-f072c",
    storageBucket: "cc-images-f072c.firebasestorage.app",
    messagingSenderId: "374304419253",
    appId: "1:374304419253:web:bab84dac3d536fa31d3dfc",
    measurementId: "G-FG6D4WB8R7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Export storage instance
