const superagent = require('superagent');

class SuperAgentService {

  constructor() { }

  get(url, cookie) {
    return new Promise(
      (res, rej) => {
        if (cookie) {
          superagent
            .get(url)
            .set('cookie', cookie)
            .end(
              (e, r) => {
                if (e) {
                  rej(e);
                } else {
                  res(r);
                }
              }
            );
        } else {
          superagent
            .get(url)
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
      }
    );
  }

  pornHub(html, cb) {
    const startString = '<!--';
    const endString = '//-->';

    const start = html.indexOf(startString) + startString.length;
    const end = html.indexOf(endString);

    return `const document = {
      cookie: '',
      location: {
        reload: () => {}
      }
    };

    if (typeof module !== 'undefined') {
      module.exports = undefined;
      module = undefined;
    }


    ${html.substring(start, end)}
  
    go();

    ${cb} = document.cookie;
    `;
  }
}

module.exports = new SuperAgentService();
