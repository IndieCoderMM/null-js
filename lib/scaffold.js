const { createFile } = require("../utils/file.js");
const { parseAttributes } = require("../utils/parser.js");

/**
 * Generate basic API template for a resource
 * @param {string} modelName - Name of the model
 */
const scaffoldApi = (modelName) => {
  const controllerPath = `api/${modelName.toLowerCase()}/${modelName.toLowerCase()}.controller.js`;
  const routerPath = `api/${modelName.toLowerCase()}/${modelName.toLowerCase()}.router.js`;
  const apiRouterPath = `api/router.js`;

  const controllerContent = `
exports.getAll${modelName}s = (req, res) => { res.send('${modelName} list'); };
exports.get${modelName} = (req, res) => { res.send('${modelName} detail'); };
exports.create${modelName} = (req, res) => { res.send('Create ${modelName}'); };
exports.update${modelName} = (req, res) => { res.send('Update ${modelName}'); };
exports.delete${modelName} = (req, res) => { res.send('Delete ${modelName}'); };
`;

  const routerContent = `
const express = require('express');
const router = express.Router();
const ${modelName}Controller = require('./${modelName.toLowerCase()}.controller');

router.get('/', ${modelName}Controller.getAll${modelName}s);
router.get('/:id', ${modelName}Controller.get${modelName});
router.post('/', ${modelName}Controller.create${modelName});
router.put('/:id', ${modelName}Controller.update${modelName});
router.delete('/:id', ${modelName}Controller.delete${modelName});

module.exports = router;
`;

  const apiRouterContent = `
const express = require('express');
const router = express.Router();

router.use('/${modelName.toLowerCase()}s', require('./${modelName.toLowerCase()}/${modelName.toLowerCase()}.router'));

module.exports = router;
`;

  createFile(controllerPath, controllerContent);
  createFile(routerPath, routerContent);
  createFile(apiRouterPath, apiRouterContent);
};

module.exports = {
  api: scaffoldApi,
};
