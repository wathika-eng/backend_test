import React, { useState } from 'react';

function QuestionForm(props) {
	const [formData, setFormData] = useState({
		prompt: '',
		answer1: '',
		answer2: '',
		answer3: '',
		answer4: '',
		correctIndex: 0,
	});

	function handleChange(event) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch('https://backend-test-p8h1.onrender.com/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: formData.prompt,
				answers: [
					formData.answer1,
					formData.answer2,
					formData.answer3,
					formData.answer4,
				],
				correctIndex: parseInt(formData.correctIndex),
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Network response was not ok.');
			})
			.then((data) => {
				alert('Question submitted successfully.');
				// Optionally, you can update state or take other actions after successful submission
			})
			.catch((error) => {
				console.error('Error submitting question:', error);
				alert(
					'An error occurred while submitting the question. Please try again.'
				);
			});
	}

	return (
		<section>
			<h1>Add New Question</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Prompt:
					<input
						type='text'
						name='prompt'
						value={formData.prompt}
						onChange={handleChange}
					/>
				</label>
				<label>
					Answer 1:
					<input
						type='text'
						name='answer1'
						value={formData.answer1}
						onChange={handleChange}
					/>
				</label>
				<label>
					Answer 2:
					<input
						type='text'
						name='answer2'
						value={formData.answer2}
						onChange={handleChange}
					/>
				</label>
				<label>
					Answer 3:
					<input
						type='text'
						name='answer3'
						value={formData.answer3}
						onChange={handleChange}
					/>
				</label>
				<label>
					Answer 4:
					<input
						required
						type='text'
						name='answer4'
						value={formData.answer4}
						onChange={handleChange}
					/>
				</label>
				<label>
					Correct Answer:
					<select
						name='correctIndex'
						value={formData.correctIndex}
						onChange={handleChange}
					>
						<option value='0'>{formData.answer1}</option>
						<option value='1'>{formData.answer2}</option>
						<option value='2'>{formData.answer3}</option>
						<option value='3'>{formData.answer4}</option>
					</select>
				</label>
				<button type='submit'>Add Question</button>
			</form>
		</section>
	);
}

export default QuestionForm;
