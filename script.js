const questions = [
  {
    question: "What is the JavaScript?",
    answer: [
      {
        text: "JavaScript is a programming language used primarily for web development.",
        correct: true,
      },
      { text: "JavaScript is a type of database.", correct: false },
      { text: "JavaScript is a web server.", correct: false },
      { text: "javaScript is a same as JAVA", correct: false },
    ],
  },
  {
    question: "Who making JavaScript?",
    answer: [
      { text: "Brendan Eich", correct: true },
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: false },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "Which company developer JavaScript?",
    answer: [
      { text: "Mozilla Foundation", correct: true },
      { text: "Google", correct: false },
      { text: "Apple", correct: false },
      { text: "Microsoft", correct: false },
    ],
  },
  {
    question: "When was JavaScript created?",
    answer: [
      { text: "1995", correct: true },
      { text: "2000", correct: false },
      { text: "1990", correct: false },
      { text: "1985", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  nextBtn.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;

  question.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    // сохраняем правильность в кнопку
    if (answer.correct) {
      button.dataset.correct = "true";
    }

    // клик по ответу
    button.addEventListener("click", selectAnswer);

    answerBtns.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
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

  // показать правильный ответ и заблокировать кнопки
  Array.from(answerBtns.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });

  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  question.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
