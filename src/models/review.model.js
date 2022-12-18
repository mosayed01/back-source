const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = Schema({
  name:{type: String, require: true},
  rating: { type: Number, require: true },
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;