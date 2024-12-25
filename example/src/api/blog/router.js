const { asyncHandler } = require("@middlewares/middlewares");
const controller = require("./controller");

/**
 * @param {import("express").Router} router
 */
const blogRouter = (router) => {
  router.get("/blogs", asyncHandler(controller.index));
  router.get("/blogs/:id", asyncHandler(controller.show));
  router.post("/blogs", asyncHandler(controller.create));
  router.patch("/blogs/:id", asyncHandler(controller.update));
  router.delete("/blogs/:id", asyncHandler(controller.destroy));
};

module.exports = blogRouter;
