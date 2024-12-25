/**
 * Generic Controller Class for Express
 * @template T
 */
class BaseController {
  /**
   * @param {import('./service.js')} service - Service instance
   */
  constructor(service) {
    if (!service) {
      throw new Error("Service is required");
    }
    this.service = service;
  }

  /**
   * Fetch all records
   * @type {import('express').RequestHandler}
   */
  index = async (req, res) => {
    const result = await this.service.findAll();

    res.status(200).json({ result });
  };

  /**
   * Fetch a single record by ID
   * @type {import('express').RequestHandler}
   */
  show = async (req, res) => {
    const { id } = req.params;
    const result = await this.service.findById(id);
    if (!result) {
      res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ result });
  };

  /**
   * Create a new record
   * @type {import('express').RequestHandler}
   */
  create = async (req, res) => {
    const result = await this.service.create(req.body);
    res.status(201).json({ result });
  };

  /**
   * Update an existing record
   * @type {import('express').RequestHandler}
   */
  update = async (req, res) => {
    const { id } = req.params;
    const result = await this.service.update(id, req.body);

    res.status(200).json({ result });
  };

  /**
   * Delete a record by ID
   * @type {import('express').RequestHandler}
   */
  destroy = async (req, res) => {
    const { id } = req.params;
    await this.service.delete(id);

    res.status(204).end();
  };
}

module.exports = BaseController;
