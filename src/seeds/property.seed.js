const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Property = require('../api/models/property.model');

const arrayProperties = [
    {
    "name": "Building badenerstrasse",
    "constructionYear": 2005,
    "shareholders" : [],
    "image": "",
    "geometry": {
      "location": {
        "lat": 47.361019,
        "lng": 8.446365
        }
        }
    },
    {
    "name": "Apartments Limmat",
    "constructionYear": 2011,
    "shareholders" : [],
    "image": "",
    "geometry": {
      "location": {
        "lat": 47.370145,
        "lng": 8.489695
        }
        }
    },
    {
    "name": "Apartments Kant",
    "constructionYear": 2011,
    "shareholders" : [],
    "image": "",
    "geometry": {
      "location": {
        "lat": 47.370145,
        "lng": 8.489695
        }
        }
    },
]

mongoose.connect(process.env.DB_URL)
.then( async () => {
  const allProperties = await Property.find();
  if (allProperties.length > 0) {
      await Property.collection.drop();
      console.log('Properties deleted');
  }
})
.catch((error) => console.log("error deleting properties", error))
.then( async () => {
    // populate db with the seed
    const propertyMap = arrayProperties.map((propert) => new Property(propert));
    await Property.insertMany(propertyMap);
    console.log("Properties inserted");
})
.catch((error) => console.log("error insertando comidas", error))
.finally(() => mongoose.disconnect());