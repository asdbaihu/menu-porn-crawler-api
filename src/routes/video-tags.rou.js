const controller = require('../controllers/videos.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/', controller.getAll);

module.exports = router;
