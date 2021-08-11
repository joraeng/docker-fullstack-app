// 필요한 모듈들을 가져온다
const express = require("express");

const db = require("./db");

// Express 서버를 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
// app.use(bodyParser.json()), 이제부터는 body-parser도 express에 포함되어있음
app.use(express.json());

// // 테이블 생성하기
// db.pool.query(
// 	`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
//     )`,
// 	(err, results, fields) => {
// 		console.log(`err:${err}`);
// 		console.log(`results`, results);
// 	}
// );

//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기
app.get("/api/values", function (req, res) {
	//데이테베이스에서 모든 정보 가져오기
	console.log(`req:${req}`);
	db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
		console.log(`err:${err}`);
		console.log(`result:${results}`);
		console.log(`fileds:${fileds}`);
		if (err) return res.status(500).send(err);
		else return res.json(results);
	});
});
// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣어주기
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

// Express 서버 포트 5050번 시작
app.listen(5000, () => {
	console.log("어플리케이션이 서버 500번 포트에서 연결되었습니다.");
});
