#! /usr/bin/env node

console.log(
  "This script populates some herbs to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var Herb = require("./models/herb");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var herbs = [];

function herbCreate(name, goesWith, state, inStock, cb) {
  herbdetail = {
    name: name,
    goesWith: goesWith,
    state: state,
    inStock: inStock
  };

  var herb = new Herb(herbdetail);

  herb.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Herb: " + herb);
    herbs.push(herb);
    cb(null, herb);
  });
}

function createHerbs(cb) {
  async.series(
    [
      function(callback) {
        herbCreate(
          "Bärlauch",
          "Salat, Soßen, Fleisch ",
          "getrocknet",
          "Ausverkauft",
          false,
          callback
        );
      },
      function(callback) {
        herbCreate(
          "Lorbeerblätter",
          "Zum Einlegen, für Eintöpfe, Suppen, Fleisch ",
          "getrocknet",
          "Bestellbar",
          false,
          callback
        );
      },
      function(callback) {
        herbCreate(
          "Majoran",
          "Suppen, Pizza, Kartoffelgerichte ",
          "frisch",
          "Bestellbar",
          false,
          callback
        );
      },
      function(callback) {
        herbCreate(
          "Petersilie",
          "Eintopf, Suppen, Kartoffeln, Fleisch, Fisch",
          "frisch",
          "Ausverkauft",
          false,
          callback
        );
      },
      function(callback) {
        herbCreate(
          "Kreuzkümmel",
          "Eintöpfen und Reisgerichten, Fleisch- und Grillgerichten ",
          "gemahlen",
          "Bestellbar",
          false,
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createHerbs],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("BOOKInstances:");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
