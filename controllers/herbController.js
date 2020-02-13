var Herb = require("../models/herb");

// Home Page
exports.index = async (req, res) => {
  res.render("index", { title: "GewürzKönig" });
};

// Display list of all Herbs.
exports.data_entries = async (req, res) => {
  try {
    const allEntries = await Herb.find();
    const herbCount = Herb.count({}, function(err, count) {
      return count;
    });
    res.render("dbEntries", {
      name: allEntries.map(x => {
        return x.name;
      }),
      goesWith: allEntries.map(x => {
        return x.goesWith;
      }),
      state: allEntries.map(x => {
        return x.state;
      }),
      inStock: allEntries.map(x => {
        return x.inStock;
      }),
      count: await herbCount
    });
  } catch (err) {
    res.json({ message: err });
  }
};
// Display index page for HerbSearch
exports.herb_detail = async (req, res) => {
  try {
    const allHerbs = await Herb.find();
    const herbCount = Herb.count({}, function(err, count) {
      return count;
    });
    res.render("herbsIndex", {
      state: allHerbs.map(x => {
        return x.state;
      }),
      count: await herbCount
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.dried_herb_search = async (req, res) => {
  try {
    const driedHerbs = await Herb.find({ state: "getrocknet" });
    res.render("catHerbs", {
      name: driedHerbs.map(x => {
        return x.name;
      }),
      goesWith: driedHerbs.map(x => {
        return x.goesWith;
      }),
      state: driedHerbs.map(x => {
        return x.state;
      }),
      inStock: driedHerbs.map(x => {
        return x.inStock;
      }),
      thumbnail: driedHerbs.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.fresh_herb_search = async (req, res) => {
  try {
    const freshHerbs = await Herb.find({ state: "frisch" });
    res.render("catherbs", {
      name: freshHerbs.map(x => {
        return x.name;
      }),
      goesWith: freshHerbs.map(x => {
        return x.goesWith;
      }),
      state: freshHerbs.map(x => {
        return x.state;
      }),
      inStock: freshHerbs.map(x => {
        return x.inStock;
      }),
      thumbnail: freshHerbs.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.meat_herbs = async (req, res) => {
  const searchCategories = [
    "Fleisch",
    "Lamm",
    "Rind",
    "Geflügel",
    "Schwein",
    "Wild"
  ];
  const regex = [];
  for (let i = 0; i < searchCategories.length; i++) {
    regex[i] = new RegExp(searchCategories[i]);
  }

  try {
    const meatHerbs = await Herb.find({ goesWith: regex });
    res.render("catherbs", {
      name: meatHerbs.map(x => {
        return x.name;
      }),
      goesWith: meatHerbs.map(x => {
        return x.goesWith;
      }),
      state: meatHerbs.map(x => {
        return x.state;
      }),
      inStock: meatHerbs.map(x => {
        return x.inStock;
      }),
      thumbnail: meatHerbs.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.fish_herbs = async (req, res) => {
  const searchCategories = ["Fisch"];
  const regex = [];
  for (let i = 0; i < searchCategories.length; i++) {
    regex[i] = new RegExp(searchCategories[i]);
  }

  try {
    const fishHerbs = await Herb.find({ goesWith: regex });
    res.render("catherbs", {
      name: fishHerbs.map(x => {
        return x.name;
      }),
      goesWith: fishHerbs.map(x => {
        return x.goesWith;
      }),
      state: fishHerbs.map(x => {
        return x.state;
      }),
      inStock: fishHerbs.map(x => {
        return x.inStock;
      }),
      thumbnail: fishHerbs.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.vegetables_herbs = async (req, res) => {
  const searchCategories = ["Gemüse"];
  const regex = [];
  for (let i = 0; i < searchCategories.length; i++) {
    regex[i] = new RegExp(searchCategories[i]);
  }

  try {
    const vegetableHerbs = await Herb.find({ goesWith: regex });
    res.render("catherbs", {
      name: vegetableHerbs.map(x => {
        return x.name;
      }),
      goesWith: vegetableHerbs.map(x => {
        return x.goesWith;
      }),
      state: vegetableHerbs.map(x => {
        return x.state;
      }),
      inStock: vegetableHerbs.map(x => {
        return x.inStock;
      }),
      thumbnail: vegetableHerbs.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.fruit_herbs = async (req, res) => {
  const searchCategories = ["Obst"];
  const regex = [];
  for (let i = 0; i < searchCategories.length; i++) {
    regex[i] = new RegExp(searchCategories[i]);
  }

  try {
    const fruitHerbs = await Herb.find({ goesWith: regex });
    res.render("catherbs", {
      name: fruitHerbs.map(x => {
        return x.name;
      }),
      goesWith: fruitHerbs.map(x => {
        return x.goesWith;
      }),
      state: fruitHerbs.map(x => {
        return x.state;
      }),
      inStock: fruitHerbs.map(x => {
        return x.inStock;
      }),
      thumbnail: fruitHerbs.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.herb_search = async (req, res) => {
  try {
    const herb = await Herb.find({ name: new RegExp(req.params.name) });
    res.render("catherbs", {
      name: herb.map(x => {
        return x.name;
      }),
      goesWith: herb.map(x => {
        return x.goesWith;
      }),
      state: herb.map(x => {
        return x.state;
      }),
      inStock: herb.map(x => {
        return x.inStock;
      }),
      thumbnail: herb.map(x => {
        return x.thumbnail;
      })
    });
  } catch (err) {
    res.json({ message: err });
  }
};
