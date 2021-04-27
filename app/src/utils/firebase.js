import * as firebase from "firebase";
import config from "../../firebase.json";

if (!firebase.apps.length) firebase.initializeApp(config);
const app = firebase.app();

const Auth = app.auth();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async ({ student, password, name, email, nickname }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  return user;
};

export const logout = async () => {
  return await Auth.signOut();
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};
