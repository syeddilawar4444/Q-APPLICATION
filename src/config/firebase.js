// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, signInWithPopup, getRedirectResult, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, setDoc, doc, serverTimestamp,getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0H6QDs-haD5YGctH8P_gH0h75W-1TEvk",
  authDomain: "practice-64853.firebaseapp.com",
  projectId: "practice-64853",
  storageBucket: "practice-64853.appspot.com",
  messagingSenderId: "949462170391",
  appId: "1:949462170391:web:5c526a7382026fd64bd552"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
console.log("app ====>", app)
console.log("auth ====>", auth)
console.log("FireStore ====>", db)



async function loginFacebookHandler() {
  console.log("call the Function to make the data")
  const provider = new FacebookAuthProvider();
  provider.addScope('user_birthday');
  provider.setCustomParameters({
    'display': 'popup'
  });

  try {
    const result1 = await signInWithPopup(auth, provider)
    const user1 = await result1.user
    console.log("user1", user1)
    return user1
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log("ERROR ==>", error)
    console.log("Error code  ==>", errorCode)
    console.log("Error Message  ===== >", error.message)
  }
  // .then((result) => {
  //   // console.log(".then seccessfull run")
  //   // The signed-in user info.
  //   const user = result.user;
  //   // console.log("facebook result ===>",result)

  //   // console.log("facebook data user ===>",user)
  //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //   const credential = FacebookAuthProvider.credentialFromResult(result);
  //   const accessToken = credential.accessToken;

  //   return user
  //   // ...



  // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = FacebookAuthProvider.credentialFromError(error);

  //   // ...
  // });


  // debugger
  //       getRedirectResult(auth)
  //   .then((result) => {
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     const credential = FacebookAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;

  //     const user = result.user;
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // AuthCredential type that was used.
  //     const credential = FacebookAuthProvider.credentialFromError(error);
  //     // ...
  //   });
}

function addUserToFirebase(user) {
  debugger
  console.log("userFirebase ===.", user)
  const userId = auth.currentUser.uid;
  const { email, displayName, photoURL } = user
  return setDoc(doc(db, "users", userId), { email, displayName, photoURL, userId, myTokens: [] })

}
function checkuserLogin() {
  onAuthStateChanged(auth, (user) => {

    if (user) {
      // setUser(true
      return true
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      return false
      // ...
    }
  });
}

async function AddCompany(data) {
  console.log(data);
  const {address,
    close,
    name,
    open,
    since
   } = data

  const companyDetail = {
    company: name,
    since: since,
    openingTime: open ,
    closingTime: close ,
    address: address,
    userId: auth.currentUser.uid,
    totalTokens : 0,
    each_token_time : 0,
    soldTo: [],
    activeToken: 0,
    totalSoldToken: 0,
    createdAt: serverTimestamp()
  }

  const companyId = `${auth.currentUser.uid}${Date.now()}`
  console.log("company Detail===>",companyDetail)
  console.log("company ID ==>",companyId)
  // debugger
   setDoc(doc(db, "Company",companyId), companyDetail)
    alert("Company Registed")
}
function logout() {

  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}


async function getAllCompany() {
  const q = query(collection(db, "Company"));

  const querySnapshot = await getDocs(q);
  let data = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    console.log(doc.id, " => ", doc.data());
    data.push({ ...doc.data() })

  });
  return data
}

async function getUserInfo(){
  const userId = auth.currentUser.uid
  console.log(userId)
  const docRef = doc(db, "users",userId);
const docSnap = await getDoc(docRef);

return docSnap.data()
}




export { loginFacebookHandler, checkuserLogin, AddCompany, logout, getAllCompany, addUserToFirebase ,db,auth, getUserInfo}
