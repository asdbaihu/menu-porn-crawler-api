const helpers = {
  smartMerge(target, source) {
    for (const key in target) {
      if (key in source && source[key] !== undefined) {
        target[key] = typeof target[key] === 'number' ? parseFloat(source[key]) : source[key];
      }
    };
  },
  getPatchString(string, startString, endString) {
    const start = string.indexOf(startString) + startString.length;
    const end = string.indexOf(endString);
    return string.substring(start, end);
  }
};

module.exports = helpers;
