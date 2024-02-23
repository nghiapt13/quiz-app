const questions = [
    {
        question: "Ai dep trai nhat the gioi?",
        answers: [
            { text: "Ank Nghe", correct: true },
            { text: "Son Tung MTP", correct: false },
            { text: "Johnny Sins", correct: false },
            { text: "Peter Parker", correct: false },

        ]
    },
    {
        question: "Ai dep trai nhat the gioi?",
        answers: [
            { text: "Ank Nghe", correct: false },
            { text: "Trung Nghe", correct: false },
            { text: "Nghia", correct: false },
            { text: "Bim", correct: true },

        ]
    },
    {
        question: "Ai dep trai nhat the gioi?",
        answers: [
            { text: "Ank Nghe", correct: false },
            { text: "Trung Nghe", correct: true },
            { text: "Nghia", correct: false },
            { text: "Bim", correct: false },

        ]
    },
    {
        question: "Ai dep trai nhat the gioi?",
        answers: [
            { text: "Ank Nghe", correct: false },
            { text: "Trung Nghe", correct: true },
            { text: "Nghia", correct: false },
            { text: "Bim", correct: false },

        ]
    }
];

const questionElement = document.getElementById("question");
const gameCongrat = document.getElementById("congrat");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    if (score / questions.length >= 0.5) {
        gameCongrat.innerHTML = "Good";
        gameCongrat.style.display = "block";
    } else if (score / questions.length == 1) {
        gameCongrat.innerHTML = "Vjp";
        gameCongrat.style.display = "block";

    } else if (score / questions.length < 0.5 && score / questions.length == 0) {
        gameCongrat.innerHTML = "ngu vcl";
        gameCongrat.style.display = "block";
    }
    // gameCongrat.style.display="none";
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};



nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();