const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users.controller");
const tShirtController = require("../controllers/t_shirt.controller");
const visaController = require("../controllers/visa.controller");
const orderController = require("../controllers/order.controller");
const posterController = require("../controllers/poster.controller");



// ------------------ Public ------------------//

////////////// User ////////////////////
router.post("/register", userController.register);
router.post("/login", userController.login);


////////////// T-Shirt ////////////////////
router.get("/t-shirt/get-all", tShirtController.get_list);
router.get("/t-shirt/get-by-id/:id", tShirtController.get_tShirt_by_id);
router.get("/t-shirt/get-hody", tShirtController.get_hody_list);
router.get("/t-shirt/get-half-sleeve", tShirtController.get_half_sleeve_list);
router.get("/t-shirt/get-not-printed", tShirtController.get_not_printed_list);
router.get("/t-shirt/get-printed", tShirtController.get_printed_list);
router.get("/t-shirt/get-long-sleeve", tShirtController.get_long_sleeve_list);
router.get(
  "/t-shirt/get-reviews-by-id/:id",
  tShirtController.get_tshirt_review_by_id
);

////////////// Poster ////////////////////
router.get("/poster/get-by-id/:id", posterController.get_poster);
router.get("/poster/get-all", posterController.get_list);
router.get(
  "/poster/get-reviews-by-id/:id",
  posterController.get_poster_review_by_id
);

//////Customize And protect routs
router.all("*", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error("You Are Not Authorized to access this area");
      error.status = 401;
      throw error;
    }

    req.user = user;
    return next();
  })(req, res, next);
});



// ------------------ Protected ------------------//

////////////// visa ////////////////////
router.get("/visa/get-by-id/:id", visaController.get_visa_by_id);
router.get("/visa/get-all", visaController.get_list);
router.post("/visa/add", visaController.post_create_visa);
router.post("/visa/delete-by-id/:id", visaController.post_delete_by_id);
router.put("/visa/update-by-id/:id", visaController.put_update_by_id);

////////////// Order ////////////////////
router.post("/order/post-oreder", orderController.post_create_order);
router.get("/order/get-oreder-by-id/:id", orderController.get_order_by_id);
router.put("/order/paid-order/:id", orderController.put_is_paid);
router.get("/order/get-order-list", orderController.get_order_list);

////////////// Poster ////////////////////
router.post("/poster/delete-by-id/:id", posterController.post_delete_by_id);
router.put("/poster/update-by-id/:id", posterController.put_update_by_id);
router.post("/poster/add-review-by-id/:id", posterController.post_review_by_id);
router.post("/poster/add", posterController.post_poster);
router.post(
  "/poster/add-cart/:id",
  userController.post_add_poster_to_cart
);
router.post(
  "/poster/delete-cart-by-id/:id",
  userController.post_delete_poster_cart_by_id
);

////////////// T-Shirt ////////////////////
router.post("/t-shirt/add", tShirtController.post_tShirt);
router.post("/t-shirt/delete-by-id/:id", tShirtController.post_delete_by_id);
router.put("/t-shirt/update-by-id/:id", tShirtController.put_update_by_id);
router.post(
  "/t-shirt/add-review-by-id/:id",
  tShirtController.post_review_by_id
);
router.post(
  "/tshirt/add-cart/:id",
  userController.post_add_tshirt_to_cart
);
router.post(
  "/tshirt/delete-cart-by-id/:id",
  userController.post_delete_tshirt_cart_by_id
);


module.exports = router;
