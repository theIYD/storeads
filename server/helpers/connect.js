const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.Promise = Promise;

  // When successfully connected
  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
  });

  // Connection throws an error
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  // Connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the mongoose & other connections
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose default connection disconnected through app termination'
      );
      process.exit(0);
    });
  });
};

module.exports = connect();
