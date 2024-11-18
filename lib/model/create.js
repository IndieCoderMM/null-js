const { createFile } = require("../../utils/file.js");
const { parseAttributes } = require("../../utils/parser.js");

const SPACE = " ";

/**
 * Generate a new Sequelize model and migration
 * @param {string} modelName - Name of the model
 * @param {string[]} attributes - List of attributes
 */
module.exports = (modelName, attributes) => {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);
  const migrationName = `${timestamp}-create-${modelName.toLowerCase()}`;
  const modelFilePath = `models/${modelName.toLowerCase()}.js`;
  const migrationFilePath = `migrations/${migrationName}.js`;

  const parsedAttributes = parseAttributes(attributes);
  const migrationContent = `'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('${modelName}s', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      ${parsedAttributes.map((attr) => `${attr.name}: { type: Sequelize.${attr.type.toUpperCase()} }`).join(",\n" + SPACE.repeat(6))},
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('${modelName}s');
  },
};
`;

  const modelContent = `'use strict';

const { Model } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize}
 * @param {import('sequelize').DataTypes}
 */
module.exports = (sequelize, DataTypes) => {
  class ${modelName} extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  ${modelName}.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ${parsedAttributes.map((attr) => `${attr.name}: DataTypes.${attr.type.toUpperCase()}`).join(",\n" + SPACE.repeat(4))},
  }, { sequelize, modelName: '${modelName}', timestamps: true });
  return ${modelName};
};
`;

  createFile(migrationFilePath, migrationContent);
  createFile(modelFilePath, modelContent);
};
