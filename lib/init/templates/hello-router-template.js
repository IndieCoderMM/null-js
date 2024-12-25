module.exports = `const controller = require("./controller");

/**
 * @param {import("express").Router} router
 */
const helloRouter = (router) => {
  router.get("/", controller.hello);
};

module.exports = helloRouter;
`;
