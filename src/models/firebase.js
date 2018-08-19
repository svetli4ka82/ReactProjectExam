import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCy3RKa5AwkXQoiky7R0m2yYtVENCW-Qhs",
  authDomain: "hotels-list-43ea0.firebaseapp.com",
  databaseURL: "https://hotels-list-43ea0.firebaseio.com/",
  projectId: "hotels-list-43ea0",
  storageBucket: "hotels-list-43ea0.appspot.com",
  messagingSenderId: "274244055016"
}
const base = firebase.initializeApp(config)

export const auth = base.auth();
export default base;