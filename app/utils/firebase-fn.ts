import { initializeApp, FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getDocs,
  getFirestore,
  doc,
  setDoc,
  limit,
  collection,
  query,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    console.log("User signed up:", user);

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);

    if (user) {
      await sendEmailVerification(user);
      console.log("Email Verification Sent! Please verify your email!");
    }

    // Ensure redirect happens after Firestore write completes
    // redirect("/app");
  } catch (error) {
    throw error;
  }
}

export async function signInToApp(
  email: string,
  password: string
): Promise<string> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // console.log(user.uid);
    return user.uid;
  } catch (error: any) {
    const errorCode = error.code;

    if (errorCode === "auth/invalid-credential") {
      // Handle specific error
      return "Incorrect Email or Password";
    } else {
      // Handle general errors
      return "Account does not exist or failed to sign in";
    }
  }
}

export async function userLogOut(): Promise<string> {
  try {
    signOut(auth);
    return "success";
  } catch (error) {
    return "Not able to logOut";
  }
}

interface Resume {
  id: string;
  [key: string]: any; // Allows dynamic fields
}

export async function getDocument(): Promise<Resume[]> {
  // Reference to the collection
  const collectionRef = collection(db, "resumes");

  // Create a query to get 5 documents
  const q = query(collectionRef, limit(5));

  // Execute the query
  const querySnapshot = await getDocs(q);

  // Process the documents
  const documents: Resume[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  return documents;
}

export interface firestoreDoc {
  [key: string]: any; // Allows dynamic fields
}

export async function getUserDetails(
  uid: string
): Promise<firestoreDoc | string> {
  try {
    const docRef = doc(db, "resumes", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as firestoreDoc;
    } else {
      return "No such document!";
    }
  } catch (error: any) {
    return error.message || "Error retrieving document";
  }
}

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password Reset Email Sent!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        console.error(errorMessage);
      } else if (errorCode == "auth/user-not-found") {
        console.error(errorMessage);
      }
    }
    // console.error(error);
  }
}

export const uploadPic = async (picFile: File): Promise<string> => {
  // Create a reference to the file you want to upload
  const fileRef = ref(storage, "profile-pics/" + picFile.name);
  try {
    await uploadBytes(fileRef, picFile);
    console.log("Uploaded the pic!");
    const url = await getDownloadURL(fileRef);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
    return "error";
  }
};
