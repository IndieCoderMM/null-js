/**
 * @param {string} modelName
 */
module.exports = (modelName) => {
  const model = modelName.toLowerCase();

  return `const { asyncHandler } = require("@middlewares/middlewares");
const controller = require("./controller");

/**
 * @param {import("express").Router} router
 */
const ${model}Router = (router) => {
  router.get("/${model}s", asyncHandler(controller.index));
  router.get("/${model}s/:id", asyncHandler(controller.show));
  router.post("/${model}s", asyncHandler(controller.create));
  router.patch("/${model}s/:id", asyncHandler(controller.update));
  router.delete("/${model}s/:id", asyncHandler(controller.destroy));
};

module.exports = ${model}Router;
`;
};
