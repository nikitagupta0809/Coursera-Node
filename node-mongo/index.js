const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log("connected to the server");
    const db = client.db(dbname);
  
    dboper.insertDocument(db, { name: "Chole Bhature", description: "Spicy north Indian dish"}, 'dishes', (result)=>{
        console.log("Insert document:\n", result.ops);

        dboper.findDocuments(db, 'dishes', (docs)=>{
            console.log('Found documents:\n', docs);
        
            dboper.updateDocument(db, {name:'Chole Bhature'}, { description: "Updated Pav Bhaji"}, 'dishes', (result)=>{
                console.log("updated document:\n", result.result);

                dboper.findDocuments(db, 'dishes', (docs)=>{
                    console.log('Found updated documents:\n', docs);

                    db.dropCollection('dishes', (result)=>{
                        console.log('Dropped Collection: ', result);
                        client.close();
                    });
                });        
            });
        });
    });
});