const controller = require('../controllers/crawler.cnt')
  , express = require('express')
  , router = express.Router();

router.post('/run/pornhub', controller.pornHub);
router.post('/run/xvideos', controller.xVideos);

module.exports = router;
