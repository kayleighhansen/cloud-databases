const totalInventory = document.querySelector('.total-inventory');

function renderInventory(doc){
    totalInventory.innerHTML += `<div class="inventory-item">`;
    const inventoryItem = document.querySelector('.inventory-item');

    var li = document.createElement('h4');
    var price = document.createElement('p');

    li.setAttribute('data-id', doc.id);
    li.textContent = doc.data().name;
    price.textContent = doc.data().price;

    inventoryItem.append(li);
    inventoryItem.append(price);

    inventoryItem.innerHTML += `</div>`;

}

db.collection('clothes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderInventory(doc);
    })
});