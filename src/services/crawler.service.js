const phantom = require('phantom');

class CrawlerService {

  constructor() { }

  async extract(request, querys) {
    let data, html;
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.open(request.url, {
      headers: request.cookie ? { cookie: request.cookie } : {}
    });

    page.on('onConsoleMessage', function (msg) {
      console.log('console: ' + msg);
    });

    html = await page
      .property('content');

    data = await page
      .evaluate(
        function (querys) {
          var elements = new Object();

          querys
            .forEach(
              function (query) {
                var tags = document.querySelectorAll(query.query);

                for (var kObject in query.objects) {
                  var object = query.objects[kObject];

                  var exists = typeof elements[kObject] === 'object';
                  elements[kObject] = exists ? elements[kObject] : new Array();
                  

                  for (var i = 0; i < tags.length; i++) {
                    var manyFields = typeof object.fields === 'object';
                    var merge = typeof elements[kObject][i] === 'object';
                    var element = merge ? elements[kObject][i] : (manyFields ? new Object() : '');

                    if (merge || manyFields) {
                      for (var kField in object.fields) {
                        element[kField] = tags[i][object.fields[kField]];
                      }
                    } else {
                      if (object.hasOwnProperty('fields')) {
                        element = tags[i][object.fields];
                      } else {
                        elements[kObject] = tags[i][object];
                      }
                    }

                    !merge && object.hasOwnProperty('fields') && elements[kObject].push(element);
                  }
                }
              }
            );

          return elements;
        },
        querys
      );

    return { data, html };
  }
};

module.exports = new CrawlerService();
