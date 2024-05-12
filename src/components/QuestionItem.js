import React from 'react';

function QuestionItem({ question, onDeleteClick, onAnswerChange }) {
	const { id, prompt, answers = [], correctIndex } = question;

	const options = answers.map((answer, index) => (
		<option key={index} value={index}>
			{answer}
		</option>
	));

	const handleDeleteClick = () => {
		const del = window.confirm('Do you want to delete?');
		if (del) {
			onDeleteClick(id);
		} else {
			console.log('cancelled');
		}
	};

	function handleAnswerChange(event) {
		onAnswerChange(id, parseInt(event.target.value));
	}

	return (
		<li>
			<h4>Question {id}</h4>
			<h5>Prompt: {prompt}</h5>
			<label>
				Correct Answer:
				<select defaultValue={correctIndex} onChange={handleAnswerChange}>
					{options}
				</select>
			</label>
			<button onClick={handleDeleteClick}>Delete Question</button>
		</li>
	);
}

export default QuestionItem;
