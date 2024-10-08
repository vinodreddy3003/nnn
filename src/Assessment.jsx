import { useState } from "react";
import { resultInitalState } from "./constants";

const Assessment = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerInd, setAnswerInd] = useState(Array(questions.length).fill(null)); // Store selected answers for all questions
    const [results, setResults] = useState(questions.map(() => null));
    const [showResult, setShowResult] = useState(false);
    const [reviewedQuestions, setReviewedQuestions] = useState(
        questions.map(() => false)
    );

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        const isCorrect = answer === correctAnswer;
        setAnswerInd((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestion] = index; // Store the selected answer index for the current question
            return updatedAnswers;
        });
        setResults((prevResults) => {
            const updatedResults = [...prevResults];
            updatedResults[currentQuestion] = isCorrect;
            return updatedResults;
        });

    };

    const onClickNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const onClickPrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const toggleReviewQuestion = () => {
        setReviewedQuestions((prev) => {
            const updatedReviews = [...prev];
            updatedReviews[currentQuestion] = !updatedReviews[currentQuestion];
            return updatedReviews;
        });
    };
    const onTryAgain = () => {
        setResult(resultInitalState);
        setShowResult(false);
        setCurrentQuestion(0);
      };

    const totalScore = results.filter(Boolean).length;
    const correctAnswers = results.filter((result) => result === true).length;
    const wrongAnswers = results.filter((result) => result === false).length;

    return (
        <div className="assessment-container">
            {!showResult ? (
                <>
                    <span className="active-question-no">Q{currentQuestion + 1}</span>
                    <span className="total-question">/{questions.length}</span>
                    <h2>{question}</h2>
                    <ul>
                        {choices.map((answer, index) => (
                            <li
                                key={answer}
                                onClick={() => onAnswerClick(answer, index)}
                                className={answerInd[currentQuestion] === index ? "selected-answer" : null}
                            >
                                {answer}

                            </li>
                        ))}
                    </ul>


                    <div className="footer">
                        <button onClick={toggleReviewQuestion} className="star-button">
                            {reviewedQuestions[currentQuestion] ? "⭐" : "☆"} Review
                        </button>
                        <button onClick={onClickPrevious} disabled={currentQuestion === 0}>
                            Previous
                        </button>
                        <button onClick={onClickNext}  >
                            {/* disabled={answerInd[currentQuestion] === null} */}

                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                           
                        </button>
                    </div>
                </>
            ) : (
                <div className="result">
                    <h2>Result</h2>
                    <p>Score: {totalScore}/{questions.length}</p>
                    <p>Correct Answers: {correctAnswers}</p>
                    <p>Wrong Answers: {wrongAnswers}</p>
                    <h3>Review Questions:</h3>
                    <button onClick={onTryAgain}>Try again</button>
                    

                    <ul>
                        {questions.map((q, index) => (
                            reviewedQuestions[index] && <li key={index}>{q.question}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Assessment;










