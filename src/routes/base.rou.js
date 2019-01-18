const controller = require('../controllers/base.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/', controller.index);
router.get('/test', controller.testSite);

module.exports = router;
