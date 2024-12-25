module.exports = `const CustomError = require("@utils/CustomError");

/**
 * Generic Service Class for Sequelize Models
 * @template T
 */
class BaseService {
  /**
   * @param {import('sequelize').ModelStatic<import('sequelize').Model<T, T>>} model - Sequelize model instance
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Fetch all records from the database
   */
  findAll = async () => {
    return this.model.findAll();
  };

  /**
   * Find a single record by ID
   * @param {number | string} id - Record ID
   */
  findById = async (id) => {
    return this.model.findByPk(id);
  };

  /**
   * Create a new record
   * @param {object} data - Data to create a new record
   */
  create = async (data) => {
    return this.model.create(data);
  };

  /**
   * Update an existing record by ID
   * @param {number | string} id - Record ID
   * @param {object} data - Data to update
   */
  update = async (id, data) => {
    const record = await this.model.findByPk(id);
    if (!record) {
      throw new CustomError("Resource not found", 404);
    }

    return record.update(data);
  };

  /**
   * Delete a record by ID
   * @param {number | string} id - Record ID
   */
  delete = async (id) => {
    const record = await this.model.findByPk(id);
    if (!record) {
      throw new CustomError("Resource not found", 404);
    }

    return record.destroy();
  };
}

module.exports = BaseService;
`;
