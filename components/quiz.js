import {useState} from 'react';

import styles from './quiz.module.css';

export default function Quiz({items}) {
    const [count, setCount] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState('');
    const [showScore, setShowScore] = useState(false);

    const question = items[count].question;
    const correct_answer = items[count].correct_answer;
    const multipleChoice = [items[count].correct_answer, ...items[count].incorrect_answers].sort((a,b) => 0.5 - Math.random());

    function checkAnswer(answer) {
        if (answer === correct_answer) {
            setScore(score => score + 1);
            setResult('CORRECT!');
        } else {
            setResult(`Wrong! The correct answer is ${correct_answer}.`);
        }
    }

    function reset() {
        setCount(0);
        setScore(0);
        setShowScore(false);
        setResult('')
    }

    function nextQuestion() {
        if(count + 1 === items.length) {
            setShowScore(true);
        } else {
            setCount(count => count + 1);
            setResult('');
        }
    }

    if (showScore) {
        return (
            <div className={styles.quiz_container}>
                <h1>Your Score is {score}</h1>
                <h3>Thanks for playing!</h3>
                <div className={styles.quiz_buttons}>
                    <button onClick={reset} className={styles.btn}>Play again</button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.quiz_container}>
            <h3>Question #{count + 1}</h3>
            <h1>{question}</h1>
            <div className={styles.quiz_buttons}>
                {multipleChoice.map(answer => <button className={styles.btn} disabled={result} onClick={() => checkAnswer(answer)}>{answer}</button>)}
            </div>
            {result && <h1>{result}</h1>}
            <div className={styles.quiz_buttons}>
                {result && <button onClick={nextQuestion} className={styles.btn}>Next</button>}
            </div>
            
        </div>
    )
}
