# redis-geo

GeoIp backed by redis. Port of examples provided by [Redis in Action](http://www.manning.com/carlson/). Buy the book!

## Module Usage

```js
var redis = require('redis').createClient();
var geoip = require('redis-geo')(redis);

geoip('71.75.248.222', function (err, info) {
  if (err) throw err;
  console.log(info);
});
```

Example output:

```js
{
  country: 'US',
  state: 'NC',
  city: 'Waxhaw',
  zip: '28173',
  lat: '34.9273',
  lng: '-80.7278',
  metro: '517',
  areacode: '704'
}
```

## Importing Data

First import the block via the csv dump.

```sh
$ redis-geo import-blocks /to/to/blocks.csv
```

Next, import the locations.

```sh
$ redis-geo import-locations path/to/locations.csv
```

## License

MIT