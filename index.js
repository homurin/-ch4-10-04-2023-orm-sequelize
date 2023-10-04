const express = require("express");
const morgan = require("morgan");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.info(`Server listening at port:${PORT}`);
});
