
const express = require('express')
  , Sequelize = require('sequelize')
  , Op = Sequelize.Op

  , { response, log } = require('../utils/errors')

  , SiteModel = require('../models/site.model')
  , VideoModel = require('../models/video.model')
  , VideoTagsModel = require('../models/video-tags.model')

  , sitesService = require('../services/sites.service')
  , videosService = require('../services/videos.service')
  , pornhubService = require('../services/pornhub.service')
  , xvideosService = require('../services/xvideos.service')
  , crawlerService = require('../services/crawler.service')
  , videoTagsService = require('../services/video-tags.service');

class CrawlerController {
  constructor() { }

  async run(req = express.request, res = express.response) {
    try {
      const sites = await sitesService
        .findAll()
        .catch(response.r1);

      if (sites.length > 0) {
        for (let i = 0; i < sites.length; i++) {
          const site = new SiteModel(sites[i]);
        }

      } else {
        response.r6('not founded sites');
      }
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }

  async pornHub(req = express.request, res = express.response) {
    try {
      const site = await sitesService
        .findOne({ where: { name: 'PornHub' } })
        .then(data => new SiteModel(data))
        .catch(response.r1);

      const request = {
        url: site.url
      };

      let extrationVideos = await crawlerService
        .extract(request, pornhubService.querys.$name$url$time$thumb)
        .catch(response.r11);

      if (extrationVideos.data.length === 0) {
        request.cookie = pornhubService.extractCookieFromScript(extrationVideos.html);
        extrationVideos = await crawlerService
          .extract(request, pornhubService.querys.$name$url$time$thumb)
          .catch(response.r11);
      }

      const videos = extrationVideos.data.videos
        .map(
          video => new VideoModel({ siteId: site.id, ...video })
        );

      for (let x = 0; x < videos.length; x++) {
        videos[x].tags = new Array();
        request.url = videos[x].url;

        let extrationTags = await crawlerService
          .extract(request, pornhubService.querys.$tags$views)
          .catch(response.r11);

        if (extrationTags.data.tags.length === 0) {
          request.cookie = pornhubService.extractCookieFromScript(extrationTags.html);
          extrationTags = await crawlerService
            .extract(request, pornhubService.querys.$tags$views)
            .catch(response.r11);
        }

        videos[x].tags.push(...extrationTags.data.tags);
        videos[x].views = extrationTags.data.views;

        const video = await videosService
          .create(videos[x])
          .catch(response.r1);

        videos[x].tags
          .forEach(
            tag => videoTagsService
              .create(new VideoTagsModel({ videoId: video.dataValues.id, name: tag }))
              .catch(response.r1)
          );
      }

      res.send(videos);
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }


  async xVideos(req = express.request, res = express.response) {
    try {
      const site = await sitesService
        .findOne({ where: { name: 'xVideos' } })
        .then(data => new SiteModel(data))
        .catch(response.r1);

      const request = {
        url: site.url
      };

      let extrationVideos = await crawlerService
        .extract(request, xvideosService.querys.$name$url$time$thumb)
        .catch(response.r11);

      const videos = extrationVideos.data.videos
        .map(
          video => new VideoModel({ siteId: site.id, ...video })
        );

      for (let x = 0; x < videos.length; x++) {
        videos[x].tags = new Array();
        request.url = videos[x].url;

        let extrationTags = await crawlerService
          .extract(request, xvideosService.querys.$tags$views)
          .catch(response.r11);

        videos[x].tags.push(...extrationTags.data.tags);
        videos[x].views = extrationTags.data.views;

        const video = await videosService
          .findOrCreate({
            where: {
              [Op.or]: [
                { url: videos[x].url },
                { thumb: videos[x].thumb }
              ]
            },
            defaults: videos[x]
          })
          .then(result => result[0])
          .catch(response.r1);

        videos[x].tags
          .forEach(
            tag => {
              videoTagsService
                .create(new VideoTagsModel({ videoId: video.dataValues.id, name: tag }))
                .catch(response.r1)
            }
          );
      }

      res.send(videos);
    } catch (e) {
      res.status(e.status).send(e.erro);
    }
  }
}

module.exports = new CrawlerController();
