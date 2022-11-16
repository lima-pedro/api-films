const express = require("express");
const routes = require("./routes.js");

require("dotenv").config();

const PORT  = process.env.PORT;

const server = express();

server.use(routes);

server.listen(PORT || 3333, (error) => {
  if (error) {
    console.log("Error when starting server");
    return;
  }

  console.log(
    `Server starting successfully on port ${PORT || 3333}`
  );
});
