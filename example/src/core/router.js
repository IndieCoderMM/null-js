const { Router } = require("express");
const helloRouter = require("@api/hello/hello.router");

const createRouter = () => {
  const router = Router();

  helloRouter(router);

  return router;
};

module.exports = createRouter;
