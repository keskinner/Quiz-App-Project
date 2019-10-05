const STORE = [
    // Question database
]

function scoreTracker() {
    // Keeps track of the users score
}

function questionTracker() {
    // Keeps track of what question the user is currently on
}

function updateTrackers() {
    // Updates the score and question tracker after each question
}

function startQuiz() {
    // Starts the quiz
}

function renderQuestion() {
    // Renders the current question
}

function submitAnswer() {
    // Submits the users answer to question
}

function answerToQuestion() {
    // Gives the answer to the current question
}

function nextQuestion() {
    // Takes user to next question
}

function quizEnd() {
    // Ends quiz once the user has gone through all the quiz questions. Prompts the user to restart quiz
}

function restartQuiz() {
    // Takes user back to start quiz beginning
}

function makeQuiz() {
    startQuiz();
    renderQuestion();
    submitAnswer();
    nextQuestion();
    quizEnd();
}

$(makeQuiz);