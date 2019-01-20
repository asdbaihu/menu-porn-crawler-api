const controller = require('../controllers/crawler.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/run/pornhub', controller.pornHub);

module.exports = router;
