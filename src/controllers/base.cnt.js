
const { mode } = require('../environment');

class baseController {
  constructor() { }

  index(req, res) {
    res.status(200).send(`<center style="font-size: 5em; font-family: 'Arial'; line-height: 95vh;">Api works in ${mode}</center>`);
  }
}

module.exports = new baseController();
