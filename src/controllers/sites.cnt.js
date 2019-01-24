const httpStatus = require('http-status-codes')

  , { response, log } = require('../utils/errors')
  , sitesService = require('../services/sites.service');

class SitesController {
  constructor() {
    sitesService.sync()
      .catch(log('sync sites controller'));
  }

  async getAll(req, res) {
    try {
      const data = await sitesService
        .findAll()
        .catch(response.r1);

      res.send(data);
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }
}

module.exports = new SitesController();
