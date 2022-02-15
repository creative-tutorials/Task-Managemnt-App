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
  authDomain: "realtimetodoapp-2613f.firebaseapp.com",
  databaseURL: "https://realtimetodoapp-2613f-default-rtdb.firebaseio.com",
  projectId: "realtimetodoapp-2613f",
  storageBucket: "realtimetodoapp-2613f.appspot.com",
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
      // listDiv.removeChild(newElement);
      removeElements(document.querySelectorAll('li'));
      function removeElements(newElement){
        for(var i = 0; i < newElement.length; i++){
          newElement[i].parentNode.removeChild(newElement[i]);
        }
    }
    delete_btn.style.display = 'none';
    check_btn.style.display = 'none';
    });
    check_btn.addEventListener("click", (e) => {
      // let text = "";
      sta(document.querySelectorAll('li'));
      function sta(newElement){
        for(var i = 0; i < newElement.length; i++){
          newElement[i].style.color = '#a6a6a6';
          newElement[i].classList.add("active");
        }
      }
    });



    
    // let userData = input;
    // let getLocalStorage = localStorage.getItem("Todo");
    // if(getLocalStorage == null) {
      //     listArr = [];
    // }else{
    //     listArr == JSON.parse(getLocalStorage);
    // }
    // listArr.push(userData);
    // localStorage.setItem("Todo", JSON.stringify(listArr));

    writeUserData();
    function writeUserData(userId, name, email) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          Todo: eInput.value,
          email: "",
        });
      }
    });
