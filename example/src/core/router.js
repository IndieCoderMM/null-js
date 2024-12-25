const { Router } = require("express");
const helloRouter = require("@api/hello/router");
const blogRouter = require("@api/blog/router");

const createRouter = () => {
  const router = Router();

  helloRouter(router);
  blogRouter(router);

  return router;
};

module.exports = createRouter;
