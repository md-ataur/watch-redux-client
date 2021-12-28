import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initAuthentication = () => {
    return initializeApp(firebaseConfig);
}

export default initAuthentication;