const httpStatus = require('http-status-codes')
  , sitesService = require('../services/sites.service');

class SitesController {
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
          res.status(httpStatus.UNPROCESSABLE_ENTITY).send(erro);
        }
      );
  }
}

module.exports = new SitesController();
