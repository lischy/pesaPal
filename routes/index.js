const express = require('express')

const router = express.Router()
let username
router.get('/',(req, res) => {
    res.render("home"); // index refers to index.ejs, expresss will automatically search for the file with .ejs extension inside the default views directory
    // the username will be passed automatically as the second argument as we stored in the res.locals which is always the second argument
   })
   
router.get('/about',(req,res)=>{
    // assume we make a request to server and get the response below 
    const skills = [
      {
        name: "Android",
        values: [
      "WorkManager","Room","Navigation"
      ]
    },
    {
      name:"Web",
      values: [
      "Mongo","Expres","React","Node"
      ]
    }
    ];
    res.render('about',{
      skills
    })
  })
module.exports = router