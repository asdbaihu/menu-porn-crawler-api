const controller = require('../controllers/base.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/', controller.index);

module.exports = router;
