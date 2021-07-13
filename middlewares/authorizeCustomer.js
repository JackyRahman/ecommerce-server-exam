function authorizeCustomer(req,res,next){ 
  console.log(req.loggedUser);
  if(req.loggedUser.role === 'customer'){
    next()
  } else {
    next({name : "invalidJWT"})
  }
}

module.exports = authorizeCustomer