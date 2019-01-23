const db = require('./configKnex')

module.exports = {
  insert: user => {
    return db('users').insert(user)
  }, 
  findUsername: user => {
    return db('users').where({username: user}).first();
  },
  findUserDepartment: department => {
    return db('users').where({department: department});
  },
  findUsers: () => {
    return db('users')
  }
}