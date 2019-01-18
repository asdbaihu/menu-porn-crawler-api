
const cheerio = require('cheerio')
  , request = require('superagent')
  , httpStatus = require('http-status-codes')

  , SiteModel = require('../models/site.model')
  , sitesService = require('../services/sites.service');

class CrawlerController {
  constructor() { }

  async run(req, res) {
    const videos = new Array();
    const sites = await sitesService
      .findAll()
      .catch(
        erro => {
          res.status(httpStatus.UNPROCESSABLE_ENTITY).send(erro);
        }
      );

    // TODO: remover este codigo daqui
    function getSite(url) {
      return new Promise(
        (res, rej) => {
          request
            .get(url)
            .end(
              (e, r) => {
                if (e) {
                  rej(e);
                } else {
                  res(r);
                }
              }
            );
        }
      );
    }


    if (sites.length > 0) {
      for (let i = 0; i < sites.length; i++) {
        const site = new SiteModel(sites[i]);
        await getSite(site.url)
          .then(
            r => {
              
              // TODO: remover este codigo daqui
              const $ = cheerio.load(r.text);
              $('#hotVideosSection li')
                .each(
                  function () {
                    const infos = $(this).find('.title a')[0];
                    const image = $(this).find('.phimage .img img')[0];
                    videos.push(
                      {
                        url: site.url + infos.attribs.href,
                        name: infos.attribs.title,
                        thumb: image.attribs.src
                      }
                    );
                  }
                );
            }
          )
          .catch(
            e => console.log(e)
          );
      }

      res.send(videos);

    } else {
      res.status(httpStatus.NO_CONTENT).send('not has sites');
    }
  }

}

module.exports = new CrawlerController();
