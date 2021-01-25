const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'secretvalue')
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })

    if(!user){
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  }catch(e){
    res.status(401).send('Unauthenticated user')
  }
}

module.exports = auth