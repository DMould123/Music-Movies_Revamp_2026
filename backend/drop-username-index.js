require('dotenv').config()
const mongoose = require('mongoose')
const config = require('./config')

async function dropUsernameIndex() {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to MongoDB')

    const db = mongoose.connection.db
    const usersCollection = db.collection('users')

    // Drop the username_1 index
    try {
      await usersCollection.dropIndex('username_1')
      console.log('✅ Successfully dropped username_1 index')
    } catch (error) {
      if (error.code === 27) {
        console.log('ℹ️  Index username_1 does not exist (already removed)')
      } else {
        throw error
      }
    }

    // List remaining indexes
    const indexes = await usersCollection.indexes()
    console.log('\nRemaining indexes:')
    indexes.forEach((index) => {
      console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`)
    })
  } catch (error) {
    console.error('❌ Error:', error)
    process.exitCode = 1
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
      console.log('\nMongoDB connection closed')
    }
  }

  console.log('\n✅ Done!')
}

dropUsernameIndex()
