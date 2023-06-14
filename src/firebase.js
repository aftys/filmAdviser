import firebase from 'firebase/compat/app';
import { getFirestore, collection, addDoc, where, doc, query, getDocs, setDoc } from 'firebase/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    //your firebase app config
  };
  
  export const app=firebase.initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  
  export const auth = firebase.auth();
  export default firebase;
  
  export const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(provider);
      const user = res.user;
      const userRef = collection(db, 'users');
      const result = await getDocs(query(userRef, where('uid', '==', user.uid)));
      if (result.empty) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };
  
  export const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  };
  
  export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      });
    } catch (err) {
      alert(err.message);
    }
  };
  