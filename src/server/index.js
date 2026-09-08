const app = require("../app/main");
const { connectDatabase } = require("../config/db");
const Joi = require("../config/joi");
const PORT = Joi.SERVER.PORT || 7070;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () =>
      console.log(`⚡️ Server is listening on : http://localhost:${PORT}`),
    );
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

start();
