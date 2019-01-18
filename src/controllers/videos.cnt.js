const httpStatus = require('http-status-codes')
  , videosService = require('../services/videos.service')
  , videoTagsService = require('../services/video-tags.service');

class VideosController {
  constructor() {    
    videosService.sync();
    videoTagsService.sync();
  }

  async getAll(req, res) {
    await videosService
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
