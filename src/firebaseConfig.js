
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCHysHrZuqxcrK51YIa8Hkgp7Ikfh3MIcI",
  authDomain: "hotel-booking-app-74c54.firebaseapp.com",
  projectId: "hotel-booking-app-74c54",
  storageBucket: "hotel-booking-app-74c54.appspot.com",
  messagingSenderId: "7812313495",
  appId: "1:7812313495:web:472debd32ffb1d7b0ed4d2",
  measurementId: "G-KR8RW6FTNG"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);