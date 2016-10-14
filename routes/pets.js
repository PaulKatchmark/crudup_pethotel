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
    client.query('SELECT * FROM pets left JOIN owners ON owners.id = pets.owner_id;',
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

router.get('/:id', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      return;
    }
    client.query('SELECT * FROM pets WHERE id = $1;', [req.params.id], function(err, result){
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


router.post('/', function(req, res){
  pool.connect(function(err, client, done){
      try{
    if (err) {
      console.log('Error connecting the DB', err);
      res.sendStatus(500);
      return;
    }

    client.query('INSERT INTO pets (name, breed, color, owner_id) VALUES ($1, $2, $3, $4) returning *;',
    [req.body.name, req.body.breed, req.body.color, req.body.owner_id],
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





router.put('/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var breed = req.body.breed;
  var color = req.body.color;

  pool.connect(function(err, client, done){
    try {
      if (err) {
        console.log('Error connecting the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE pets SET name=$1, breed=$2, color=$3 WHERE id=$4 RETURNING *;',
      [name, breed, color, id],
      function(err, result) {
        if (err) {
          console.log('Error querying database', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });
});


// router.delete('/:id', function(req, res){
//   var id = req.params.id;
//
//   pool.connect(function(err, client, done){
//     try {
//       if (err) {
//         console.log('Error connecting to DB', err);
//         res.sendStatus(500);
//         return;
//       }
//
//       client.query('DELETE FROM pets WHERE id=$1;', [id], function(err){
//         if (err) {
//           console.log('Error querying the DB', err);
//           res.sendStatus(500);
//           return;
//         }
//
//         res.sendStatus(204);
//       });
//     } finally {
//       done();
//     }
//   });












module.exports = router;
