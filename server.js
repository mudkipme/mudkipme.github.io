'use strict';

const express = require('express');
const xhub = require('express-x-hub');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const config = require('./config.json');
const app = express();

app.use(xhub({ secret: config.secret }));
app.use(bodyParser.json());

app.post('/push', function (req, res) {
  if (!req.isXHubValid()) {
    return res.status(403).end();
  }
  if (!req.body || req.body.ref !== 'refs/heads/hexo') {
    return res.status(204).end();
  }
  exec('git pull --recurse && git submodule update --recursive && hexo deploy --generate', {cwd: __dirname}, function (err, stdout, stderr) {
    if (err !== null) {
      console.log('exec error: ' + err);
      res.status(500).send(err);
    }
    console.log('stderr: ' + stderr);
    res.send(stdout);
  });
});

const server = app.listen(config.port || 3000, function () {
  console.log('Listening on port %d', server.address().port);
});