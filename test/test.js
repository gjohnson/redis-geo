
var redis = require('redis').createClient();
var geoip = require('..')(redis);
var assert = require('assert');

geoip('71.75.248.222', function (err, info) {
  assert(!err);
  assert(info.city);
  assert(info.state);
  assert(info.country);
});