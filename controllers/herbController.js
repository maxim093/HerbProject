var Herb = require("../models/herb");

// Home Page
exports.index = async (req, res) => {
  res.render("index", { title: "GewürzBuddy" });
};

// Display list of all Herbs.
exports.herb_list = async (req, res) => {
  try {
    const allHerbs = await Herb.find();
    const herbCount = Herb.count({}, function(err, count) {
      return count;
    });
    res.render("allHerbs", {
      name: allHerbs.map(x => {
        return x.name;
      }),
      goesWith: allHerbs.map(x => {
        return x.goesWith;
      }),
      state: allHerbs.map(x => {
        return x.state;
      }),
      inStock: allHerbs.map(x => {
        return x.inStock;
      }),
      count: await herbCount
    });
  } catch (err) {
    res.json({ message: err });
  }
};
// Display detail page for a specific Herb.
exports.herb_detail = async (req, res) => {
  try {
    const allHerbs = await Herb.find();
    const herbCount = Herb.count({}, function(err, count) {
      return count;
    });
    res.render("specificHerbs", {
      state: allHerbs.map(x => {
        return x.state;
      }),
      count: await herbCount
    });
  } catch (err) {
    res.json({ message: err });
  }
};


exports.dried_herb_search = async (req ,res) => {
  try {
    const driedHerbs = await Herb.find({ 'state' : 'getrocknet'});
    res.render('catHerbs', {
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
      })
    });

  } catch (err) {
    res.json({ message : err})

  }
}


exports.fresh_herb_search = async (req, res) => {
  try {
    const freshHerbs = await Herb.find({ 'state' : 'frisch'});
    res.render('catherbs' , {
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
      })
    })
  } catch (err) {
    res.json({ message : err })
  }
}


exports.herb_search = async (req ,res) => {

  try {
    const herb = await Herb.find({ name : new RegExp(req.params.name)})
    console.log(herb);
    res.render('catherbs' , {
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
      })
    })
  } catch (err) {
    res.json({ message : err })
  }
}


