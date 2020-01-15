var express = require("express");
var router = express.Router();

// Require controller modules.
var herb_controller = require("../controllers/herbController");

// GET catalog home page.
router.get("/", herb_controller.index);

/// Herb ROUTES ///

// GET request for one Herb.
router.get("/gewuerze/suche/", herb_controller.herb_detail);

// GET request for list of all Herbs.
router.get("/gewuerze", herb_controller.herb_list);


router.get("/gewuerze/getrocknet" , herb_controller.dried_herb_search);
router.get("/gewuerze/frisch", herb_controller.fresh_herb_search);

module.exports = router;
