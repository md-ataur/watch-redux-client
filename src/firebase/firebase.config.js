/* const firebaseConfig = {
    apiKey: "AIzaSyCcOlYKtZORj5uNB-5mS46o0dr9-CySP-s",
    authDomain: "watch-ecom-5c208.firebaseapp.com",
    projectId: "watch-ecom-5c208",
    storageBucket: "watch-ecom-5c208.appspot.com",
    messagingSenderId: "898799538823",
    appId: "1:898799538823:web:dc9666676296e1c82cde22"
};

export default firebaseConfig; */

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export default firebaseConfig;