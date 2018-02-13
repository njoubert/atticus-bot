const fs = require('fs');
const path = require('path');

require('dotenv').config();

var onChange = function (object, onChange) {
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


module.exports = (function() {
  DB_PATH = process.env.DB_FILE || path.join(__dirname,'.db.json');
  var _db = {}

  try {
    _db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    console.log("loaded database");
  } catch (err) {
    console.log("failed parsing file, going with clean database");
    console.log(err);
  }


  //make an onchange handlewr
  //save every time a change happens
  //doing it sync to avoid corrupting data
  const db = onChange(_db, function() {
    fs.writeFileSync(DB_PATH, JSON.stringify(db));
  });

  return db;
})();
