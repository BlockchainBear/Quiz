/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'which year was bitcoin invented?',
      answers: [
        '200 B.C.',
        '1980',
        '100000 in the future',
        '2008'
      ],
      correctAnswer: '2008'
    },
    {
      question: 'Approximately how many bitcoins will be minted in total?',
      answers: [
        '1 bitcoin',
        '6000',
        '10 billion but only on the dark web',
        '21 million'
      ],
      correctAnswer: '21 million'
    },
    {
      question: 'What is a smart contract?',
      answers: [
        'Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.',
        'a contract that gives you paper cuts',
        'an agreement that got a college degree',
        'a contract that can beat you at video games'
      ],
      correctAnswer: 'Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.'
    },
    {
      question: 'who controlls blockchain/bitcoin?',
      answers: [
        'Secret cartel of bankers',
        'Nobody, its decentralized!',
        'the president of the EU',
        'Your local pawnshop'
      ],
      correctAnswer: 'Nobody, its decentralized!'
    },
    {
      question: 'what is an airdrop?',
      answers: [
        'sort of like a teardrop but for tough people',
        'what we did to germany and japan in WW2',
        'Special parachute for airline passengers',
        'when a crypto team distributes tokens to users for free.'
      ],
      correctAnswer: 'when a crypto team distributes tokens to users for free.'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  correct: 0,
  incorrect: 0
};



let html =  `<div class="welcomePage">
  <h3 class="welcomeMessage">please press the button to begin the quiz on blockchain techonology!
  </h3>
  <button class="startQuiz" autofocus>Start the Quiz!</button>
</div>`;

function handleStartQuiz() {
  $('.startQuiz').click(function(event) {
    store.questionNumber=0;
    store.correct=0;
    store.incorrect=0;
    html = loadQuiz();
    main();
  });
}

function renderQuizApp() {
  $('main').html(html);
}

function loadQuiz() {
  let number = store.questionNumber;
  let selection = store.questions[number].answers;
  return  `<div class="questionPage">
  <h3>
  Question ${number + 1}: ${store.questions[number].question}
</h3>
  <form class="question-form">
      <input type="radio" name="answer" id="answer-a" class="answer" value="${selection[0]}" required>
      <label for="answer">${selection[0]}</label><br>
      <input type="radio" name="answer" id="answer-b" class="answer" value="${selection[1]}">
      <label for="answer">${selection[1]}</label><br>
      <input type="radio" name="answer" id="answer-c" class="answer" value="${selection[2]}">
      <label for="answer">${selection[2]}</label><br>
      <input type="radio" name="answer" id="answer-d" class="answer" value="${selection[3]}">
      <label for="answer">${selection[3]}</label><br>
      <button type="submit" class="answerSubmit">Submit Answer</button>
  </form>
  <p>Correct: ${store.correct}</p><p>Incorrect: ${store.incorrect}</p>
</div>`;
}

function answerCheck(review) {
  let i = store.questionNumber;
  let result = (review === store.questions[i].correctAnswer) ? 'Correct' : 'Incorrect';
  if(result === 'Correct'){
    store.correct += 1;
    
  } else {
    store.incorrect += 1;
  }
  store.questionNumber++; 
  if(store.questionNumber < store.questions.length) {
    html = loadQuiz();
  } else {
    generateFinalPage();
  }
}

function generateFinalPage(){
  html =  `<div class="finalPage">
  <h2>Congradulations You have just completed the quiz!</h2>
  <h3>Correct: ${store.correct}</h3>
  <h3>Incorrect: ${store.incorrect}</h3>
  <button class="restartQuiz">Wanna play Again?</button></div>`;  
  store.incorrect=0;
  store.correct=0;
  store.questionNumber=0;
}

function handleSubmit() {
  $('.question-form').on('click', '.answerSubmit', event => {
    event.preventDefault();
    let userAnswer = $("input[name='answer']:checked").val();
    if(userAnswer !== undefined) {
      answerCheck(userAnswer);
      main();
    }
  });
  
}

function handleNextQuestion() {
  $('.submit').click(function(event) {
    
    main();
  });
}

function handleRestart() {
  $('.restartQuiz').click(function(event) {
    html = loadQuiz();
    main();
  });
}

function main(){
  renderQuizApp();
  handleStartQuiz();  
  handleSubmit();
  handleNextQuestion();
  handleRestart();
}

$(main());
