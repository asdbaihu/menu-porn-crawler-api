const controller = require('../controllers/videos.cnt')
  , express = require('express')
  , router = express.Router();

router.get('/', controller.getAll);
router.post('/:id/click', controller.click);

module.exports = router;
