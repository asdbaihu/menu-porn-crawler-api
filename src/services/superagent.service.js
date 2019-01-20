const superagent = require('superagent');

class SuperAgentService {

  constructor() { }

  get(url, cookie) {
    return new Promise(
      (res, rej) => {
        const request = superagent.get(url);

        cookie && request
          .set('cookie', cookie);

        request
          .end(
            (e, r) => {
              if (e) {
                rej(e);
              } else {
                res(r);
              }
            }
          );
      }
    );
  }
}

module.exports = new SuperAgentService();
