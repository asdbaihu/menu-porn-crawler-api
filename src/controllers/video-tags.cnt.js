const express = require('express')

  , { response, log } = require('../utils/errors')
  , videoTagsService = require('../services/video-tags.service');

class VideosTagsController {
  constructor() {
    videoTagsService.sync()
      .catch(log('sync videos controller'));
  }

  async getAll(req = express.request, res = express.response) {
    try {
      const data = await videoTagsService
        .findAll()
        .catch(response.r1);

      res.send(data);
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }
}

module.exports = new VideosTagsController();
