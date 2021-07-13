const {verifyToken} = require('../helper/jwt')
const {User} = require('../models')

function autenticate(req,res,next){ 
  const {access_token} = req.headers

  if(access_token){
    const decoded = verifyToken(access_token)
    User.findOne({where:{
      email: decoded.email
    }})
      .then((user)=>{
        if(user){
          req.loggedUser = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
          }
          next()
        } else {
          next({name: "invalidToken"})
          // res.status(400).json({message: "invalid access token"})
        }
      })
      .catch((err)=>{
        next(err)
        // res.status(500).json({message: "Internal Server Error"})
      })
  } else {
    next({name:"invalidAuthentication"})
    // res.status(400).json({message: "Login First"})
  }
}

module.exports = autenticate