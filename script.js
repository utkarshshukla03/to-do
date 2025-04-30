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

updateTimerDisplay();
