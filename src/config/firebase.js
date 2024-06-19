import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB7T4TDM7Eg9MtBaVGkBoXGnho8nxHAYps",
  authDomain: "fir-course-f38fa.firebaseapp.com",
  projectId: "fir-course-f38fa",
  storageBucket: "fir-course-f38fa.appspot.com",
  messagingSenderId: "156304712400",
  appId: "1:156304712400:web:a4f4ae40a44ddc48be34d5",
  measurementId: "G-ZS2GZ6624B"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app)
export const storage=getStorage(app);