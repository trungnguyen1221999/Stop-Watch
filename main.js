const clock = document.querySelector(".clock");

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10); // 1 cs = 10ms
  const hours = String(Math.floor(totalCentiseconds / 360000)).padStart(2, "0");
  const minutes = String(
    Math.floor((totalCentiseconds % 360000) / 6000)
  ).padStart(2, "0");
  const seconds = String(Math.floor((totalCentiseconds % 6000) / 100)).padStart(
    2,
    "0"
  );
  const centiseconds = String(totalCentiseconds % 100).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}:${centiseconds}`;
}

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  clock.textContent = formatTime(diff);
}

function start() {
  if (intervalId) return;
  startTime = Date.now();
  intervalId = setInterval(updateTime, 10); // update every 10ms
}

function stop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
  elapsedTime += Date.now() - startTime;
}

function reset() {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  elapsedTime = 0;
  clock.textContent = "00:00:00:00";
}
