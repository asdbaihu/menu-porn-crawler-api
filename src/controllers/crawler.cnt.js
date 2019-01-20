
const httpStatus = require('http-status-codes')

  , SiteModel = require('../models/site.model')
  , sitesService = require('../services/sites.service')
  , crawlerService = require('../services/crawler.service')
  , superagentService = require('../services/superagent.service')

  , { getPatchString } = require('../utils/helpers');

class CrawlerController {
  constructor() { }

  async run(req, res) {
    const sites = await sitesService
      .findAll()
      .catch(
        erro => {
          res.status(httpStatus.UNPROCESSABLE_ENTITY).send(erro);
        }
      );

    if (sites.length > 0) {
      for (let i = 0; i < sites.length; i++) {
        const site = new SiteModel(sites[i]);
      }

    } else {
      res.status(httpStatus.NO_CONTENT).send('not has sites');
    }
  }

  async pornHub(req, res) {
    const videos = new Array();
    const site = await sitesService
      .findOne({ where: { name: 'PornHub' } })
      .then(data => new SiteModel(data))
      .catch(
        erro => {
          res.status(httpStatus.UNPROCESSABLE_ENTITY).send(erro);
        }
      );

    const getScript = ({ text }) => getPatchString(text, '<!--', '//-->');
    const putScript = script => {
      let cookie = 'cookie';

      eval(`const document = { cookie: '', location: { reload() {} } };
      if (typeof module !== 'undefined') {
        module.exports = undefined;
        module = undefined;
      }
      ${script}
      go();
      ${cookie} = document.cookie;`);

      return cookie;
    };
    const retryWithCookie = cookie => superagentService.get(site.url, cookie);

    await superagentService.get(site.url)
      .then(getScript)
      .then(putScript)
      .then(retryWithCookie)
      .then(
        ({ text }) => {
          const querys = [
            {
              query: '#hotVideosSection li .title a',
              fields: {
                name: 'text',
                url: 'href'
              }
            },
            {
              query: '#hotVideosSection li .phimage .img img',
              fields: {
                thumb: 'src'
              }
            }
          ];

          crawlerService.extractFromHtml(text, querys, videos);
        }
      )
      // TODO: Este trecho adiciona as tags ainda não esta funcionando devido a renderização das tags não estar pronta no primeiro request
      // .then(
      //   async _ => {
      //     for (let x = 0; x < videos.length; x++) {
      //       videos[x].tags = new Array();

      //       await superagentService.get(site.url + videos[x].url)
      //         .then(getScript)
      //         .then(putScript)
      //         .then(retryWithCookie)
      //         .then(
      //           ({ text }) => {
      //             const querys = [
      //               {
      //                 query: '.tagsWrapper a[href]',
      //                 fields: {
      //                   name: 'text'
      //                 }
      //               }
      //             ];
      //             console.log(text.indexOf('tagsWrapper'));

      //             crawlerService.extractFromHtml(text, querys, videos[x].tags);
      //           }
      //         )
      //         .catch(
      //           e => console.log(e)
      //         );
      //     }
      //   }
      // )
      .catch(
        e => console.log(e)
      );

    res.send(videos);
  }

}

module.exports = new CrawlerController();
