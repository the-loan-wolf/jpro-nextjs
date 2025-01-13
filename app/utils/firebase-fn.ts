import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
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
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// function showMessage(message, divId) {
//   var messageDiv = document.getElementById(divId);
//   messageDiv.style.display = "block";
//   messageDiv.innerHTML = message;
//   messageDiv.style.opacity = 1;
//   setTimeout(function () {
//     messageDiv.style.opacity = 0;
//   }, 5000);
// }

// export default function signUp(email: string, password: string): void {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const userData = {
//         email: email,
//         firstName: firstName,
//         lastName: lastName,
//       };
//       showMessage("Account Created Successfully", "signUpMessage");
//       const docRef = doc(db, "users", user.uid);
//       setDoc(docRef, userData)
//         .then(() => {
//           window.location.href = "index.html";
//         })
//         .catch((error) => {
//           console.error("error writing document", error);
//         });
//       sendEmailVerification(auth.currentUser).then(function () {
//         // Email Verification sent!
//         alert("Email Verification Sent! Please verify your email!");
//       });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       if (errorCode == "auth/email-already-in-use") {
//         showMessage("Email Address Already Exists !!!", "signUpMessage");
//       } else {
//         showMessage("unable to create User", "signUpMessage");
//       }
//     });
// }

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
    const data = doc.data() as Resume; // Type assertion with dynamic fields
    const { id, ...rest } = data;
    documents.push({ id: doc.id, ...rest });
  });

  return documents;
}

interface firestoreDoc {
  [key: string]: any; // Allows dynamic fields
}

export async function getUserDetails(uid: string): Promise<firestoreDoc> {
  // try {
  //   const docRef = doc(db, "resumes", uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     return docSnap.data() as firestoreDoc;
  //   } else {
  //     return "No such document!";
  //   }
  // } catch (error: any) {
  //   return error.message || "Error retrieving document";
  // }
  const docRef = doc(db, "resumes", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as firestoreDoc;
}
