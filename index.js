const STORE = [
    // Question database
    {
        question: 'How many NFL teams are there in the<br> league?', 
        answers: [
            '28', '32', '30', '34'],
        correctAnswer:
            '32'
    },
    {
        question: 'Who is the Quarterback for the<br> Chargers?',
        answers: [
            'Aaron Rodgers', 'Tom Brady', 'Philip Rivers', 'Patrick Mahomes'],
        correctAnswer:
            'Philip Rivers'
    },
    {
        question: 'How many players can be on the field<br> at once?',
        answers: [
          '11', '12', '22', '24'],
        correctAnswer:
          '22'  
    },
    {
        question: 'What year was the NFL established?',
        answers: [
            '1920', '1916', '1967', '1954'],
        correctAnswer:
           '1920'
    },
    {
        question: 'Which Wide Receiver holds the record<br> for the most Touchdowns in their career?',
        answers: [
            'Randy Moss', 'Antonio Brown', 'Terrell Owens', 'Jerry Rice'],
        correctAnswer:
        'Jerry Rice' 
    },
    {
        question: 'Which NFL team(s) hold the most Super<br> Bowl wins?',
        answers: [
            'Dolphins', 'Cowboys', 'Dolphins & Cowboys', 'Patriots & Steelers'],
        correctAnswer:
        'Patriots & Steelers'
    },
    {
        question: 'What city are the Browns from?',
        answers: [
            'Los Angeles', 'Baltimore', 'Cleveland', 'Seattle'],
        correctAnswer:
        'Cleveland'
    },
    {
        question: 'How many points does a team receive<br> for causing a safety?',
        answers: [
            '3', '2', '6', '7'],
        correctAnswer:
        '2'
    },
    {
        question: 'Who is the youngest quarterback to<br> start and win a Super Bowl?',
        answers: [
            'Tom Brady', 'Ben Rothlisberger', 'Aaron Rodgers', 'Drew Brees'],
        correctAnswer: 
        'Ben Rothlisberger'
    },
    {
        question: 'What city has NOT hosted a Super Bowl?',
        answers: [
            'San Diego', 'Atlanta', 'Miami', 'Chicago'],
        correctAnswer:
        'Chicago'
    }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return questionForm(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.innerBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function questionForm(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>Nope! that's the wrong answer...</h3>
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMee">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.innerBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!',
  ];

  const good = [
    'Not bad!',
  ];

  const bad = [
    'You must be more of a European football fan huh?',
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >= 5) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
       `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 10</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.innerBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
