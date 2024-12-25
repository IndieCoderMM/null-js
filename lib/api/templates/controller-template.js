/**
 * @param {string} modelName
 */
module.exports = (modelName) => {
  const model =
    modelName.charAt(0).toUpperCase() + modelName.toLowerCase().slice(1);

  return `const BaseController = require("@api/base/controller");
const ${model}Service = require("./service");

class ${model}Controller extends BaseController {
  constructor() {
    super(new ${model}Service());
  }
}

module.exports = new ${model}Controller();
`;
};
