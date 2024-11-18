module.exports = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  hello(req, res) {
    res.send("Hello world!");
  },
};
