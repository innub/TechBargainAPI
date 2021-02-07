const express = require("express");
const app = express();
const openConnection = require("./openConnection");

const PORT = process.env.PORT || 5003;

app.use("/techbargain", require("../routes/techBargain"));

openConnection();
setInterval(() => openConnection(), 25000);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
