module.exports = `class CustomError extends Error {
  /**
   * Create a custom error
   * @constructor
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
`;
