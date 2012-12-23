var url = 'http://test.resaas.com:888';

var Ghoul = require('./modules/ghoulcapture.js').create({
  "baseurl": url
});

var utils = require('utils');

casper.start(url);

var hrefs, imageName = 0;
var visitMap = {};

casper.then(function getAnchorHrefs() {
  hrefs = Ghoul.getAnchorHrefs();
});

casper.then(function () {
  for (var i = 0; i < hrefs.length; i++) {
    var href = hrefs[i];
    console.log('href: ' + href);
    console.log('visitMap[href]: ' + visitMap[href]);
    if (visitMap[href] !== true) {

      if (href.indexOf(url) === 0) {
        casper.thenOpen(href);

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

      visitMap[href] = true;
    }
  }
  utils.dump(visitMap);
});

casper.run(function () {
  casper.test.done();
});