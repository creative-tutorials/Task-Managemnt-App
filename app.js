const eInput = document.querySelector(".eInput input");
const submit = document.querySelector(".submit #add_btn");
const listDiv = document.querySelector(".todo_content .list");
const delete_btn = document.querySelector(".del");
const check_btn = document.getElementById("check_btn");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"; 
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
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
const db = getFirestore();
const database = getDatabase(app);

submit.addEventListener("click", (e) => {
  let input = eInput.value;

  let newElement = document.createElement("li");
  console.log(newElement);

  listDiv.appendChild(newElement);
  newElement.textContent = input;

  delete_btn.style.display = 'block';
  check_btn.style.display = 'block';
  delete_btn.addEventListener("click", (e) => {
    removeElements(document.querySelectorAll('li'));
    function removeElements(newElement){
      for (var i = 0; i < newElement.length; i++) {
        newElement[i].parentNode.removeChild(newElement[i]);
      }
    }
    delete_btn.style.display = 'none';
    check_btn.style.display = 'none';
    console.clear();
  });
  check_btn.addEventListener("click", (e) => {
    sta(document.querySelectorAll('li'));
    function sta(newElement){
      for (var i = 0; i < newElement.length; i++) {
        newElement[i].style.color = '#a6a6a6';
        newElement[i].classList.add("active");
      }
    }
  });
  writeUserData();
  function writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'Todo_list/'), { //setting the database and referecning the Todolist form data into the appended todo i.e getting the input value from the input-table and putting that value into the realtime databse as a side data named Todo
      Todo: eInput.value,
    });
  }
});
