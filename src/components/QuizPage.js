import React, { useState } from "react";

export default function QuizPage(props) {
	const [showResults, setShowResults] = useState(false);
	const [chosenAnswers, setChosenAnswers] = useState([]);
	const [score, setScore] = useState(0);

	function b64_to_utf8(str) {
		return decodeURIComponent(escape(window.atob(str)));
	}

	function getSiblings(elem) {
		// Setup siblings array and get the first sibling
		let siblings = [];
		let sibling = elem.parentNode.firstChild;

		// Loop through each sibling and push to the array
		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== elem) {
				siblings.push(sibling);
			}
			sibling = sibling.nextSibling;
		}

		return siblings;
	}

	function handleChooseAnswer(event) {
		if (showResults) return;
		let text = event.currentTarget.className;

		if (!text.match("active")) {
			event.currentTarget.className = "answer active";

			let siblingElements = getSiblings(event.currentTarget);

			let newAnswer = {
				questionId: event.currentTarget.parentNode.id,
				chosenAnswerId: event.currentTarget.id,
				chosenAnswer: event.currentTarget.innerText,
			};

			setChosenAnswers((prevState) => {
				let chosenAns = prevState.filter(
					(val) => val.questionId !== newAnswer.questionId
				);

				chosenAns = [...chosenAns, newAnswer];

				return chosenAns;
			});

			siblingElements.forEach((el) => {
				if (el.id !== event.currentTarget.id) {
					el.className = "answer";
				}
			});
		}
	}

	function handleCheckAnswers() {
		for (let index = 0; index < props.questions.length; index++) {
			let chosenAns = chosenAnswers.find(
				(el) => el.questionId === `question-${index}-choices`
			);
			let correctAns = b64_to_utf8(props.questions[index].correct_answer);

			if (chosenAns === undefined) {
				const element = document.getElementById(
					`quiz-${index}-answer-0`
				);

				if (element.innerText === correctAns) {
					element.className = "correct-answer";
				} else {
					element.className = "wrong-answer";
				}

				let siblingElements = getSiblings(element);
				siblingElements.forEach((el) => {
					if (el.innerText === correctAns) {
						el.className = "correct-answer";
					} else {
						el.className = "wrong-answer";
					}
				});
			} else {
				if (chosenAns.chosenAnswer === correctAns) {
					setScore((prevState) => prevState + 1);
					const element = document.getElementById(
						chosenAns.chosenAnswerId
					);
					element.className = "correct-answer";

					let siblingElements = getSiblings(element);
					siblingElements.forEach((el) => {
						if (el.id !== chosenAns.chosenAnswerId) {
							el.className = "inactive-answer";
						}
					});
				} else if (chosenAns.chosenAnswer !== correctAns) {
					const element = document.getElementById(
						chosenAns.chosenAnswerId
					);
					element.className = "wrong-answer";

					let siblingElements = getSiblings(element);
					siblingElements.forEach((el) => {
						if (
							el.id !== chosenAns.chosenAnswerId &&
							el.innerText !== correctAns
						) {
							el.className = "inactive-answer";
						} else if (
							el.id !== chosenAns.chosenAnswerId &&
							el.innerText === correctAns
						) {
							el.className = "correct-answer";
						}
					});
				}
			}
		}

		setShowResults(true);
	}

	// console.log(chosenAnswers);
	// console.log(props.questions);

	const questionsList = props.questions.map((question, index) => {
		const answersComponents = question.answers.map(
			(answer, answerindex) => (
				<p
					key={answerindex}
					className="answer"
					id={`quiz-${index}-answer-${answerindex}`}
					onClick={(event) => handleChooseAnswer(event)}
				>
					{b64_to_utf8(answer)}
				</p>
			)
		);
		return (
			<div className="question" key={index}>
				<h3>{b64_to_utf8(question.question)}</h3>
				<div className="choices" id={`question-${index}-choices`}>
					{answersComponents}
				</div>
			</div>
		);
	});

	return (
		<div className="quiz-questions">
			{questionsList}
			<div className="check-score">
				{showResults ? (
					<div className="show-results">
						<h3>You scored {score}/10 correct answers</h3>
						<button
							className="start-button check-answers"
							onClick={() =>
								props.handleReStartQuiz(
									(prevState) => !prevState
								)
							}
						>
							Play Again
						</button>
					</div>
				) : (
					<button
						className="start-button check-answers"
						onClick={handleCheckAnswers}
					>
						Check answers
					</button>
				)}
			</div>
		</div>
	);
}
