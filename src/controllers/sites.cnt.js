const httpStatus = require('http-status-codes')
  , sitesService = require('../services/sites.service');

class sitesController {
  constructor() {    
    sitesService.sync();
  }

  async getAll(req, res) {
    await sitesService
      .findAll()
      .then(
        data => {
          res.status(httpStatus.OK).send(data);
        }
      )
      .catch(
        erro => {
          res.status(httpStatus.SERVICE_UNAVAILABLE).send(erro);
        }
      );
  }
}

module.exports = new sitesController();
