function create(options) {
  return new GhoulCapture(options);
}

exports.create = create;

var GhoulCapture = function GhoulCapture(options) {
  this.baseurl = options.baseurl;
};

GhoulCapture.prototype.getUrls = function getUrls() {
  var hrefs = casper.evaluate(function getAnchorHrefs() {
    var returnHref, hrefArray = [], anchors = __utils__.findAll('a');

    var pattern = /^((http|https):\/\/)/;

    for (var i = 0; i < anchors.length; i++) {
      var href = anchors[i].getAttribute('href');
      // check if href is relative or is of http(s)
      if (href && (href.indexOf('/') === 0 || pattern.test(href))) {
        hrefArray.push(href);
      }
    }

    return hrefArray;
  });

  for (var i = 0; i < hrefs.length; i++) {
    if (hrefs[i].indexOf('/') === 0) {
      hrefs[i] = this.baseurl + hrefs[i];
      console.log('hrefs[i]: ' + hrefs[i]);
    }
  }
  return hrefs;
}
