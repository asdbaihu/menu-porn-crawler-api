const httpStatus = require('http-status-codes')
  , videoTagsService = require('../services/video-tags.service');

class VideosController {
  constructor() {    
    videoTagsService.sync();
  }

  async getAll(req, res) {
    await videoTagsService
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

module.exports = new VideosController();
