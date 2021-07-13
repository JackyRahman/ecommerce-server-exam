module.exports = (err,req,res,next)=>{
  if(err.name==='invalidJWT'){
    res.status(400).json({message: 'kamu tidak berhak untuk akses ini'})
  } else if(err.name==="invalidToken"){
    res.status(400).json({message: "invalid access token"})
  } else if(err.name === "invalidAuthentication"){
    res.status(400).json({message: "Login First"})
  } else if(err.name ==="invalidLogin"){
    res.status(400).json({message: "Invalid Email or Password"})
  } else if(err.name ==='ProductNotFound'){
    res.status(404).json({message: 'Product Not Found'})
  } else if(err.name ==='CartNotFound'){
    res.status(404).json({message: 'Cart Not Found'})
  } else if(err.name ==='SequelizeUniqueConstraintError'){
    res.status(404).json({message: 'Email Already Registered'})//
  }
   else if(err.name === 'SequelizeValidationError'){
    const message = []
    err.errors.forEach(element => {
      message.push(element.message)
    });
    res.status(400).json({message})
  } else {
    res.status(500).json({message: err.message || "internal server error"})
  }
}
