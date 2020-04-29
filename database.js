
const mongoose = require('mongoose');

module.exports = {

  connection : mongoose.connection, 

  connect: (url, callback) => mongoose.connect(`mongodb://testsUser:tests@localhost:27017/${url}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
          user: 'testsUser',
          password: 'tests',
        },
      }) .then(
        () => {
          console.log("success")
          callback(true)
        },
        (error) => {
          console.log(error)
          callback(false)
        },
    ),

  disconnect: (callback) => mongoose.disconnect()
    .then(
      () => {
        callback(true);
      },
      (error) => {
         callback(false)
       
      },
    ),

};