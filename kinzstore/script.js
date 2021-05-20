const totalInventory = document.querySelector('.total-inventory');

function renderInventory(doc){
    totalInventory.innerHTML += `<div class="inventory-item" id="${doc.id}">`;
    const inventoryItem = document.querySelector('#' + doc.id);

    var li = document.createElement('h4');
    var price = document.createElement('p');
    var deleteButton = document.createElement('button');
    var detailsButton = document.createElement('button');

    price.setAttribute('class', 'price');
    deleteButton.setAttribute('class', 'delete');
    detailsButton.setAttribute('class', 'details');

    deleteButton.innerHTML = "X";
    detailsButton.innerHTML = "See More";

    inventoryItem.setAttribute('id', doc.id);
    li.textContent = doc.data().name;

    price.textContent = `$`;
    price.textContent += doc.data().price;
    
    inventoryItem.append(li);
    inventoryItem.append(price);
    inventoryItem.append(detailsButton);
    inventoryItem.append(deleteButton);


    inventoryItem.innerHTML += `</div>`;
}

db.collection('clothes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderInventory(doc);
    })
});

const addNew = document.querySelector(".addNew").addEventListener("click", function(e) {

    e.preventDefault();

    var newName = document.querySelector(".newName").value;
    console.log(newName);
    var newPrice = document.querySelector(".newPrice").value;
    console.log(newPrice);

    db.collection("clothes").add({
        name: newName,
        price: newPrice 
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

});


const buttons = document.querySelectorAll(".delete");
console.log(buttons);

// for (var button of buttons) {
//     button.addEventListener('click', function(event) {
//         console.log("delete");
//     })
// };

var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
var seconds = document.querySelector('#seconds');