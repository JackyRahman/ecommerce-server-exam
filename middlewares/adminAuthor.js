function adminAuthor(req,res,next){ 
  console.log(req.loggedUser);
  if(req.loggedUser.role === 'admin'){
    next()
  } else {
    next({name : "invalidJWT"})
  }
}

module.exports = adminAuthor