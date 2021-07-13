const {Product,User,Cart} = require('../models')
const {comparePassword,hashPassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')
class CustomerController{
  static postRegister(req,res,next){
    const {email,password,role} = req.body
    User.create({email,password,role} )
      .then((data)=>{
        let {id, email, role}=data
        res.status(201).json({id, email, role})
      })
      .catch((err)=>{
        // res.status(400).json(err)
        next(err)
      })
  }

  static postLogin(req,res,next){
    User.findOne({where:{
      email: req.body.email,
    }})
      .then((data)=>{
        if(!data){
          // res.status(400).json({message: "Invalid Email or Password"})
          next({name: "invalidLogin"})
        } else {
          const isMatchPassword = comparePassword(req.body.password,data.password)
          if(!isMatchPassword){
          next({name: "invalidLogin"})
          } else{
            const token = generateToken({
              id: data.id,
              email: data.email,
              role: data.role
            })
            res.status(200).json({access_token: token, role: data.role})
          }
          res.status(200).json({access_token: token, role: data.role})
        }
      })
      .catch((err)=>{
        next(err)
      })
  }

  static postAdd(req,res,next){
    const {ProductId, quantity, status} = req.body
    Cart.findOne({where:{
      ProductId,
      UserId: req.loggedUser.id
      }, include : {
        model: Product
      }
    })
    .then((data)=>{
      if(data===null){
        return Cart.create({
          ProductId,
          UserId: req.loggedUser.id,
          quantity,
          status
        },
        next)
      } else {
        if(data.dataValues.Product.dataValues.stock > data.dataValues.quantity){
          return Cart.update({
            quantity: data.dataValues.quantity+1
          },
          {
            where:{
              ProductId,
              UserId: req.loggedUser.id
            },
            returning:true
          })
        } else {
          res.status(400).json({message: 'Sorry Not Enough Stock.'})
        }
      }
    })
    .then((cart)=>{
      if(cart[0]==1){
        res.status(200).json(cart[1][0])
      } else {
        res.status(200).json(cart)
      }
    })
    .catch((err)=>{
     next(err)
    })
  }

  static getCarts(req,res,next){
    Cart.findAll({
      where:{
        UserId: req.loggedUser.id
      }, include: {
        model:  Product
      }
    })
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch((err)=>{
        next(err)
      })
  }

  static getProducts(req,res,next){
    Product.findAll()
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch((err)=>{
        next(err)
      })
  }

  static patchCarts(req,res,next){
    let {quantity} = req.body
    Cart.update({quantity},{where:{id:req.params.id},returning:true})
    .then((data)=>{
      if(data[0]==1){
        res.status(200).json(data[1][0])
      } else {
        next({name:"CartNotFound"})
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static deleteCarts(req,res,next){
    console.log('masuk');
    Cart.destroy({where:{
      id: +req.params.id
    }})
      .then((data)=>{
        if(data){
          res.status(200).json({message:"success to delete"})
        } else {
          next({name:"CartNotFound"})
        }        
      })
      .catch((err)=>{
        next(err)
      })
  }
}
module.exports = CustomerController