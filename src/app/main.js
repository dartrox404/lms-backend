const e = require("express");
const app = e();
const { errorHandler } = require("../middleware/globalError");
const authRoutes = require("../modules/user/user_routes");
const localRoutes = require("../modules/student/student_routes");

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("BINGO");
});

app.use("/api/v2/auth", authRoutes);
app.use("/api/v3/local", localRoutes);

app.use(errorHandler);

module.exports = app;
