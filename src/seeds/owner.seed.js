const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Owner = require('../api/models/owner.model');

const arrayOwners = [
    {
        "name": "Carlos",
        "surname": "Pacheco",
        "properties" : [],
        "image": ""
    },
    {
        "name": "Jon",
        "surname": "Rahm",
        "properties" : [],
        "image": ""
    }
]

mongoose.connect(process.env.DB_URL)
.then( async () => {
  const allOwners = await Owner.find();
  if (allOwners.length > 0) {
      await Owner.collection.drop();
      console.log('Owners deleted');
  }
})
.catch((error) => console.log("error deleting owners", error))
.then( async () => {
    // populate db with the seed
    const ownerMap = arrayOwners.map((propert) => new Owner(propert));
    await Owner.insertMany(ownerMap);
    console.log("Owners inserted");
})
.catch((error) => console.log("error inserting owners", error))
.finally(() => mongoose.disconnect());