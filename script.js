// import { func } from "prop-types";

let currentInput = "";
let previousInput = "";
let operation = null;

const display = document.getElementById("display");

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  currentInput = currentInput.toString() + number.toString();
  display.value += number;
  startRecognition(number);

  // updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
  startRecognition(currentInput);
}

function setOperation(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculateResult();
  }
  if (op) {
    display.value += op;
    // console.log(op);
    startRecognition(op);
  }
  operation = op;
  previousInput = currentInput;
  currentInput = "";

  return;
}

function calculateResult() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
    default:
      return;
  }
  currentInput = result;
  operation = null;
  previousInput = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay();
}

function deleteNumber() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
}

const startRecognitionButton = document.getElementById("start-recognition");
const mute = document.getElementById("mute");
const unmute = document.getElementById("unmute");
startRecognitionButton.addEventListener("click", stopRecognition);

let voice = true;
function stopRecognition() {
    if (voice) {
        // startRecognitionButton.style.display = "flex";
        // startRecognitionButton.innerHTML = "Start...";
        unmute.style.display = "block"
        mute.style.display = "none"

        voice = false;
    } else {
        // startRecognitionButton.style.display = "flex";
        // startRecognitionButton.innerHTML = "Not";
        unmute.style.display = "none"
        mute.style.display = "block"
        voice = true;
    }
}
function startRecognition(op = "am i audiable ?") {
  if (voice) {
    return 0;
  } else {
    // Create a new speech synthesis object
    const synth = window.speechSynthesis;
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(op);
    // Set properties (optional)
    utterance.lang = "en-US"; // Set the language
    utterance.rate = 1.0; // Set the speaking rate (1.0 is normal speed)

    // Speak the text
    synth.speak(utterance);

    //   recognition.start();
  }
}
