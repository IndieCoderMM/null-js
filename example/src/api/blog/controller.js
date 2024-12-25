const BaseController = require("@api/base/controller");
const BlogService = require("./service");

class BlogController extends BaseController {
  constructor() {
    super(new BlogService());
  }
}

module.exports = new BlogController();
