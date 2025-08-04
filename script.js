const lines = [
  "Привет, Юлия.",
  "Это не просто страница.",
  "Это загадка, созданная специально для тебя.",
  "Каждая строка — как шаг к разгадке.",
  "Готова начать?"
];

const terminal = document.getElementById("terminal");

lines.forEach((text, i) => {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  terminal.appendChild(line);

  setTimeout(() => {
    line.classList.add("visible");
  }, i * 2000);
});