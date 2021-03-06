const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id })

  try {
    await task.save()
    res.status(201).send(task)
  }catch(e){
    res.status(400).send(e)
  }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}

  if(req.query.completed){
    match.completed = req.query.completed === 'true'
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const tasks = await Task.find({ owner: req.user._id, ...match }, null, { limit: parseInt(req.query.limit), skip: parseInt(req.query.skip), sort })
    res.status(200).send(tasks)
  }catch(e){
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if(!task){
      return res.status(404).send()
    }
    res.status(200).send(task)
  }catch(e){
    res.status(500).send()
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  const keys = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = keys.every(key => {
    return allowedUpdates.includes(key)
  })

  if(!isValidUpdate){
    return res.status(400).send('Invalid update')
  }

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if(!task){
      return res.status(404).send()
    }
    keys.forEach(key => task[key] = req.body[key])
    await task.save()
    res.status(200).send(task)
  }catch(e){
    res.status(500).send()
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
    if(!task){
      return res.status(404).send()
    }
    res.status(200).send(task)
  }catch(e){
    res.status(500).send()
  }
})

module.exports = router