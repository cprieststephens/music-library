require("dotenv").config();
const app = require('./src/app.js');

const APP_PORT = process.env.PORT || 4000;

app.listen(APP_PORT, () => {
  console.log(`App is listening on port ${APP_PORT}`)
})