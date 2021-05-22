// select the inventory div, this is where all the magic is going to happen
const totalInventory = document.querySelector('.total-inventory');

// renders all the inventory when called 
function renderInventory(doc){
    totalInventory.innerHTML += `<div class="inventory-item" id="K${doc.id}">`;
    const inventoryItem = document.querySelector('#K' + doc.id);

    // create all of the elements we will need for the individual inventory items
    var li = document.createElement('h4');
    var price = document.createElement('p');
    var deleteButton = document.createElement('button');
    var detailsButton = document.createElement('button');

    // set all of the attributes for the elements that will need them
    price.setAttribute('class', 'price');
    deleteButton.setAttribute('id', 'deleteBtn');
    detailsButton.setAttribute('id', 'detailsBtn');
    // the inventoryItem gets a special attribute, we will select each element by it's doc.id
    inventoryItem.setAttribute('id', 'K' + doc.id);

    // set the innerHTML of the buttons
    deleteButton.innerHTML = "X";
    detailsButton.innerHTML = "See More";

    // set the content of the elements that will display in the main inventory
    li.textContent = doc.data().name;
    price.textContent = `$${doc.data().price}`;
    
    // add each item to the div
    inventoryItem.append(li);
    inventoryItem.append(price);
    inventoryItem.append(detailsButton);
    inventoryItem.append(deleteButton);

    // set the functionality of the delete buttons
    document.querySelectorAll('#deleteBtn').forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (e) => { 

            // when clicked, an alert will confirm that the user wants to delete
            var r = confirm("Are you sure you want to delete?");
            if (r == true) {
                console.log("You pressed OK!");
                e.stopPropagation();

                // select the inventory Item by it's Id and delete
                var id = e.target.parentElement.getAttribute('id');
                // erase the K from the beginng of the id
                id = id.substring(1);
                db.collection('clothes').doc(id).delete();
            } else {
                console.log("You pressed Cancel!");
            }
        });
    });

    // set the functionality of the "see more" button
    document.querySelectorAll('#detailsBtn').forEach(details => {
        details.addEventListener('click', (e) => { 

            // clear the page
            var inventory = document.querySelector(".inventory");
            inventory.innerHTML = "";

            // set the content for the details
            var itemId = details.parentElement.id;
            itemId = itemId.substring(1);
            inventory.innerHTML  += `<h2>${itemId}</h2>`;

            var itemDetails = db.collection("clothes").doc(itemId);

            // get all of the data in the document
            itemDetails.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());

                    

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
            

            // set the back button
            inventory.innerHTML += `<button id="backBtn">Back</button>`;
            
            // back button reloads the home page
            document.querySelector("#backBtn").addEventListener("click", function(e) {
                location.reload();
                console.log("back");
            });
        });
    });

    // close the inventory item div
    inventoryItem.innerHTML += `</div>`;
}

// set the details page when called
function renderItemDetails(doc) {

    // select div
    const inventoryItemDetails = document.querySelector('.inventory');

    // create header 
    var header = document.createElement('h4');

    // set the data
    header.textContent = doc.data().name;

    // add header to the page
    inventoryItemDetails.append(header);
}

// add new items to the inventory
const addNew = document.querySelector(".addNew").addEventListener("click", function(e) {
    // prevent the page from submitting the form and refreshing the page
    e.preventDefault();

    // select the form feilds
    var newName = document.querySelector(".newName").value;
    var newPrice = document.querySelector(".newPrice").value;
    var newType = document.querySelector(".newType").value;
    var newColor = document.querySelector(".newColor").value;
    // TODO: add two new items in the form

    // make sure the form is filled out
    if (newName == "" | newPrice == "" | newType == "" | newColor == "") {
        alert("Please fill out the entire form");
    } else {    
        // if the form is filled out, add the items to the clothes database
        db.collection("clothes").add({
            name: newName,
            price: newPrice,
            type: newType,
            color: newColor 
        })
        .then((docRef) => {
            // confirmation message
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            // error message
            console.error("Error adding document: ", error);
        });    
    };
});

// set up the funationality of the wallet/timer
var myTimer;
var wallet = localStorage.getItem("wallet");
var walletSpan = document.querySelector("#wallet-contents");

// check localStorage to see how much money you have
if (wallet) {
    walletSpan.innerHTML = localStorage.getItem("wallet");
} else {
    walletSpan.innerHTML = 0;
}

// set the functionality of the clock in button
function clockIn() {
    myTimer = setInterval(myClock, 1000);
    var c = 0;

    // starts the timer, increase one second at a time
    function myClock() {
        document.getElementById("demo").innerHTML = ++c;
    }
}

// set the functionality of the clockout button
function clockOut(myTimer) {
    // stop the clock
    clearInterval(myTimer);

    // check to see how long you worked
    var time = document.querySelector("#demo").innerHTML;

    // set the contents of the wallet to reflect $1 every second of work
    document.querySelector("#wallet-contents").innerHTML += time;

    // TODO: fix this bug

    // store wallet in localStorage
    localStorage.setItem('wallet', wallet);
}

// real time listener 
db.collection('clothes').onSnapshot(snapshot => {
    var changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderInventory(change.doc);
        } else if (change.type == 'removed') {
            var li = document.querySelector(`#K${change.doc.id}`);
            li.parentNode.removeChild(li);
        }
    })
    console.log(changes);
})
