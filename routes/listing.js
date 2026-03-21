const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema, reviewSchema } = require("../schema.js");
const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const Listing = require("../models/listing.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
  .get(wrapAsync(listingController.index))
  .post( isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));
 
  
  //NEW ROUTE
router.get("/new", isLoggedIn,listingController.renderNewForm );

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner,upload.single("image"), validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//UPDATE ROUTE
// router.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// }));
module.exports = router;