const mongoose = require('mongoose');
const envs = require("../config/environments");

let database = null;

function connectDB () {
  return new Promise((resolve, reject) => {
    if (database) {
      return resolve(database);
    }

    const options = {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    mongoose.connect(process.env.MONGO_URI, options)
      .then(conn => {
        database = conn;
        console.log('MongoDB is online');
        resolve(database);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { connectDB };