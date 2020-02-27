var express = require("express");
var router = express.Router();

// Require controller modules.
var herb_controller = require("../controllers/herbController");

// GET catalog home page.
router.get("/", herb_controller.index);

/// Herb ROUTES ///

// GET request for one Herb.
router.get("/gewuerze/suche/", herb_controller.herb_detail);

router.get("/gewuerze/suche/:name", herb_controller.herb_search);

// GET request for all herb entries in database.
router.get("/gewuerze", herb_controller.data_entries);

router.get("/gewuerze/getrocknet", herb_controller.dried_herb_search);
router.get("/gewuerze/frisch", herb_controller.fresh_herb_search);
router.get("/gewuerze/fleisch", herb_controller.meat_herbs);
router.get("/gewuerze/fisch", herb_controller.fish_herbs);
router.get("/gewuerze/gemuese", herb_controller.vegetables_herbs);
router.get("/gewuerze/obst", herb_controller.fruit_herbs);
router.get("/gewuerze/anlegen", herb_controller.create_herbs_form);
router.post("/gewuerze/anlegen", herb_controller.create_herbs);
module.exports = router;
