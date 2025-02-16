const correctAnswers = [
    "f", "l", "o", "a", "t", "i", "f", "w", "b", "o", "o", "l", "e", "a", "n", "h", "l", "i","i", "m", "p", "o", "r", "t", "b", "l", "s", "y", "n", "r", "e", "t",
    "i", "e", "r", "a", "s", "t", "r", "i", "n","g","p","k"
  ];
  
  let checkClicks = 0;
  const maxChecks = 10;
  let remainingTime = 900;
  
  const disableButtons = () => {
    document.getElementById("check-btn").disabled = true;
    document.getElementById("submit-btn").disabled = true;
  };
  
  const startCountdown = () => {
    const timerDisplay = document.getElementById("timer");
    const countdownInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        alert("Time's up! You can no longer submit your answers.");
        disableButtons();
        displayCorrectCount(); // Show the number of correct answers at the end
      } else {
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }
    }, 1000);
  };
  
  window.onload = startCountdown;
  
  const updateCheckButtonText = () => {
    const remainingChecks = maxChecks - checkClicks;
    const checkButton = document.getElementById("check-btn");
    checkButton.textContent = `Check (${remainingChecks} left)`;
    if (remainingChecks === 0) {
      checkButton.disabled = true;
      checkButton.textContent = "Check (Limit reached)";
    }
  };
  
  updateCheckButtonText();
  
  const checkAnswers = (inputs) => {
    const alphanumericRegex = /[a-zA-Z0-9]/g;
    let correctCount = 0;
  
    inputs.forEach(input => {
      if (!input.hasAttribute("data-index")) return;
  
      const index = parseInt(input.getAttribute("data-index"), 10);
      if (isNaN(index) || index < 0 || index >= correctAnswers.length) {
        console.error(`Invalid data-index: ${index}`);
        return;
      }
  
      const userInput = input.value;
      const correctAnswer = correctAnswers[index];
      const userAlphanumerics = (userInput.match(alphanumericRegex) || []).join('').toLowerCase();
      const correctAlphanumerics = (correctAnswer.match(alphanumericRegex) || []).join('').toLowerCase();
  
      if (userAlphanumerics.includes(correctAlphanumerics)) {
        input.classList.add("correct");
        input.classList.remove("incorrect");
        correctCount++;
      } else {
        input.classList.add("incorrect");
        input.classList.remove("correct");
      }
    });
  
    return correctCount;
  };
  
  const displayCorrectCount = () => {
    const inputs = document.querySelectorAll(".sudoku-input:not(.readonly)");
    const correctCount = checkAnswers(inputs);
    
    const resultDisplay = document.getElementById("result-display");
    resultDisplay.textContent = `Correct Answers: ${correctCount} / ${correctAnswers.length}`;
    resultDisplay.style.display = "block";
  };
  
  document.getElementById("check-btn").addEventListener("click", () => {
    if (checkClicks >= maxChecks) return;
    const inputs = document.querySelectorAll(".sudoku-input:not(.readonly)");
    checkAnswers(inputs);
    checkClicks++;
    updateCheckButtonText();
  });
  
  document.getElementById("submit-btn").addEventListener("click", () => {
    if (checkClicks >= maxChecks) {
      alert("You've reached the maximum number of attempts.");
      return;
    }
    const inputs = document.querySelectorAll(".sudoku-input:not(.readonly)");
    const correctCount = checkAnswers(inputs);
  
    if (correctCount === correctAnswers.length) {
      alert("Congratulations! All answers are correct. Proceeding to the next level...");
      window.location.href = "endingpage.html";
    } else {
      alert("Not all answers are correct yet. Please review your entries.");
    }
  });
  
  window.addEventListener('beforeunload', function (e) {
    const message = "If you reload the page, you will be disqualified!";
    e.returnValue = message;
    return message;
  });
  