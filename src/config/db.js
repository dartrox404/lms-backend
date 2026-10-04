const mongoose = require("mongoose");
const Joi = require("./joi");

exports.connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(Joi.MONGO_URL);
    console.log(
      `🌱 MongoDb has been connected successfully : ${conn.connection.host}`,
    );
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
