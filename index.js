const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const process = require("process");
const router = require("./routes");
const ApiError = require("./utils/apiError");
const errorHandler = require("./controllers/errorController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError("Route does not exist", 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Server listening at port:${PORT}`);
});
