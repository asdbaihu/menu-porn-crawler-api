const cheerio = require('cheerio');

class CrawlerService {

  constructor() { }

  extractFromHtml(html, querys, source) {
    const array = Array.isArray(source) ? source : new Array();
    const $ = cheerio.load(html);

    querys.forEach(
      ({ query, fields }) => {
        $(query)
          .each(
            function (i) {
              const merge = typeof array[i] === 'object';
              const element = merge ? array[i] : new Object();

              for (const key in fields) {
                element[key] = fields[key] === 'text' ? $(this).text() : this.attribs[fields[key]];
              }

              !merge && array.push(element);
            }
          );
      }
    );
  }
};

module.exports = new CrawlerService();
