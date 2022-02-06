import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // I know it's bad practice to put my keys in the code
    apiKey: "AIzaSyCDqXZSH1pfJbZg8gqK26C3PWGDEzKAQSQ",
    authDomain: "minted-8b8d7.firebaseapp.com",
    projectId: "minted-8b8d7",
    storageBucket: "minted-8b8d7.appspot.com",
    messagingSenderId: "649433064211",
    appId: "1:649433064211:web:a87af0c771910af27a70e6"
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export {
    storage,
}