import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
	useEffect(() => {
		// 여기서 데이터베이스에 있는 값을 가져온다
		axios.get("/api/values").then((response) => {
			console.log("response", response.data);
			setLists(response.data);
		});
	}, []);

	const [lists, setLists] = useState([]);
	const [value, setValue] = useState("");

	const changeHandler = (event) => {
		setValue(event.currentTarget.value);
	};
	const submitHandler = (event) => {
		event.preventDefault(); // 사용자 정의 이벤트 없이 일어나는 기본 form button submit 이벤트 방지

		axios.post("/api/value", { value: value }).then((response) => {
			if (response.data.success) {
				console.log("response", response);
				setLists([...lists, response.data]);
				setValue("");
			} else {
				alert("값을 DB에 넣는데 실패했습니다");
			}
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div className="container">
					{
						//DB 데이터 출력
						lists &&
							lists.map((list, index) => (
								<li key={index}>{list.value}</li>
							))
					}
					<form className="example" onSubmit={submitHandler}>
						<input
							type="text"
							placeholder="입력해주세요"
							onChange={changeHandler}
							value={value}
						/>
						<button type="submit">확인</button>
					</form>
				</div>
			</header>
		</div>
	);
}

export default App;
