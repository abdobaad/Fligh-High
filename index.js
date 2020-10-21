const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
require("./DB/db");
const Port = process.env.PORT || 5000;
const { User } = require("./Models/UserSchema");
const { auth } = require("./Middleware/auth");
const { admin } = require("./Middleware/admin");

const nodemailer = require("nodemailer");
app.use(cors());
app.use(express.json());



app.get("/",(req,res)=>{
  res.send("login")
})
//////////   ///////////
////  Users Routes  ///
////////   ///////////

app.put("/users/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.status(404).json({
        error: true,
        message: "Not found the user",
      });
    }

    const token = await jwt.sign(
      { _id: findUser._id },
      process.env.PRIVATE_FORGOT_PASSWORD_KEY
    );

    findUser.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() * 3600000,
    });

    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_NAME, // generated ethereal user
        pass: process.env.USER_PASS, // generated ethereal password
      },
    });

    const options = {
      from: "abdobaad9991@gmail.com", // sender address
      to: "neymarbaad6013@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<a>https://localhost:5000/resetpassword/" + token + "</a>", // html body
    };

    // send mail with defined transport object
    transporter.sendMail(options, (err, body) => {
      if (err) {
        console.log(err);
      }

      res.json({
        sent: true,
        body,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "there is an error!!!",
    });
  }
});
app.post("/users/resetpassword", auth, async (req, res) => {
  try {
    const { existPassword, newPassword } = req.body;
    const user = await User.findById(req.user);
    console.log(user);

    const checkPassword = await bcrypt.compare(existPassword, user.password);

    if (!checkPassword) {
      res.status(400).json({
        error: true,
        passwordChanged: false,
        message: "the password is incorrect!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;

    await user.save();

    res.status(200).json({
      error: false,
      passwordChanged: true,
      message: "You changed the password!",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "there is a problem,try again!",
    });
  }
});
app.get("/users/admin", auth, admin, (req, res) => {
  const { admin, user } = req;
  if (!user) {
    res.status(404).json({
      error: true,
      Auth: false,
      message: "you're not authenticated",
    });
  }
  if (!admin) {
    res.status(404).json({
      error: true,
      Auth: true,
      isAdmin: false,
      message: "you're not authorized",
    });
  }

  res.status(200).json({
    error: false,
    Auth: true,
    isAdmin: true,
    user,
  });
});
app.get("/users/auth", auth, async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({
        error: true,
        message: "Sorry you're not allowed",
      });
    }

    const allowedUser = await User.findOne({ _id: req.user });

    if (!allowedUser) {
      res.status(404).json({
        error: true,
        message: "Sorry this user doesn't exist",
      });
    }

    const { firstName, lastName, email } = allowedUser;

    res.status(200).json({
      Auth: true,
      error: false,
      user: { firstName, lastName, email },
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      message: "Sorry this user doesn't exist",
    });
  }
});
app.post("/users/register", async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    //search if there a user with this email
    const isExist = await User.findOne({ email });

    if (isExist) {
      res.status(404).json({
        error: true,
        registred: false,
        message: "This email is alerady exist",
      });
    }
    //=> not existe
    //Hash the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //// create a new user with those data

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    if (!newUser) {
      res.status(400).json({
        error: true,
        message: "registration faild!!",
      });
    }

    res.status(200).json({
      registred: true,
      message: "You're registered successfully",
    });
  } catch (error) {
    res.json({
      error: true,
      error,
    });
  }
});
app.post("/users/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    //check if this user exist
    const isExist = await User.findOne({ email });

    if (!isExist) {
      res.json({
        error: true,
        message: "There in no user with these data",
      });
    }
    const checkPassword = await bcrypt.compare(password, isExist.password);

    if (!checkPassword) {
      res.json({
        error: true,
        message: "There in no user with these data",
      });
    }

    //so the user is exist
    //now get token

    const secret = await process.env.PRIVATE_KEY;

    const genToken = await jwt.sign({ _id: isExist._id }, secret);

    //  add the token to the user data

    isExist.token = genToken;

    await isExist.save();

    res.cookie("auth_token", genToken).json({
      status: true,
      message: "you are Logged in",
      isAuth: true,
      genToken,
    });

    console.log(genToken);
  } catch (error) {
    res.json({
      error: true,
      message: "there is an error",
      error,
    });
  }
});
app.get("/users/logout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      res.status(400).json({
        error: true,
        logout: false,
      });
    }
    user.token = "";
    await user.save();
    res.status(200).cookie("auth_token", "").json({
      logout: true,
      message: "Logout success",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "there is an error",
    });
  }
});

app.listen(Port, () => {
  console.log("Server Running at Port:" + Port);
});
