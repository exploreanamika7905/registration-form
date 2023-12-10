const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.efonzfc.mongodb.net/registraionformDB`)

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
})

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input here if needed
const existingUser= await Registration 
if (!existingUser) {
    const registrationData = new Registration({
      name,
      email,
      password,
    });

    await registrationData.save();
    res.redirect("/success");
res.redirect("/error");
  }
  else{
    alert("user already exit");
    res.redirect("/error")
  }

}catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/pages/signup_success.html");
});

app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/pages/error.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})