app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { movies: data });
    });
  });
  
  // Create a new movie
  app.post("/movies", function(req, res) {
    connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
  
      // Send back the ID of the new movie
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });
  
  // Retrieve all movies
  app.get("/movies", function(req, res) {
    connection.query("SELECT * FROM movies;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.json(data);
    });
  });
  
  // Update a movie
  app.put("/movies/:id", function(req, res) {
    connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });
  
  // Delete a movie
  app.delete("/movies/:id", function(req, res) {
    connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });