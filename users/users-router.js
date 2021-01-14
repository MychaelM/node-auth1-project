const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('./users-model')

const router = express.Router()

router.get("/users", async (req, res, next) => {
  try {
    res.json(await Users.find())
  } catch(err) {
    next(err)
  }
})

router.post("/users", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({username}).first()

    if(user) {
      return res.status(409).json({
        message: "This username is already her so tough luck I guess"
      })
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 15)
    })

    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
})

module.exports = router
