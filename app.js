const items = document.querySelector(".grocery-list");
const submitFormButton = document.getElementById("input-item");
const inputField = document.getElementById("enter-item");
const clearButton = document.querySelector(".displayItems-clear");
const feedback = document.querySelector(".feedback");

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let groceryList;
let state;

// // add items from the localStorage to the groceryItems array
localStorage.getObj("groceryItems") ? groceryList = localStorage.getObj("groceryItems") : groceryList = {};
localStorage.getObj("counter") ? counter = localStorage.getObj("counter") : counter = 0;

// add the html stored in the values of the groceryList object to the document body.
for (let i of Object.values(groceryList)) {
    items.insertAdjacentHTML("beforebegin", i);
};



// // clear the local storage, loop through all the keys in the groceryList == the div ids
// // get the elements and delete them
// // set the groceryList back to an empty object

const clearAll = () => {
    localStorage.clear();
    for (let i of Object.keys(groceryList)) {
        document.getElementById(i).remove();
    };
    groceryList = {};
};


// // get the event that triggered the action and go high-up the hierachy
const deleteEntry = event => {
    let entry = event.target.parentNode.parentNode;
    console.log(entry.id);
    if (entry.id) {
        entry.remove();
    delete groceryList[entry.id];
    localStorage.setObj("groceryItems", groceryList);
    }
    // entry.remove();
    // delete groceryList[entry.id];
    // localStorage.setObj("groceryItems", groceryList);
};



// loop through the keys of the groceryList object and wire up event listeners for their div entries
for (let e of Object.keys(groceryList)) {
    const deleteBtn = document.getElementById(e).querySelector(".grocery-item__link");
    deleteBtn.addEventListener("click", deleteEntry);
};


const addItem = () => {
    let newEntry = inputField.value;
    // check if new entry is not empty
    // add a check to see if the element is already in the array
    if (newEntry) {
        let itemId = `item${counter}`;
        let newItem = `<div id=${itemId} class="grocery-item">
                <h4 class="grocery-item__title">${newEntry}</h4>
                <a href="#" class="grocery-item__link">
                    <i class="far fa-trash-alt"></i>
                </a>
        </div>`;
        // increment counter, add the new id to the groceryList object, add the on state to the state object
        // reset the input filed value
        counter++;
        groceryList[itemId] = newItem;
        inputField.value = "";
        // add the items to the local storage
        localStorage.setObj("groceryItems", groceryList);
        localStorage.setObj("counter", counter);
        // add the new html to the DOM 
        items.insertAdjacentHTML("beforebegin", newItem);
        // get the new buttons from the newly inserted html and wire up the event listeners
        const deleteBtn = document.getElementById(itemId).querySelector(".grocery-item__link");
        deleteBtn.addEventListener("click", deleteEntry);
        feedback.innerHTML = "Item was successfully added to the list"
        setTimeout(() => {
            feedback.style.display = "none";
            feedback.classList.remove("success", "alert");
        }, 3500);
        feedback.style.display = "block";
        feedback.classList.add("success", "alert");

    } else {
        feedback.innerHTML = "Please add an item to your list!"
        setTimeout(() => {
            feedback.style.display = "none";
            feedback.classList.remove("showItem", "alert-danger", "text-capitalize");
        }, 3500);
        feedback.style.display = "block";
        feedback.classList.add("showItem", "alert-danger", "text-capitalize");
    };
};


const testSubmit = event => {
    event.preventDefault();
    addItem();
};


submitFormButton.addEventListener("click", testSubmit);
clearButton.addEventListener("click", clearAll);


