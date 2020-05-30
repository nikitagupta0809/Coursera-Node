const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url). then((client)=>{
    console.log("connected to the server");
    const db = client.db(dbname);
  
    dboper.insertDocument(db, { name: "Chole Bhature", description: "Spicy north Indian dish"}, 'dishes')
    .then((result)=>{
        console.log("Insert document:\n", result.ops);
        return dboper.findDocuments(db, 'dishes')
    })
    .then((docs)=>{
        console.log('Found documents:\n', docs);
        return dboper.updateDocument(db, {name:'Chole Bhature'}, { description: "Updated Pav Bhaji"}, 'dishes')
    })
    .then((result)=>{
        console.log("updated document:\n", result.result);
        return dboper.findDocuments(db, 'dishes')
    })
    .then((docs)=>{
        console.log('Found updated documents:\n', docs);
        return db.dropCollection('dishes')
    }) 
    .then((result)=>{
            console.log('Dropped Collection: ', result);
            client.close();
    })
    .catch((err)=> console.log(err));
})
.catch((err)=> console.log(err));