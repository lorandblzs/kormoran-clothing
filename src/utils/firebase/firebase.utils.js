import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider, 
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword
        } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2bGt3M20hg5zchazASnmGKvQ2pPMxADE",
    authDomain: "kormoran-clothing-db.firebaseapp.com",
    projectId: "kormoran-clothing-db",
    storageBucket: "kormoran-clothing-db.appspot.com",
    messagingSenderId: "473742674303",
    appId: "1:473742674303:web:b3ce50c76342dd8e18b24a"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} =  userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error createing the user', error.message);
        }
    }

    return userDocRef;
  };

  export const  createAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const  signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  };