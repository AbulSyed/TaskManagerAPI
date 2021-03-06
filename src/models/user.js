const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// Create Schema and pass it in the mongoose model - need Schema to use middleware

// Create User model with name (required & trim), email (required, unique, trim, lowercase & validate), password (required, trim, minlength), avatar - buffer, tokens - array of objects

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Invalid email')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7
  },
  avatar: {
    type: Buffer
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

userSchema.pre('remove', async function(next){
  await Task.deleteMany({ owner: this._id })

  next()
})

userSchema.methods.generateAuthToken = async function(){
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if(!user){
    throw new Error('Failed login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    throw new Error('Failed login')
  }
  return user
}

userSchema.methods.toJSON = function(){
  const user = this.toObject()
  delete user.password
  delete user.tokens
  delete user.avatar
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User