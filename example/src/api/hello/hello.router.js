const controller = require("./hello.controller");

/**
 * @param {import("express").Router} router
 */
const helloRouter = (router) => {
  router.get("/", controller.hello);
};

module.exports = helloRouter;
