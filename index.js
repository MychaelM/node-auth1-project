const express = require('express')
const session = require('express-session')
const ConnectSessionKnex = require('connect-session-knex')(session)
const usersRouter = require('./users/users-router')
const db = require('./database/config')

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use(session({
  name: "Get it Done",
  resave: false,
  saveUninitialized: false,
  secret: "Please don't say anything",
  store: new ConnectSessionKnex({
    knex: db,
    createtable: true
  })
}))

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