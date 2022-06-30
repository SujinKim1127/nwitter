// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import * as firebase from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
// firebase/app 에 포함된 모든 모듈을 firebase라는 객체에 부여
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkRnykHH5jbCNfXVufeOsvj6Q1G6V1Oo0",
  authDomain: "ntwitter-edd1c.firebaseapp.com",
  projectId: "ntwitter-edd1c",
  storageBucket: "ntwitter-edd1c.appspot.com",
  messagingSenderId: "824339276495",
  appId: "1:824339276495:web:69adde051d9bddb0e10dba"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
// initializeApp 함수를 firebase 객체에서 꺼내 사용한것
// 앞에서 복사한 값을 firebaseConfig에 담아 전달해서 실행
// firebase를 초기화해 모듈로 내보낼 수 있음