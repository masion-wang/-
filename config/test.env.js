'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"development"',
  HOST: '192.168.100.249',
  MODE: '"history"',
//TARGET: '"http://192.168.100.249:8866"',   // 内网
  // TARGET: '"http://222.249.173.36:48866"',   // 外网
})
