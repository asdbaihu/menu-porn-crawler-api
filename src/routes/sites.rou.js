const controller = require('../controllers/sites.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/', controller.getAll);

module.exports = router;
