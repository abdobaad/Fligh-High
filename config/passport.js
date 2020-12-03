const { User } = require("../Models/UserSchema");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt  = require("jsonwebtoken");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
     const user =await User.findOne({ profileId: profile.id });

     if(!user) {
       const checkEmail =await User.findOne({email:profile.emails[0].value});
       if(checkEmail) return done({err:true,message:'this email is taken'},null);

       const newtoken = await jwt.sign(
        { _id: profile.id },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      );

       const data = new User({
        profileId: profile.id,
        fullName: profile.displayName, 
        email: profile.emails[0].value,
        avatar: profile.photos[0].value.split("?")[0],
        token:newtoken
      })

      const newUser = await User.create(data);

      if (!newUser) {
        if(checkEmail) return done({
          error: true,
          message: "registration faild!!",
        },null);
      }


     return done(null,newUser);
     }

    

     const newtoken = await jwt.sign(
      { _id: profile.id },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" }
    );


  

    user.token = newtoken;
  
    await user.save();
    done(null, user);
     
  
    }
  )
);