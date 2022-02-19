const googleAuth = document.getElementById("googleAuth");
const create_acnt = document.getElementById("create_acnt");
const back = document.getElementById("back");
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const fullName = document.getElementById("fullName");
const password = document.getElementById("password");
const errorMsg = document.getElementById("error");

const load_bx = document.querySelector(".load_bx");
const load_text = document.querySelector(".load_text");
const loading = document.querySelector(".loading");
const check = document.getElementById("check");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

googleAuth.addEventListener("click", (e) => {
  authorizeGoogleAuth();
});
async function authorizeGoogleAuth() {
  await signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info
    const user = result.user;
    console.log(user);
    // ...
    load_bx.classList.add("active");

    setTimeout(() => {
      load_text.textContent = 'Validating Form'
    }, 1000);
    setTimeout(() => {
      load_text.textContent = 'Checking for errors'
    }, 4000);
    setTimeout(() => {
      load_text.textContent = 'Assigning validation'
    }, 6000);

    setTimeout(() => {
      load_text.textContent = 'Submitting Form'
    }, 8000);
    setTimeout(() => {
      console.log("Form Submitted");
      loading.style.display = 'none';
      load_text.textContent = 'Form Submitted'
      check.style.display = 'block';
    }, 10000);
    setTimeout(() => {
      window.location.href = '/ToDoApp/index.html';
      //redirecting to the todoapp page
    }, 13000);
  }).catch((error) => {
    // Handle Erros here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode);
    // The email of the user's account used
    const email = error.email;
    // The AuthCredential type that was used
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
create_acnt.addEventListener("click", (e) => {
  formSignIn();
});
async function formSignIn() {
  await document.querySelector(".wrapper").classList.add("hide");
  await document.querySelector(".emailAuth").classList.add("show");
}
back.addEventListener("click", (e) => {
  document.querySelector(".wrapper").classList.remove("hide");
  document.querySelector(".emailAuth").classList.remove("show");
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(emailInput.value == ""){
    errorMsg.classList.add("invalid");
    emailInput.classList.add("invalid");
    errorMsg.textContent = 'Please fill the required fields';
  }else{
    validate();
  }
  if(fullName.value == ""){
    errorMsg.classList.add("invalid");
    fullName.classList.add("invalid");
    errorMsg.textContent = 'Please fill the required fields';
  }else{
    errorMsg.classList.remove("invalid");
    fullName.classList.remove("invalid");
    fullName.classList.add("valid");
  }
  if(password.value == ""){
    errorMsg.classList.add("invalid");
    password.classList.add("invalid");
    errorMsg.textContent = 'Please fill the required fields';
  }else{
    errorMsg.classList.remove("invalid");
    password.classList.remove("invalid");
    checkPassword();
  }
  password.addEventListener("keyup", (e) => {
    checkPassword();
  });
  function checkPassword() {
    if(password.value.length < 6){
      password.classList.add("invalid");
      errorMsg.classList.add("invalid");

      errorMsg.textContent = "Password must contain at least 6 Characters";
    }else{
      password.classList.remove("invalid");
      errorMsg.classList.remove("invalid");
      password.classList.add("valid");
    }
  }
  emailInput.addEventListener("keyup", (e) => {
    validate();
  });
  function validate() {
    let regexPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!emailInput.value.match(regexPattern)) {
      emailInput.classList.add("invalid");
      errorMsg.classList.add("invalid");
      (emailInput.valie !== "") ? errorMsg.textContent = "Enter a valid email address" : errorMsg.textContent = "Please fill the required fields";
    }else{
      emailInput.classList.remove("invalid");
      errorMsg.classList.remove("invalid");

      emailInput.classList.add("valid");
    }
  }
  if(emailInput.classList.contains("valid") && fullName.classList.contains("valid") && password.classList.contains("valid")){
    authenticateLogin();

    load_bx.classList.add("active");

    setTimeout(() => {
      load_text.textContent = 'Validating Form'
    }, 1000);
    setTimeout(() => {
      load_text.textContent = 'Checking for errors'
    }, 4000);
    setTimeout(() => {
      load_text.textContent = 'Assigning validation'
    }, 6000);

    setTimeout(() => {
      load_text.textContent = 'Submitting Form'
    }, 8000);
    setTimeout(() => {
      console.log("Form Submitted");
      loading.style.display = 'none';
      load_text.textContent = 'Form Submitted'
      check.style.display = 'block';
    }, 10000);
    setTimeout(() => {
      window.location.href = '/ToDoApp/index.html';
      //redirecting to the todoapp page
    }, 13000);
  }
  function authenticateLogin() {
    let email = emailInput.value;
    let fullNameVal = fullName.value;
    let passwords = password.value;

    // function to createUserCredentials and store it in an authenticate database //note that this login is a one-time-login user can't login in if the email exist
    createUserWithEmailAndPassword(auth, email, passwords, fullNameVal)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });

    //function to sign user in to the databse with their created credentials
    signInWithEmailAndPassword(auth, email, passwords, fullNameVal)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
});