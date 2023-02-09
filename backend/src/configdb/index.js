const mongoose = require('mongoose');

//Connect to MongoDB
async function connect() {
    try {
        //await bất đồng bộ nên thêm async 
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };