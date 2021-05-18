const totalInventory = document.querySelector('.total-inventory');

function renderInventory(doc){
    const inventoryItem = document.querySelector('.inventory-item');

    var li = document.createElement('h4');
    var price = document.createElement('p');

    price.setAttribute('class', 'price');
    inventoryItem.setAttribute('data-id', doc.id);
    li.textContent = doc.data().name;

    price.textContent = `$`;
    price.textContent += doc.data().price;
    
    inventoryItem.append(li);
    inventoryItem.append(price);

    inventoryItem.innerHTML += `</div>`;
}

db.collection('clothes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        totalInventory.innerHTML += `<div class="inventory-item">`;
        renderInventory(doc);
    })
});

var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
var seconds = document.querySelector('#seconds');

var wallet = document.querySelector(".employee-wallet");
