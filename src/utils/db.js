import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyAMe9IBjFJVeGAr0bwStCToApY0xKmXXKA",  
    authDomain: "the-jobs-d0477.firebaseapp.com",  
    projectId: "the-jobs-d0477",  
    storageBucket: "the-jobs-d0477.appspot.com",  
    messagingSenderId: "867832013053",  
    appId: "1:867832013053:web:92da73fa34342b68305e94", 
    measurementId: "G-S580KH8089"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);


//sign in with username and pwd using firebase
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    // if(res.user != null){
    //   return true;
    // }
    toast.success("Login successfully!", {
      position: "bottom-right",
    });
    return true;
    // window.location.reload();
  } catch (err) {
    console.error(err);
    // alert(err.message);
    
    toast.error("Invalid email or password!", {
      position: "bottom-right",
    });
  }
};

//sign out
export const logout = () => {
  signOut(auth);
  
  toast.success("Logged out successfully!", {
    position: "bottom-right",
  });
};
