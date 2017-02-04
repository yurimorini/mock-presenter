var Twig = require('twig');
var fs = require('fs');
var path = require('path');
var ncp = require('ncp');

"use strict";

const options = {
  template:   './template/index.html',
  images:     './images/',
  assets:     './assets/',
  descriptor: './desc.json',
  outfile:    'index.html',
  dist:       './build-dist',
};

const defs = {
  prev: 'Precedente',
  next: 'Successiva'
};

const
  data = require(options.descriptor),
  params = Object.assign(defs, data);

function createIfNotExists(dir) {
  try {
    const stat = fs.statSync(dir);
  } catch (e) {
    fs.mkdirSync(dir);
  }
}

Twig.renderFile(options.template, params, (err, html) => {
  const
    destDir = path.join(options.dist, data.destination),
    outfile = path.join(options.dist, options.outfile);

  createIfNotExists(options.dist);
  createIfNotExists(destDir);

  fs.writeFileSync(outfile, html);
  ncp(options.assets, options.dist);

  const images = data.list
    .map(function(item) {
      return item.image;
    })
    .forEach(function(image) {
      const
        source = path.join(options.images, image),
        dest = path.join(destDir, image);
      ncp(source, dest, function(err) {
        if (err) console.log(err);
      });
    });
});
