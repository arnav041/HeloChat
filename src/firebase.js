import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDZm6qicJv2zZQDw1X3plF14m36RU_81vo",
    authDomain: "helochat-041.firebaseapp.com",
    projectId: "helochat-041",
    storageBucket: "helochat-041.appspot.com",
    messagingSenderId: "737750835067",
    appId: "1:737750835067:web:b300d6c6ce2deb344aa7de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
        console.log(res.user)
    }).catch((error) => {
        console.log('Google SignIn Error ', error.message)
    })
};

const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider).then((res) => {
        console.log(res.user)
    }).catch((error) => {
        console.log('Facebook SignIn Error ',error.message)
    })
};

export { auth, signInWithGoogle, signInWithFacebook };