const base = require('./base.rou')
  , tags = require('./tags.rou')
  , sites = require('./sites.rou')
  , videos = require('./videos.rou')
  , videoTags = require('./video-tags.rou')
  , crawler = require('./crawler.rou');

module.exports = (app) => {
  app.use('/', base);
  app.use('/v1/tags', tags);
  app.use('/v1/sites', sites);
  app.use('/v1/videos', videos);
  app.use('/v1/crawler', crawler);
  app.use('/v1/video-tags', videoTags);
};
