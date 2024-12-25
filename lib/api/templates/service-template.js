module.exports = (modelName) => {
  const model = modelName.charAt(0).toUpperCase() + modelName.slice(1);

  return `const BaseService = require("@api/base/service");
const db = require("@db/models");

class ${model}Service extends BaseService {
  constructor() {
    super(db.models.${model});
  }
}

module.exports = ${model}Service;
`;
};
