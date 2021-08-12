// 필요한 모듈들을 가져온다
const express = require("express");

const db = require("./db");

const app = express();
app.use(express.json());

db.pool.query(
	`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
    )`,
	(err, results, fields) => {
		console.log(`create table err:${err}`);
		console.log(`create table results`, results);
	}
);

app.get("/api/values", function (req, res) {
	console.log(`call lists req:${req}`);
	db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
		console.log(`call lists err:${err}`);
		console.log(`call lists result:${results}`);
		console.log(`call lists fileds:${fileds}`);
		if (err) return res.status(500).send(err);
		else return res.json(results);
	});
});

app.post("/api/value", function (req, res) {
	db.pool.query(
		`INSERT INTO lists (value) VALUES("${req.body.value}");`,
		(err, results, fields) => {
			if (err) {
				return res.status(500).send(err);
			} else {
				return res.json({ success: true, value: req.body.value });
			}
		}
	);
});
app.listen(5000, () => {
	console.log("server listening 5000....");
});
