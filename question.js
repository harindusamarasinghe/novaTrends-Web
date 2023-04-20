/** code by Sandunika Diyamini **/
const startButton = document.getElementById('start');
const score = document.getElementById('score');
const timerLabel = document.getElementById('timer-label');
const timerLabel2 = document.getElementById('timer-label-2');
// helper functions
function setHTML(el, text) {
  el.innerHTML = text;
}
startButton.addEventListener('click', (event) => {
  ob.start();
});
// create Object
const ob = new Object;
ob.score = 0;
ob.no = 0;
ob.inProgress = false;
ob.countDown = false;
ob.countDownStart = Date.now();
ob.startTime = Date.now();
// Object Methods
ob.start = function () {
  if (ob.inProgress) return;
  if (ob.countDown) return;
//  if (ob.no == 0) nextButton.disabled = false;
//  slide(false);
  ob.countDownStart = Date.now();
  ob.countDown = true;
}
ob.begin = function () {
//  if (ob.no == 0) nextButton.disabled = false;
  if (ob.inProgress) return;
  ob.score = 0;
  ob.no = 0;
  setHTML(score, ob.score);
  ob.countDown = false;
  currentSlide(2);  
  ob.startTime = Date.now()
  ob.inProgress = true;
}
ob.end = function () {
  ob.inProgress = false;
  showScores();
}
// Timer functions
function checkTimers() {
  if (ob.countDown) {
    const diff = 3 - Math.floor((Date.now() - ob.countDownStart) / 1000);
    if (diff > 0) {
      setHTML(timerLabel, "Starting in: "+ diff);
    } else {
      ob.begin();
    }
  }
  // 5 sec per question 10 question have to answer
  if (ob.inProgress) {
    const diff = (5 * 10) - Math.floor((Date.now() - ob.startTime) / 1000);
    if (diff > -1) {
      setHTML(timerLabel2, "Remaining: " + diff);
    } else {
      ob.end();
    }
  }
}
setInterval(checkTimers, 100);
var correct=[];
var incorrect=[];
var correctAnswers = "";
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("grid");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
  question = this.getQuestionIndex();
  if(question.isCorrectAnswer(answer)) {
    this.score = this.score + 1;
    correct.push(question);
  }
  else{
    //this.score = this.score - 1;
    //correctAnswers += question.text + "<br><font color='red'>"+ question.answer + "</font><br>";
  }
  this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'><font color='white'> Your score: " + quiz.score + "</font> </h2>";
    var found = false;
    for (i = 0; i < questions.length; i++) {
      for (j = 0; j < correct.length; j++) {
        if (questions[i].text == correct[j].text) {
          found = true;
          break;
        }else {
          found = false;
        }
      };
      if (!found){
        correctAnswers += questions[i].text + "<br><font color='red'>"+ questions[i].answer + "</font><br>";           
      }
    };
    
    if (quiz.score >= 0 && quiz.score < 10){
      gameOverHTML += "<h5 id='answers'> <u>The correct answers are:</u> " + "<br>" + correctAnswers + "</h5>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    if (quiz.score >= 7 && quiz.score <= 10) {
      document.getElementById("score").style.backgroundColor = "green";
    } else if (quiz.score >= 5 && quiz.score < 7) {
      document.getElementById("score").style.backgroundColor = "yellow";
    } else {
      document.getElementById("score").style.backgroundColor = "red";
    }
};
// create questions here

var questions = [
    new Question("what year was the rolex brand founded ?", ["1895", "1925", "1915", "1905"], "1905"),
    new Question("what is the name of the famous Rolex watch worn by James Bond ?", ["Datejust", "Submariner", "Day-Date", "Daytona"], "Submariner"),
    new Question("In what year was Louis Vuitton founded ?", ["1821", "1854", "1888", "1923"], "1854"),
    new Question("What is the name of Nike's famous logo ?", ["Checkmark","Swish", "Swoosh",  "Strike"], "Swoosh"),
    new Question("What was Ralph Lauren's first retail store ?", ["New York","Los Angeles", "Chicago", "Boston"], "New York"),
    new Question("What is the name of Louis Vuitton's signature colour?", ["Brown","Red", "Yellow", "Green"], "Brown"),
    new Question("Which sport inspired Ralph Lauren's iconic polo logo?", ["Horse racing","Tennis", "Golf", "Football"], "Horse racing"),
    new Question("What is the name of the famous Rolex watch with a red and blue bezel?", ["Daytona","Explorer", "Submariner", "GMT-Master"], "GMT-Master"),
    new Question("Who is the highest-paid Athlete sponsored by Nike ?", ["Michael Jordan","Cristiano Ronaldo", "Usain Bolt", "Serena Williams"], "Cristiano Ronaldo"),
    new Question("What is the name of Ralph Lauren's luxury fashion brand?", ["Lauren Ralph Lauren","RRL", "Polo Ralph Lauren", "Ralph Lauren Purple"], "Ralph Lauren Purple")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();