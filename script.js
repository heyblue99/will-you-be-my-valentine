const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const afterYesPanel = document.getElementById("afterYesPanel");
const twinkleContainer = document.getElementById("twinkles");

// 16 phrases for NO button
const noPhrases = [
  "No",
  "Hmm? 🤔",
  "Really? 🤨",
  "Try again 😌",
  "Are you sure? 🙁",
  "Haha, nice try 😄",
  "No escape 😏",
  "Running already? 🏃‍♀️",
  "You can’t escape, my love 😁",
  "Still no? Really? ☹️",
  "Begum! 🥺",
  "Nope, not happening 🙅‍♂️",
  "You’re testing my patience 😤",
  "Last chance before I smile harder 😄",
  "Just say yes ❤️",
  "Ishraaa!!! 🙂"
];

let noIndex = 0;

// Function to generate random safe position for NO button
function getSafePosition() {
  const padding = 10;
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const textRect = question.getBoundingClientRect();

  const maxX = window.innerWidth - noRect.width - padding;
  const maxY = window.innerHeight - noRect.height - padding;

  let x, y, safe = false;

  while (!safe) {
    x = Math.random() * maxX;
    y = Math.random() * maxY;

    const overlapYes =
      x < yesRect.right &&
      x + noRect.width > yesRect.left &&
      y < yesRect.bottom &&
      y + noRect.height > yesRect.top;

    const overlapText =
      x < textRect.right &&
      x + noRect.width > textRect.left &&
      y < textRect.bottom &&
      y + noRect.height > textRect.top;

    if (!overlapYes && !overlapText) {
      safe = true;
    }
  }

  return { x, y };
}

// Animate NO button sliding
function moveNoButton() {
  const pos = getSafePosition();
  noBtn.style.position = "fixed";
  noBtn.style.left = `${pos.x}px`;
  noBtn.style.top = `${pos.y}px`;

  // Update phrase
  noBtn.innerText = noPhrases[noIndex % noPhrases.length];
  noIndex++;
}

// Generate twinkles
function createTwinkles(count=50) {
  twinkleContainer.innerHTML = '';
  for (let i=0; i<count; i++) {
    const twinkle = document.createElement('div');
    twinkle.className = 'twinkle';
    twinkle.style.left = `${Math.random()*100}%`;
    twinkle.style.top = `${Math.random()*100}%`;
    twinkle.style.animationDelay = `${Math.random()*2}s`;
    twinkleContainer.appendChild(twinkle);
  }
}

// YES button click
yesBtn.addEventListener("click", () => {
  // Hide initial buttons and question
  question.style.display = 'none';
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';

  // Show final panel
  afterYesPanel.classList.remove('hidden');

  // Show twinkles
  twinkleContainer.style.display = 'block';
  createTwinkles(50);
});

// NO button click
noBtn.addEventListener("click", moveNoButton);
