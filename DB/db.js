const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_URL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.q1bcu.mongodb.net/test?retryWrites=true&w=majority`;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected To the DataBase"))
  .catch((err) => console.log(err));
