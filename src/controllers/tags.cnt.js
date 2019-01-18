const httpStatus = require('http-status-codes')
  , tagsService = require('../services/tags.service');

class TagsController {
  constructor() {    
    tagsService.sync();
  }

  async getAll(req, res) {
    await tagsService
      .findAll()
      .then(
        data => {
          res.status(httpStatus.OK).send(data);
        }
      )
      .catch(
        erro => {
          res.status(httpStatus.UNPROCESSABLE_ENTITY).send(erro);
        }
      );
  }
}

module.exports = new TagsController();
