const jwt = require("jsonwebtoken");

const loginMiddleware  = (req,res,next) => {
    if(req.cookies.token){
    jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err){
        res.clearCookie('token');
        res.locals.username = "" // this will be available throught via res.locals
        res.redirect('/login')
      }else{
        res.locals.username = user.username
        next()
      }
    })
  }else{
    res.redirect('/login')
  }  
  }
module.exports = {loginMiddleware}