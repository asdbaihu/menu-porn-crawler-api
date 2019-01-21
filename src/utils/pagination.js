const { smartMerge } = require('./helpers');

class Pagination {
  constructor(params) {
    this.order = undefined;
    this.pages = 0;
    this.total = 0;
    this.page = 1;
    this.limit = 10;

    if (typeof params !== 'object') return;
    smartMerge(this, params);
  }

  query(total) {
    this.pages = Math.ceil(total / this.limit);
    this.total = total;
    const filter = {
      order: this.order.split(',').map(v => v.split(' ')),
      offset: this.limit * (this.page - 1),
      limit: this.limit
    };

    return filter;
  }
}

module.exports = Pagination;
