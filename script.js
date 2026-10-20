const QUESTIONS = [
  "What does this place mean to you today?",
  "What moment would you like to remember?",
  "What has helped this place feel like home?",
  "What would you tell someone new to this city?",
  "What is something small but meaningful from your journey?",
  "What would you like to leave behind for someone else?"
];

const button = document.getElementById('red-button');
const paper = document.getElementById('paper');
const paperQuestion = document.getElementById('paper-question');
const screenQuestion = document.getElementById('screen-question');
const instructions = document.getElementById('instructions');
let paperOut = false;
let animating = false;
let lastQuestion = -1;

function randomQuestion() {
  if (QUESTIONS.length === 1) return QUESTIONS[0];
  let index;
  do { index = Math.floor(Math.random() * QUESTIONS.length); }
  while (index === lastQuestion);
  lastQuestion = index;
  return QUESTIONS[index];
}

button.addEventListener('click', () => {
  if (animating) return;
  animating = true;
  button.disabled = true;

  if (paperOut) {
    paperOut = false;
    paper.classList.remove('visible');
    instructions.textContent = 'Paper returning to the machine…';
    window.setTimeout(() => {
      paperQuestion.textContent = 'Your question will appear here.';
      animating = false;
      button.disabled = false;
      instructions.textContent = 'Press the red button to discover another question.';
    }, 1100);
  } else {
    const question = randomQuestion();
    paperQuestion.textContent = question;
    screenQuestion.textContent = question;
    paperOut = true;
    // Let the browser apply the starting position before animating out.
    requestAnimationFrame(() => requestAnimationFrame(() => paper.classList.add('visible')));
    instructions.textContent = 'Take a moment to reflect on your question.';
    window.setTimeout(() => {
      animating = false;
      button.disabled = false;
    }, 1100);
  }
});
