'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: '127.0.0.1',
  MODE: '"history"',
  TARGET: '"http://192.168.100.183:8866"',   // 内网
  // TARGET: '"http://222.249.173.36:28866"',   // 外网
})
