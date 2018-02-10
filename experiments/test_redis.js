
 // usind ioredis https://www.npmjs.com/package/ioredis
 // saving a list of javascript objects as a a list of json.

const Redis = require('ioredis');
const redis = new Redis();

// installed redis and launch automatically when computer starts.
// installed ioredis as a npm package.

function onChange (object, onChange) {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      onChange();
      return Reflect.defineProperty(target, property, descriptor);
    },
    deleteProperty(target, property) {
      onChange();
      return Reflect.deleteProperty(target, property);
    }
  };

  return new Proxy(object, handler);
};

async function init() {

  const _sites = JSON.parse(await redis.get('sites'));

  var sites = onChange(_sites, function () {
    console.log('saving sites')
    redis.set('sites', JSON.stringify(sites));
  });

  return sites;

}

sites = init();
console.log(sites);
