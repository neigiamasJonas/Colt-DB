const express = require('express');
const app = express();
const port = 3003;

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
//////////  Fault is MARIJA DB  //////////

app.get("/scooters", (req, res) => {
    const sql = `
    SELECT
    *
    FROM Scooters
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.listen(port, () => {
  console.log(`Alo - alo, Baločka Jonas klauso - ${port}`)
})


///////////  CREATE  /////////////

app.post("/scooters", (req, res) => {
  const sql = `
  INSERT INTO Scooters
  (reg_code, state, km, date, busy)
  VALUES(?, ?, ?, ?, ?)
`;
  con.query(sql, [req.body.reg_code, req.body.state, req.body.km, req.body.date, req.body.busy], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});

///////////  DELETE  /////////////

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


//////////  EDIT /////////////

app.put("/scooters/:id", (req, res) => {
  const sql = `
  UPDATE Scooters
  SET reg_code = ?, state = ?, km = ?, date = ?, busy = ?
  WHERE id = ?
`;
  con.query(sql, [req.body.reg_code, req.body.state, req.body.km, req.body.date, req.body.busy, req.params.id], (err, result) => {   
    if (err) throw err;   
    res.send(result);
  });
});