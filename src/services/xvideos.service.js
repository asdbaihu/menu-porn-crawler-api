class XVideosService {

  constructor() {
    this.querys = {
      $name$url$thumb: [
        {
          query: '.mozaique .thumb-block .thumb-under p a[href][title]',
          objects: {
            videos: {
              fields: {
                name: 'textContent',
                url: 'href'
              }
            }
          }
        },      
        {
          query: '.mozaique .thumb a[href] img',
          objects: {
            videos: {
              fields: {
                thumb: 'src'
              }
            }
          }
        }
      ],
      $tags$views$time: [
        {
          query: '.video-tags-list li a[href]:not(.view-more)',
          objects: {
            tags: {
              fields: 'textContent'
            }
          }
        },                  
        {
          query: '.page-title .duration',
          objects: {
            time: 'textContent'
          }
        },
        {
          query: '#nb-views-number',
          objects: {
            views: 'textContent'
          }
        }
      ]
    }
  }
};

module.exports = new XVideosService();
