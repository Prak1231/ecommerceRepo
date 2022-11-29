'use strict'

module.exports = {
  apps: [
    {
      name: 'expressjs-boilerplate',
      script: 'app.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      ignore_watch: ['.git', 'node_modules', 'logs', 'package-lock.json'],
      max_memory_restart: '1G',
      autorestart: true,
    },
  ],
}
