const express = require('express');
const cookieParser = require('cookie-parser')
const cors =  require('cors');
const path = require('path');
const url = require('url');    
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {loginMiddleware } = require('./middleware')
const indexRouter = require('./routes/index.js');
let error;
const app = express();
app.use(express.json()); // enables parsing the json sent via form, post types
app.use(express.urlencoded({ extended: true })) // enables parsing nested json sent via url, query strings
app.use(cors()); // cros-origin 
app.use(cookieParser()) // parse cookies

// Specify the render engine / view engine 
app.set("view engine","ejs"); // express will automatically use the views folder on setting ejs as the view engine.
app.use(express.static(path.join(__dirname,"public"))) // load static files from the public directory


app.get(["/","/about"], loginMiddleware, indexRouter );
app.get('/login',(req,res)=>{
  res.render('login',{
    error: error,
    username: res.locals.username
  })
})

   app.post("/login", (req, res) => {
    const { name, password } = req.body;
  // basic check, you can change the variables to see the changes
    if (name === "admin" && password === "admin") {
      error = ""
      const refreshToken = jwt.sign(
        {  username: name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '10s' // set token to expire in 10s 
        }
      );
      res.cookie("token", refreshToken, { httpOnly: true }); // send the token in httpOnly cookie
      res.redirect('/')
    } else {
      error = "Invaid credentials, please try again"
      res.redirect('/login')
    }
  });
app.get('/logout',(req,res)=>{
  res.clearCookie("token")
  res.redirect("/login");
})
app.listen(3000,()=>{
    console.log("running")
})