const httpStatus = require('http-status-codes')

  , { response, log } = require('../utils/errors')
  , tagsService = require('../services/tags.service');

class TagsController {
  constructor() {
    tagsService.sync()
      .catch(log('sync tags controller'));
  }

  async getAll(req, res) {
    try {
      const data = await tagsService
        .findAll()
        .catch(response.r1);

      res.send(data);
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }
}

module.exports = new TagsController();
