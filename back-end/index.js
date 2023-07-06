const app = require("./src/app");
require("./mongo");

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});

module.exports = server;
