const mongoose = require("mongoose");
const { logger } = require("../logger");

module.exports = async () => {
  try {
    const dbURI = process.env.dbURI;
    if (!dbURI) throw new Error("Fatal Error: Database URI (dbURI) not define");

    await mongoose.connect(dbURI);

    logger.log("info", "Mongodb connection established");
  } catch (err) {
    logger.error("error", "MongoDB Connection Failed...");
    throw new Error(err);
  }
};
