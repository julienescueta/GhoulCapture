function create() {
  return new DataUtils();
}

exports.create = create;

var DataUtils = function DataUtils() {
};

function randomString(chars, length) {
  var string = "";
  for (x = 0; x < length; x++) {
    i = Math.floor(Math.random() * chars.length);
    string += chars.charAt(i);
  }
  return string;
}

DataUtils.prototype.randomAlphaString = function randomAlphaString(length) {
  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return randomString(chars, length);
}

DataUtils.prototype.randomAlphaNumericString = function randomAlphaNumericString(length) {
  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  return randomString(chars, length);
}

DataUtils.prototype.randomNumericString = function randomNumericString(length) {
  chars = "1234567890";
  return randomString(chars, length);
}

DataUtils.prototype.randomEmailString = function randomEmailString(length) {
  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  return randomString(chars, length) + "@" + randomString(chars, length) + ".com";
}
