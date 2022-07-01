// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
// firebase/app 에 포함된 모든 모듈을 firebase라는 객체에 부여
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);
// initializeApp 함수를 firebase 객체에서 꺼내 사용한것
// 앞에서 복사한 값을 firebaseConfig에 담아 전달해서 실행
// firebase를 초기화해 모듈로 내보낼 수 있음