const fs = require('fs');

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
      var ret = Reflect.defineProperty(target, property, descriptor);
      onChange();
      return ret;
    },
    deleteProperty(target, property) {
      var ret = Reflect.deleteProperty(target, property);
      onChange();
      return ret;
    }
  };

  return new Proxy(object, handler);
};


function init () {
  
  const _db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  //make an onchange handlewr
  //save every time a change happens
  //doing it sync to avoid corrupting data

  const db = onChange(_db, function() {
    fs.writeFileSync('db.json', JSON.stringify(db));
  });

  return db;
}

db = init();

module.exports = db









