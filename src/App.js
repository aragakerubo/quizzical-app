import { useState, useEffect } from "react";
import "./App.css";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";

function App() {
	const [startQuiz, setStartQuiz] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		const url = `https://opentdb.com/api.php?amount=10&encode=base64&category=${value}`;

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();

				let results = json.results.map((result) => {
					let answers = [
						...result.incorrect_answers,
						result.correct_answer,
					];
					answers = answers.sort((a, b) => 0.5 - Math.random());

					let newResult = { ...result, answers };

					return newResult;
				});

				setQuestions(results);
			} catch (error) {
				console.log("error:", error);
			}
		};

		fetchData();
	}, [value, startQuiz]);

	return (
		<div className="App">
			{startQuiz && (
				<StartPage
					handleStartQuiz={setStartQuiz}
					category={value}
					handleSetCategory={setValue}
				/>
			)}
			{!startQuiz && (
				<QuizPage
					questions={questions}
					handleReStartQuiz={setStartQuiz}
				/>
			)}
		</div>
	);
}

export default App;
