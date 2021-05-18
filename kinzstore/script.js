db.collection('clothes').get().then((snapshot) => {
    console.logs(snapshot.docs);
});