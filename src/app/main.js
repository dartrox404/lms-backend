const e = require("express");
const app = e();
const cor = require("cors");
const { errorHandler } = require("../middleware/globalError");
const helmet = require("helmet");
const authRoutes = require("../modules/user/user_routes");
const localRoutes = require("../modules/student/student_routes");
const AppError = require("../utils/appError");

//secuirty
app.use(helmet());
app.use(cor());

app.use(e.json({ limit: "10Kb" }));
app.use(e.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("BINGO");
});

app.use("/api/v2/auth", authRoutes);
app.use("/api/v3/students", localRoutes);

app.use((req, res, next) => {
  return next(new AppError(`Route : ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
