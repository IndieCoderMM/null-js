/**
 * Parse attributes from a command
 * @param {string[]} attributes - List of attributes
 * @returns {Object[]} - List of parsed attributes
 */
const parseAttributes = (attributes) => {
  return attributes.map((attr) => {
    const [name, type, ...options] = attr.split(":");
    return { name, type, options };
  });
};

module.exports = {
  parseAttributes,
};
