
/**
 * Fetches location data for a parsed maxmind database
 * from a given ip-address. Be sure to run the ./bin
 * scripts to preload your redis instance first.
 *
 * @param {RedisClient} redis
 * @param {String} [prefix]
 * @return {Function}
 * @public
 */

module.exports = function (redis, prefix) {
  prefix = prefix || 'geo';
  var blocks = prefix + ':blocks';
  var location = prefix + ':location';
  return function (ip, fn) {
    var score = toScore(ip);
    if (!score) return fn();
    var args = [blocks, score, 0, 'WITHSCORES', 'LIMIT', 0, 1];
    redis.zrevrangebyscore(args, function (err, city) {
      if (err) return fn(err);
      if (!city.length) return fn();
      var id = city[0].split('_')[0];
      redis.hget(location, id, function (err, data) {
        if (err) return fn(err);
        else fn(null, JSON.parse(data));
      });
    });
  };
};

/**
 * Converts an ip to a sortedset score.
 *
 * @param {String} ip
 * @return {Number}
 * @private
 */

function toScore (ip) {
  var score = 0;
  var parts = ip.split('.');
  parts.forEach(function (value) {
    score = score * 256 + parseInt(value, 10);
  });
  return score;
}