module.exports = `const { Router } = require("express");
const helloRouter = require("@api/hello/router");

const createRouter = () => {
  const router = Router();

  helloRouter(router);

  return router;
};

module.exports = createRouter;
`;
