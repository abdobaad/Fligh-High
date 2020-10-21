const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    max: 255,
  },
  avatar: {
    type: String,
    default:
      "https://www.zalinawalchlilifestyle.com/wp-content/themes/zalinawalchlilifestyle/assets/images/no-image.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  },
  resetPasswordToken: {
    data: String,
    default: "",
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
