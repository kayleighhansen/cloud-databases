db.collection('clothes').get().then((snapshot) => {
    console.log(snapshot.docs);
});