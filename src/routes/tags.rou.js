const controller = require('../controllers/tags.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/', controller.getAll);

module.exports = router;
