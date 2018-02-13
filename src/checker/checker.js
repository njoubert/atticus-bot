const a = require('.');


console.log((new Date()).toString(), "checking sites");
a.check();

// Exit if we silently fail.
process.on('unhandledRejection', (err) => { 
  console.error(err)
  process.exit(1)
})