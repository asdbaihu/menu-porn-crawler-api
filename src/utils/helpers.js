const helpers = {
  smartMerge(target, source) {
    for (const key in target) {
      if (key in source && source[key] !== undefined) {
        target[key] = isNaN(target[key]) ? source[key] : parseFloat(source[key]);
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
