
const { mode } = require('../environment');

const baseController = {

  index(req, res) {
    res.send(`<center style="font-size: 5em; font-family: 'Arial'; line-height: 95vh;">Api works in ${mode}</center>`);
  },

  testSite(req, res) {
    res.send(`<script>
      const xml = new XMLHttpRequest();
  
      xml
        .open(
          'GET',
          '//localhost:3000/v1/crawler/run',
        );
  
      xml.onreadystatechange = _ => {
        if (xml.readyState === 4) {
          const data = JSON.parse(xml.responseText);
  
          data.forEach(
            e => {
              const img = document.createElement('img');
              const a = document.createElement('a');
              img.src = e.thumb;
              a.title = e.name;
              a.href = e.url;
              a.appendChild(img);
              document.body.appendChild(a);
            }
          );
        }
      }
  
      xml.send();
    </script>`);
  }
}

module.exports = baseController;
