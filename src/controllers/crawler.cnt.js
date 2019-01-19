
const cheerio = require('cheerio')
  , httpStatus = require('http-status-codes')

  , SiteModel = require('../models/site.model')
  , sitesService = require('../services/sites.service')
  , superagentService = require('../services/superagent.service');

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

    if (sites.length > 0) {
      for (let i = 0; i < sites.length; i++) {
        const site = new SiteModel(sites[i]);
        let response = '';
        await superagentService.get(site.url)
          .then(
            r => {
              const $ = cheerio.load(r.text);
              response = r.text;
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

        if (videos.length === 0) {
          let cookie;

          eval(superagentService.pornHub(response, 'cookie'));

          await superagentService.get(site.url, cookie)
            .then(
              r => {
                const $ = cheerio.load(r.text);
                response = r.text;
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
      }

      const getTags = (text, array) => {
        const $ = cheerio.load(text);
        $('.tagsWrapper a[href]')
          .each(
            function () {
              array.push($(this).text());
            }
          );
      }

      for (let x = 0; x < videos.length; x++) {
        let response = '';
        videos[x].tags = new Array();
        await superagentService.get(videos[x].url)
          .then(
            r => {
              response = r.text;
              getTags(r.text, videos[x].tags);
            }
          )
          .catch(
            e => console.log(e)
          );

        if (videos[x].tags.length === 0) {
          let cookie;

          eval(superagentService.pornHub(response, 'cookie'));

          await superagentService.get(videos[x].url, cookie)
          .then(
            r => {
              response = r.text;
              getTags(r.text, videos[x].tags);
            }
          )
          .catch(
            e => console.log(e)
          );

        }
      }

      res.send(videos);
    } else {
      res.status(httpStatus.NO_CONTENT).send('not has sites');
    }
  }

}

module.exports = new CrawlerController();
