const express = require("express");
const morgan = require("morgan");
const { CorsMiddlware } = require("../application/middlewares/cors");
const { errorResponse } = require("../application/utils/response");

module.exports = (app) => {
  // Middleware
  app.use(morgan("combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => CorsMiddlware(req, res, next));

  // Routes
  app.use("/api", require("../application/routes"));

  // Handle Error
  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    console.log("[Error Log]: ", error);
    return errorResponse(res, error.status || 500, error.message);
  });
};
