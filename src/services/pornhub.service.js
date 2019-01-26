const { getPatchString } = require('../utils/helpers');

class PornHubService {

  constructor() {
    this.querys = {
      $name$url$time$thumb: [
        {
          query: '#hotVideosSection li .title a',
          objects: {
            videos: {
              fields: {
                name: 'text',
                url: 'href'
              }
            }
          }
        },                
        {
          query: '#hotVideosSection .duration',
          objects: {
            videos: {
              fields: {
                time: 'textContent'
              }
            }
          }
        },
        {
          query: '#hotVideosSection li .phimage .img img',
          objects: {
            videos: {
              fields: {
                thumb: 'src'
              }
            }
          }
        }
      ],
      $tags$views: [
        {
          query: '.tagsWrapper a[href]',
          objects: {
            tags: {
              fields: 'textContent'
            }
          }
        },        
        {
          query: '.views .count',
          objects: {
            views: 'textContent'
          }
        }
      ]
    }
  }

  extractCookieFromScript(html) {
    const script = getPatchString(html, '<!--', '//-->');
    let cookie = 'cookie';

    eval(`const document = { cookie: '', location: { reload() {} } };
    if (typeof module !== 'undefined') {
      module.exports = undefined;
      module = undefined;
    }
    ${script}
    go();
    ${cookie} = document.cookie;`);

    return cookie;
  };
};

module.exports = new PornHubService();
