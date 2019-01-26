class XVideosService {

  constructor() {
    this.querys = {
      $name$url$time$thumb: [
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
          query: '.mozaique .thumb-under .duration',
          objects: {
            videos: {
              fields: {
                time: 'textContent'
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
      $tags$views: [
        {
          query: '.video-tags-list li a[href]:not(.view-more)',
          objects: {
            tags: {
              fields: 'textContent'
            }
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
