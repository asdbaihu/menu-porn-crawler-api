
const httpStatus = require('http-status-codes')

  , { response, log } = require('../utils/errors')

  , SiteModel = require('../models/site.model')
  , VideoModel = require('../models/video.model')
  , sitesService = require('../services/sites.service')
  , videosService = require('../services/videos.service')
  , pornhubService = require('../services/pornhub.service')
  , crawlerService = require('../services/crawler.service')
  , videoTagsService = require('../services/video-tags.service');

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
    const site = await sitesService
      .findOne({ where: { name: 'PornHub' } })
      .then(data => new SiteModel(data))
      .catch(
        erro => {
          res.status(httpStatus.UNPROCESSABLE_ENTITY).send(erro);
        }
      );

    const request = {
      url: site.url
    };

    let extrationVideos = await crawlerService.extract(request, pornhubService.querys.$name$url$time$thumb);

    if (extrationVideos.data.length === 0) {
      request.cookie = pornhubService.extractCookieFromScript(extrationVideos.html);
      extrationVideos = await crawlerService.extract(request, pornhubService.querys.$name$url$time$thumb);
    }

    const videos = extrationVideos.data.videos
      .map(
        video => new VideoModel({ siteId: site.id, ...video })
      );

    for (let x = 0; x < videos.length; x++) {
      videos[x].tags = new Array();
      request.url = videos[x].url;

      let extrationTags = await crawlerService.extract(request, pornhubService.querys.$tags$views)

      if (extrationTags.data.tags.length === 0) {
        request.cookie = pornhubService.extractCookieFromScript(extrationTags.html);
        extrationTags = await crawlerService.extract(request, pornhubService.querys.$tags$views);
      }

      videos[x].tags.push(...extrationTags.data.tags);
      videos[x].views = extrationTags.data.views;
      videosService.create(videos[x])
        .then(e => console.log('sucesso'));
    }

    res.send(videos);
  }

}

module.exports = new CrawlerController();
