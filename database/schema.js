/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graph', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));
const { Schema } = mongoose;
const db = mongoose.connection;
db.dropDatabase();
const data = require('./data.js');

const graphSchema = new Schema({
  id: Number,
  zestimate: String,
  updateZestimate: String,
  salesRange: String,
  graphData: {
    city: {
      name: String,
      price: [Number],
    },
    neighborhood: {
      name: String,
      price: [Number],
    },
    property: {
      name: String,
      price: [Number],
      sold: [Number],
    },
  },
});

const Graph = mongoose.model('Graph', graphSchema);

const save = (callback) => {
  Graph.insertMany(data.generateGraph(1))
    .then(() => callback())
    .catch((err) => {
      console.log(err);
    });
};

const retrieve = (callback) => {
  const query = Graph.find();
  query.exec()
    .then((docs) => {
      callback(docs);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.save = save;
module.exports.retrieve = retrieve;
