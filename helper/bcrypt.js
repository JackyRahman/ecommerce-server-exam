const bcrypt = require('bcrypt')  

function hashPassword(password){
  return bcrypt.hashSync(password,10)
}

function comparePassword(password,encryptedPassword){
  return bcrypt.compareSync(password,encryptedPassword)
}

module.exports = {hashPassword,comparePassword}