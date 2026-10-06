const app = require("../app/main");
const { connectDatabase } = require("../config/db");
const Joi = require("../config/joi");
const PORT = Joi.PORT || 7070;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () =>
      console.log(`⚡️ Server is listening on : ${Joi.BASE_URL}`),
    );
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

start();
