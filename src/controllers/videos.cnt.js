const express = require('express')

  , { response, log } = require('../utils/errors')
  , Pagination = require('../utils/pagination')
  , videosService = require('../services/videos.service');

class VideosController {
  constructor() {
    videosService.sync()
      .catch(log('sync videos controller'));
  }

  async getAll(req = express.request, res = express.response) {
    try {
      let pagination = new Pagination(req.query);

      const { count } = await videosService
        .findAndCountAll()
        .catch(response.r1);

      const data = await videosService
        .findAll(pagination.query(count))
        .catch(response.r1);

      res.send({ data, ...pagination });
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }

  async click(req = express.request, res = express.response) {
    try {
      const where = { id: parseInt(req.params.id) };
      const { dataValues: video } = await videosService
        .findOne({ where })
        .catch(response.r1);

      video.clicks++;

      await videosService
        .update(video,  { where })
        .catch(response.r1);

      res.send(video.clicks.toString());
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }
}

module.exports = new VideosController();
