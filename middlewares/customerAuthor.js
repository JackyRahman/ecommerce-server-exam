const {Cart} = require('../models')

function customerAuthor(req,res,next){ 
  const id = +req.params.id
    Cart.findByPk(id)
      .then((cart)=>{
        if(cart){
          if(cart.dataValues.UserId===req.loggedUser.id && req.loggedUser.role==='customer'){
            next()
          } else {
            next({name : "invalidJWT"})
          }
        } else {
          next({name : "invalidJWT"})
          // res.status(400).json({message: "maaf kamu tidak berhak untuk fitur ini"})
        }
      })
      .catch((err)=>{
        // res.status(500).json({message: err.message})
        next(err)
      })
  
}

module.exports = customerAuthor