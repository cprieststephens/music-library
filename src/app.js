const express = require("express");
const artistRouter = require("./routes/artist");
const app = express();

app.use("/artists", artistRouter);
app.use(express.json());

// app.post("/artists", (req, res) => {
//   res.sendStatus(201);
// });

module.exports = app;
