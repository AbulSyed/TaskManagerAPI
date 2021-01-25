const mongoose = require('mongoose')

// Create Task model with description (required, trim), completed (default false) and owner (mongoose.Schema.Types.ObjectId, required, reference)

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports = Task