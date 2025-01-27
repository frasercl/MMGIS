const router = require("./routes/shortener");

let setup = {
  //Once the app initializes
  onceInit: s => {
    s.app.use(
      "/API/shortener",
      s.ensureUser(),
      s.checkHeadersCodeInjection,
      s.setContentType,
      router
    );
  },
  //Once the server starts
  onceStarted: s => {},
  //Once all tables sync
  onceSynced: s => {}
};

module.exports = setup;
