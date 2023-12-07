const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb+srv://ankhieu322:j5GERTe5oUWil3Jn@cluster0.5euclk4.mongodb.net/Assign2?retryWrites=true&w=majority');
    console.log('success');

  } catch (err) {
    console.log('connect  failure');

  }
}
module.exports = { main }
