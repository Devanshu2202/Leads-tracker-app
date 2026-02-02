import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-dc80a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "Leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

onValue(referenceInDB, function (snapshot) {
  // Challenge: Only run the code below if a snapshot exists
  if (snapshot.exists()) {
    const snapshotValues = snapshot.val();

    // Challenge: Create a const called 'leads' which is an array containing the values inside of the snapshotValues object
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  // Challenge: Import the 'remove' function and call it here to delete the leads
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function () {
  const inputValue = inputEl.value;
  if (inputValue) {
    push(referenceInDB, inputValue);
    inputEl.value = "";
  }
});
