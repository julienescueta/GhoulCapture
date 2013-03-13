var url = 'http://test.resaas.com:888';

var Ghoul = require('./modules/ghoulcapture.js').create({
  "baseurl": url
});

var datautils = require('./modules/datautils.js').create();

var utils = require('utils');

casper.start(url);

var urls, imageName = 0;
var visitMap = {};

casper.then(function getUrls() {
  urls = Ghoul.getUrls();
});

casper.then(function () {
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    console.log('url: ' + url);
    console.log('visitMap[url]: ' + visitMap[url]);
    if (visitMap[url] !== true) {

      if (url.indexOf(url) === 0) {
        casper.thenOpen(url);

        casper.then(function capture() {
          casper.capture(imageName + '.png', {
            top: 0,
            left: 0,
            height: 1024,
            width: 1280
          });
          imageName += 1;
        });
      }

      visitMap[url] = true;
    }
  }
  utils.dump(visitMap);
});

casper.run(function () {
  casper.test.done();
});

function capture(url, visitMap) {
  if (visitMap[url]) {
    return;
  }
  
  if (visitMap[url] !== true) {
    // add entry to visitMap

    // process page
  
  }
  
  casper.thenOpen(url);

}

function process(url) {
  casper.then(function open() {
    casper.open(url);
  });

  casper.then(function capture() {
    casper.capture(imageName + '.png', {
      top: 0,
      left: 0,
      height: 1024,
      width: 1280
    });
  });
}

