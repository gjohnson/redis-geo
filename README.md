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

## Options

```sh
$ redis-geo --help

  Usage: redis-geo [options] [command]

  Commands:

    import-blocks <file>   imports the location blocks
    import-locations <file> imports the location details by city
    lookup <ip>            looks up the geo data for the ip

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -p, --port [port]             redis port
    -h, --host [host]            redis host
    -n, --namespace [namespace]  namespace in redis
```

## TODO:

  - hashkey sharding for memory optimizations

## License

MIT