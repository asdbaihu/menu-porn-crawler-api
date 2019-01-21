const httpStatus = require('http-status-codes')

  , Pagination = require('../utils/pagination')
  , videosService = require('../services/videos.service');

class VideosController {
  constructor() {
    videosService.sync();
  }

  async getAll(req, res) {
    let pagination = new Pagination(req.query);

    const { count } = await videosService
      .findAndCountAll()
      .catch(
        erro => res.status(httpStatus.FAILED_DEPENDENCY).send(erro)
      );

    await videosService
      .findAll(pagination.query(count))
      .then(
        data => res.status(httpStatus.OK).send({ data, ...pagination })
      )
      .catch(
        erro => res.status(httpStatus.FAILED_DEPENDENCY).send(erro)
      );
  }
}

module.exports = new VideosController();
