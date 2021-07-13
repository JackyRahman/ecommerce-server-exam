const {Product,User} = require('../models')
const {comparePassword,hashPassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class AdminController{
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

    const {name, image_url, price, stock } = req.body
    Product.create({name, image_url, price, stock},
    next)
    .then((data)=>{
      res.status(201).json({data})
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
        // res.status(500).json(err)
        next(err)
      })
  }

  static getProductsById(req,res,next){
    Product.findByPk(req.params.id)
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch((err)=>{
        // res.status(500).json(err)
        next(err)
      })
  }

  static putProducts(req,res,next){
    const {name, image_url, price, stock } = req.body
    Product.update({name, image_url, price, stock },{
      where:{id:req.params.id
      },
      returning:true
    })
      .then((data)=>{
        if(data[0]!=0){
          res.status(200).json(data[1][0])
        } else {
        // res.status(404).json({message:"Products not found"})
        next({name:"ProductNotFound"})
        }
      })
      .catch((err)=>{
        next(err)
      })
  }

  static patchProducts(req,res,next){
    let {stock} = req.body
    Product.update({stock},{where:{id:req.params.id},returning:true})
    .then((data)=>{
      if(data[0]!=0){
        res.status(200).json(data[1][0])
      } else {
        next({name:"ProductNotFound"})
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static deleteProducts(req,res,next){
    Product.destroy({where:{
      id: +req.params.id
    }})
      .then((data)=>{
        if(data){
          res.status(200).json({message:"succes to delete"})
        } else {
          next({name:"ProductNotFound"})
        }        
      })
      .catch((err)=>{
        next(err)
      })
  }
}

module.exports = AdminController