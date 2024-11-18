const fs = require("fs");
const path = require("path");

/**
 * Create a file with the given content
 * @param {string} filePath - Path to the file
 * @param {string} content - Content of the file
 * @returns {void}
 */
const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created: ${filePath}`);
};

module.exports = {
  createFile,
};
