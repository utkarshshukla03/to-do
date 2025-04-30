// Timer functionality
let pomodoroDuration = 25 * 60;
let time = pomodoroDuration;
let timerInterval = null;

function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  
  const li = document.createElement('li');
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onclick = () => {
    li.classList.toggle('done');
  };
  
  const span = document.createElement('span');
  span.textContent = taskText;
  
  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.onclick = () => li.remove();
  
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  
  document.getElementById('task-list').appendChild(li);
  input.value = '';
}

function startTimer() {
  if (timerInterval !== null) return;
  
  timerInterval = setInterval(() => {
    time--;
    updateTimerDisplay();
    if (time <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Pomodoro session complete! 🎉");
      time = pomodoroDuration;
      updateTimerDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = pomodoroDuration;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

// Dark mode functionality
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference or use preference from OS
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set the theme
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.checked = false;
  }
  // Save user preference
  localStorage.setItem('dark-mode', isDark);
}

// Load saved preference
const savedTheme = localStorage.getItem('dark-mode');

if (savedTheme !== null) {
  setTheme(savedTheme === 'true');
} else {
  // If no saved preference, use system preference
  setTheme(prefersDarkScheme.matches);
}

// Listen for theme toggle
themeToggle.addEventListener('change', () => {
  setTheme(themeToggle.checked);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  // Only auto-switch if the user hasn't manually set a preference
  if (localStorage.getItem('dark-mode') === null) {
    setTheme(e.matches);
  }
});

// Initialize timer display
updateTimerDisplay();