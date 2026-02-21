const bcrypt = require('bcrypt')

// Creates a salted hash for storing passwords safely.
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate salt with 12 rounds (strong default for bcrypt).
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err)
      }
      // Hash password using the generated salt.
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
}

// Checks plain password against the stored hash during login.
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed)
}

module.exports = { hashPassword, comparePassword }
