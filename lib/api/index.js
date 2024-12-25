const path = require("path");
const { createFile } = require("../../utils/file.js");

const serviceTemplate = require("./templates/service-template");
const routerTemplate = require("./templates/router-template");
const controllerTemplate = require("./templates/controller-template");

/** @typedef {Object<string, string[]>} ProjectStructure */

/** @type ProjectStructure */
const projectStructure = {
  "src/api": ["router.js", "controller.js", "service.js"],
};

const fileTempates = {
  "router.js": routerTemplate,
  "controller.js": controllerTemplate,
  "service.js": serviceTemplate,
};

/**
 * Generate a new api structure
 * @param {string} modelName - Model name
 */
const generateApi = (modelName) => {
  /**
   * Create files based on the project structure
   * @param {ProjectStructure} structure - Project structure
   */
  const createFiles = (structure) => {
    Object.entries(structure).forEach(([dir, files]) => {
      const dirPath = dir + "/" + modelName.toLowerCase();

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (fileTempates[file]) {
          createFile(filePath, fileTempates[file](modelName));
          return;
        }
      });
    });
  };

  createFiles(projectStructure);
};

module.exports = {
  generateApi,
};
