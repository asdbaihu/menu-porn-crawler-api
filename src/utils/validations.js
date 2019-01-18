module.exports = {
  smartMerge(target, source) {
    for (const key in target) {
      if (key in source && source[key] !== undefined) {
        target[key] = source[key];
      }
    };
  }
}
