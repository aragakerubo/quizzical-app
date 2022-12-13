import React from "react";

export default function StartPage(props) {
	// console.log(props.category);
	return (
		<div className="start-page">
			<h2>Quizzical</h2>
			<p>Ready, set, quiz!</p>
			<label htmlFor="categories">Choose a category:</label>

			<select
				id="categories"
				value={props.category}
				onChange={(e) => props.handleSetCategory(e.currentTarget.value)}
			>
				<option value="">Any Category</option>
				<option value="9">General Knowledge</option>
				<option value="10">Entertainment: Books</option>
				<option value="11">Entertainment: Film</option>
				<option value="12">Entertainment: Music</option>
				<option value="13">Entertainment: Musicals & Theatres</option>
				<option value="14">Entertainment: Television</option>
				<option value="15">Entertainment: Video Games</option>
				<option value="16">Entertainment: Board Games</option>
				<option value="17">Science & Nature</option>
				<option value="18">Science: Computers</option>
				<option value="19">Science: Mathematics</option>
				<option value="20">Mythology</option>
				<option value="21">Sports</option>
				<option value="22">Geography</option>
				<option value="23">History</option>
				<option value="24">Politics</option>
				<option value="25">Art</option>
				<option value="26">Celebrities</option>
				<option value="27">Animals</option>
				<option value="28">Vehicles</option>
				<option value="29">Entertainment: Comics</option>
				<option value="30">Science: Gadgets</option>
				<option value="31">
					Entertainment: Japanese Anime & Manga
				</option>
				<option value="32">Entertainment: Cartoon & Animations</option>
			</select>
			<button
				className="start-button"
				onClick={() => props.handleStartQuiz((prevState) => !prevState)}
			>
				Start quiz
			</button>
		</div>
	);
}
