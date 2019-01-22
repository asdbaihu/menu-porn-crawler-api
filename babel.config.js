const presets = [
  [
    '@babel/preset-env'
    , {
      targets: {
        node: '3'
      }
      , useBuiltIns: 'usage'
    }
  ]
];

const plugins = [];

module.exports = { presets, plugins };
