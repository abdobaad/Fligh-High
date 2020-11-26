const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    max: 255,
  },
  avatar: {
    type: String,
    default:
      "https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    min: 6,
  },
  profileId:{
    type:String
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
