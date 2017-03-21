var pg = require('pg');

// override the framework prototype
// use CONFIG files for connection string
F.database = function(dbName, callback) {
  return pg.connect({
    user: 'Hamlet_Tamazian',
    database: 'ao'
  }, callback);
};

