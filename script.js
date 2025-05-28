// initializing
let quizData = [];
let questionCounter = 0;
const totalQuestions = 0;
let currentQuizData = null;

// DOM elements
let questionEl = document.getElementById("question");
let textDescEl = document.getElementById("text-desc");
let nextBtnEl = document.getElementById("next-btn");
let progressBarEl = document.getElementById("progress");
let quizContainer = document.getElementById("quiz-container");
let quizExtro = document.getElementById("quiz-extro");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

// progress bar function
function updateProgress() {
    const progressNum = (questionCounter / (totalQuestions - 1)) * 100;
    progressBarEl.style.width = `${progressNum}%`;
}

// load questions function
function loadQuestion() {
    currentQuizData = quizData[questionCounter];
    questionEl.textContent = currentQuizData["question"];

    // set button texts
    yesBtn.textContent = currentQuizData["yes"];
    noBtn.textContent = currentQuizData["no"];

    // show answer buttons
    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";

    // hide text and description and next button when loading question
    textDescEl.style.display = "none";
    nextBtnEl.style.display = "none";
}

// answer question function
function answerQuestion(answer) {
    // show text description
    textDescEl.style.display = "block";
    if (answer == "yes") {
        textDescEl.innerText = currentQuizData["yes-text"];
    } else {
        textDescEl.innerText = currentQuizData["no-text"];
    }

    // hide answer buttons
    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    // show next button
    nextBtnEl.style.display = "block";
    nextBtnEl.textContent = currentQuizData["next-question"];
}

// load next question function
function nextQuestion() {
    questionCounter ++;

    if (questionCounter < totalQuestions) {
        loadQuestion();
        updateProgress();
    } else { // quiz completed
        quizContainer.style.display = "none";
        quizExtro.style.display = "flex";
        quizExtro.classList.add("show");
        progressBarEl.style.width = "100%";
    }
}

// restart quiz function
function restartQuiz() {
    questionCounter = 0;
    quizContainer.style.display = "flex";
    quizExtro.style.display = "none";
    quizExtro.classList.remove("show");
    loadQuestion();
    updateProgress();
}

// initializing quiz
function initializeQuiz() {
    loadQuestion();
    updateProgress();
}

// window.onload = initializeQuiz;

// load external JSON
fetch("quizData.json")
.then(response => response.json())
.then(json => {
    quizData = json;
    totalQuestions = quizData.length;
    initializeQuiz();
})
.catch(error => {
    console.error("Error loading JSON:", error);
    // error message
    questionEl.textContent = "Sorry, there was an error loading the quiz. Kindly refresh the page.";
});