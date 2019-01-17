
const production = require('./prod.env')
  , develop = require('./deve.env')
  , test = require('./test.env');

let environment = {
  ...develop,
  get argv() {
    const args = process.argv
      .slice(2)
      .reduce(
        (prev, curr) => {
          const [key, value] = curr.split('=');
          prev[key] = value;
          return prev;  
        }, {}
      );
      
    return args;
  }
};

if (environment.argv.mode) {
  environment = environment.argv.mode !== 'test' ? environment : Object.assign(environment, test);
} else {
  environment = Object.assign(environment, production);
}

module.exports = Object.freeze(environment);
