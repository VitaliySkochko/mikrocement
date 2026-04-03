import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

export async function loginAdmin(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logoutAdmin() {
  await signOut(auth);
}