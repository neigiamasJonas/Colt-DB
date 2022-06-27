const express = require('express');
const app = express();
const port = 3005;

/// Isikopinta
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

/// Isikopinta.. kad veiktu.. nesigilinam
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Fault",
  });


//Routes
app.get('/', (req, res) => {
  res.send('Tu man sakai: Bye Bye Bye Bye!')
})

app.get('/zuikis', (req, res) => {
    res.send('Zuikis, puikis')
  })


//////////////////////////////////////////
//////////  READ SCOOTERS ////////// + LEFT JOIN

app.get("/scooters", (req, res) => {
    const sql = `
    SELECT
    sc.color_title AS color, reg_code, state, km, date, busy, s.id
    FROM Scooters AS s
    LEFT JOIN Scooters_color AS sc
    ON s.color_id = sc.id
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.listen(port, () => {
  console.log(`Alo - alo, Baločka Jonas klauso - ${port}`)
})


//////////  READ SCOOTERS_COLOR ////////// + RIGHT JOIN

app.get("/scooters_color", (req, res) => {
  const sql = `
  SELECT
  sc.color_title, sc.id, COUNT(s.id) AS scooter_count
  FROM Scooters AS s
  RIGHT JOIN Scooters_color AS sc                  
  ON s.color_id = sc.id
  GROUP BY sc.id
  ORDER BY COUNT(s.id) DESC
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});



///////////  CREATE  Scooters /////////////

app.post("/scooters", (req, res) => {
  const sql = `
  INSERT INTO Scooters
  (reg_code, state, km, date, busy, color_id)
  VALUES(?, ?, ?, ?, ?, ?)
`;
  con.query(sql, [req.body.reg_code, req.body.state, req.body.km, req.body.date, req.body.busy, req.body.color !== '0' ? req.body.color : null], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});


///////////  CREATE  Scooters_color /////////////

app.post("/scooters_color", (req, res) => {
  const sql = `
  INSERT INTO Scooters_color
  (color_title)
  VALUES(?)
`;
  con.query(sql, [req.body.color_title], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});


///////////  DELETE  Scooters /////////////

app.delete("/scooters/:id", (req, res) => {
  const sql = `
  DELETE FROM Scooters
  WHERE id = ?
`;
  con.query(sql, [req.params.id], (err, result) => {     
    if (err) throw err;   
    res.send(result);
  });
});


///////////  DELETE  Scooters_color /////////////

app.delete("/scooters_color/:id", (req, res) => {
  const sql = `
  DELETE FROM Scooters_color
  WHERE id = ?
`;
  con.query(sql, [req.params.id], (err, result) => {     
    if (err) throw err;   
    res.send(result);
  });
});



//////////  EDIT + EDIT color  /////////////

app.put("/scooters/:id", (req, res) => {
  const sql = `
  UPDATE Scooters
  SET reg_code = ?, state = ?, km = ?, date = ?, busy = ?, color_id = ?
  WHERE id = ?
`;
  con.query(sql, [req.body.reg_code, req.body.state, req.body.km, req.body.date, req.body.busy, req.body.color_id, req.params.id], (err, result) => {   
    if (err) throw err;   
    res.send(result);
  });
});