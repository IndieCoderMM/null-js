const BaseService = require("@api/base/service");
const db = require("@db/models");

class BlogService extends BaseService {
  constructor() {
    super(db.models.Blog);
  }
}

module.exports = BlogService;
