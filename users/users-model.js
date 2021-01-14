const db = require('../database/config')

async function add(user) {
  const [id] = await db("users").insert(user)

  return findByID(id)
}

function find() {
  return db("users").select("id", "username")
}

function findByID(id) {
  return db("users").select("id", "username").where({id}).first()
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

module.exports = {
  add,
  find,
  findByID,
  findBy
}