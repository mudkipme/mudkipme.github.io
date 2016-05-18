'use strict';

const express = require('express');
const xhub = require('express-x-hub');
const exec = require('child_process').exec;
const config = require('./config.json');
const app = express();

app.use(xhub({ secret: config.secret }));

app.post('/push', function (req, res) {
  if (!req.isXHubValid()) {
    return res.status(403).end();
  }
  exec('git pull && hexo deploy --generate', {cwd: __dirname}, function (err, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  });
  res.send('ok');
});

const server = app.listen(config.port || 3000, function () {
  console.log('Listening on port %d', server.address().port);
});