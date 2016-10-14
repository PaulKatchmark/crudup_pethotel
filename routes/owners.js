var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(err, client, done) {
    try {
    if (err) {
      console.log('Error connecting to the DB', err);
        res.sendStatus(500);
        return;
    }
    client.query('SELECT owners.id, first_name, last_name FROM owners left JOIN pets ON owners.id = pets.owner_id GROUP BY owners.id;',
                    function(err, result) {
                      if (err) {
                        console.log('Error queryig the DB', err);
                        res.sendStatus(500);
                        return;
                      }
                      console.log('Got rows from the DB:', result.rows);
                      res.send(result.rows);
                    });
  } finally {
    done();
  }
  });
});


router.post('/', function(req, res){
  pool.connect(function(err, client, done){
      try{
    if (err) {
      console.log('Error connecting the DB', err);
      res.sendStatus(500);
      return;
    }

    client.query('INSERT INTO owners (first_name, last_name) VALUES ($1, $2) returning *;',
    [req.body.first_name, req.body.last_name],
    function(err, result){
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }
      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  } finally {
    done();
  }
  });
});
module.exports = router;
