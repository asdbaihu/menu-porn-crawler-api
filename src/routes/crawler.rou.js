const controller = require('../controllers/crawler.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/run', controller.run);

module.exports = router;
