const express = require('express')
const usersRouter = require('./users/users-router')
const db = require('./database/config')

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.use(usersRouter)

server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: "Something is broken"
  })
})

server.listen(port, () => {
  console.log(`server is listening at port ${port}`)
})